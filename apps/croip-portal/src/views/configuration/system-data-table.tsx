'use client'

import { useState, useMemo } from 'react'
import {
  SearchIcon,
  PencilIcon,
  Trash2Icon,
  EllipsisVerticalIcon,
  CopyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
  SlidersIcon,
  CheckCircle2Icon
} from 'lucide-react'
import { toast } from 'sonner'
import { BatchActionBar } from '@/components/data-table/batch-action-bar'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Spinner } from '@/components/ui/spinner'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

export interface SystemParamDbRecord {
  id: string
  code: string
  name: string
  metadata?: {
    value?: number | string
    unit?: string
    description?: string
    group?: 'Performance' | 'Statutory & Legal' | 'Compliance' | 'Event Processing' | 'Ingestion Gateway' | 'Security' | string
  }
}

interface SystemDataTableProps {
  data: SystemParamDbRecord[]
  loading?: boolean
  onDelete?: (id: string, name: string) => Promise<void>
  onRefresh?: () => void
}

export function SystemDataTable({
  data,
  loading = false,
  onDelete,
  onRefresh
}: SystemDataTableProps) {
  // Row selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isDeletingBatch, setIsDeletingBatch] = useState(false)

  // Filters
  const [filterGroup, setFilterGroup] = useState<string>('all')
  const [search, setSearch] = useState<string>('')

  // Pagination (5 rows per page matching regions page)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const rowsPerPage = 5

  // Edit Modal State
  const [editRecord, setEditRecord] = useState<SystemParamDbRecord | null>(null)
  const [editName, setEditName] = useState('')
  const [editGroup, setEditGroup] = useState('Performance')
  const [editValue, setEditValue] = useState('')
  const [editUnit, setEditUnit] = useState('')
  const [editDesc, setEditDesc] = useState('')
  const [savingEdit, setSavingEdit] = useState(false)

  // Dynamic groups list from dataset
  const availableGroups = useMemo(() => {
    const set = new Set<string>()
    data.forEach(p => {
      if (p.metadata?.group) set.add(p.metadata.group)
    })
    return Array.from(set).sort()
  }, [data])

  const handleStartEdit = (row: SystemParamDbRecord) => {
    setEditRecord(row)
    setEditName(row.name)
    setEditGroup(row.metadata?.group || 'Performance')
    setEditValue(row.metadata?.value != null ? String(row.metadata.value) : '')
    setEditUnit(row.metadata?.unit || '')
    setEditDesc(row.metadata?.description || '')
  }

  const handleSaveEdit = async () => {
    if (!editRecord) return
    if (!editName.trim()) {
      toast.error('Parameter name cannot be empty')
      return
    }

    setSavingEdit(true)
    try {
      const parsedVal = isNaN(Number(editValue)) || editValue.trim() === '' ? editValue.trim() : Number(editValue)

      const res = await fetch('/api/configuration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: 'system',
          code: editRecord.code,
          name: editName.trim(),
          metadata: {
            ...(editRecord.metadata || {}),
            group: editGroup,
            value: parsedVal,
            unit: editUnit.trim(),
            description: editDesc.trim()
          }
        })
      })

      const json = await res.json()
      if (json.success) {
        toast.success(`Parameter "${editName}" updated successfully`)
        setEditRecord(null)
        onRefresh?.()
      } else {
        toast.error(json.error || 'Failed to update parameter')
      }
    } catch {
      toast.error('Network error updating parameter')
    } finally {
      setSavingEdit(false)
    }
  }

  // Filtered dataset
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const group = item.metadata?.group || 'General'
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.code.toLowerCase().includes(search.toLowerCase()) ||
        (item.metadata?.description || '').toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase())

      const matchesGroup = filterGroup === 'all' || group === filterGroup

      return matchesSearch && matchesGroup
    })
  }, [data, search, filterGroup])

  // Pagination calculation
  const totalEntries = filteredData.length
  const totalPages = Math.ceil(totalEntries / rowsPerPage) || 1
  const validCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (validCurrentPage - 1) * rowsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage)
  const showingFrom = totalEntries === 0 ? 0 : startIndex + 1
  const showingTo = Math.min(startIndex + rowsPerPage, totalEntries)

  const allCurrentPageSelected =
    paginatedData.length > 0 && paginatedData.every(r => selectedIds.has(r.id))

  const toggleSelectAll = () => {
    const next = new Set(selectedIds)
    if (allCurrentPageSelected) {
      paginatedData.forEach(r => next.delete(r.id))
    } else {
      paginatedData.forEach(r => next.add(r.id))
    }
    setSelectedIds(next)
  }

  const toggleSelectRow = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    setSelectedIds(next)
  }

  const handleDelete = async (item: SystemParamDbRecord) => {
    if (confirm(`Delete database record for parameter: "${item.name}"?`)) {
      if (onDelete) {
        await onDelete(item.id, item.name)
      } else {
        try {
          const res = await fetch(`/api/configuration?id=${item.id}`, { method: 'DELETE' })
          const json = await res.json().catch(() => ({}))
          if (res.ok && json.success) {
            toast.success(`Deleted ${item.name}`)
            onRefresh?.()
          } else {
            toast.error(json.error || `Could not delete ${item.name}`)
          }
        } catch {
          toast.error(`Failed to delete ${item.name}`)
        }
      }
    }
  }

  const handleBatchDelete = async () => {
    if (selectedIds.size === 0) return
    if (!confirm(`Are you sure you want to delete ${selectedIds.size} selected parameter(s)? Any parameter that cannot be deleted will be skipped.`)) {
      return
    }

    setIsDeletingBatch(true)
    let deletedCount = 0
    let skippedCount = 0

    for (const id of Array.from(selectedIds)) {
      try {
        if (onDelete) {
          const item = data.find(p => p.id === id)
          await onDelete(id, item?.name || id)
          deletedCount++
        } else {
          const res = await fetch(`/api/configuration?id=${id}`, { method: 'DELETE' })
          const json = await res.json().catch(() => ({}))
          if (res.ok && json.success) {
            deletedCount++
          } else {
            skippedCount++
          }
        }
      } catch {
        skippedCount++
      }
    }

    setIsDeletingBatch(false)
    setSelectedIds(new Set())

    if (deletedCount > 0 && skippedCount === 0) {
      toast.success(`Successfully deleted ${deletedCount} parameter${deletedCount > 1 ? 's' : ''}.`)
    } else if (deletedCount > 0 && skippedCount > 0) {
      toast.warning(`Deleted ${deletedCount} parameter${deletedCount > 1 ? 's' : ''}. ${skippedCount} parameter${skippedCount > 1 ? 's' : ''} could not be deleted and were skipped.`)
    } else if (deletedCount === 0 && skippedCount > 0) {
      toast.error(`Could not delete selected parameters (${skippedCount} skipped).`)
    }

    onRefresh?.()
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard`)
  }

  const getGroupBadge = (group?: string) => {
    switch (group) {
      case 'Performance':
        return (
          <Badge variant="outline" className="bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20 text-[10px]">
            Performance
          </Badge>
        )
      case 'Statutory & Legal':
        return (
          <Badge variant="outline" className="bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20 text-[10px]">
            Statutory & Legal
          </Badge>
        )
      case 'Compliance':
        return (
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px]">
            Compliance
          </Badge>
        )
      case 'Security':
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-[10px]">
            Security
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[10px]">
            {group || 'General'}
          </Badge>
        )
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Table Section Title */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">Data table with Filters</h2>
      </div>

      <Card className="shadow-2xs overflow-hidden py-0 gap-0">
        {/* Top Filters */}
        <div className="border-b p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Control 1: Search */}
            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="search-param" className="text-sm font-medium">Search</Label>
              <InputGroup className="w-full">
                <InputGroupAddon align="inline-start">
                  <SearchIcon className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  id="search-param"
                  placeholder="Search parameter name, code, or description..."
                  value={search}
                  onChange={e => {
                    setSearch(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="text-sm"
                />
                {search && (
                  <InputGroupAddon align="inline-end">
                    <button
                      type="button"
                      onClick={() => {
                        setSearch('')
                        setCurrentPage(1)
                      }}
                      className="text-muted-foreground hover:text-foreground p-0.5 rounded-full transition-colors cursor-pointer"
                      title="Clear search"
                    >
                      <XIcon className="size-3.5" />
                    </button>
                  </InputGroupAddon>
                )}
              </InputGroup>
            </div>

            {/* Control 2: Select Group */}
            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="filter-group" className="text-sm font-medium">Select Group</Label>
              <Select
                value={filterGroup}
                onValueChange={(val: string | null) => {
                  if (val) {
                    setFilterGroup(val)
                    setCurrentPage(1)
                  }
                }}
              >
                <SelectTrigger id="filter-group" className="w-full">
                  <SelectValue placeholder="All Groups" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Groups</SelectItem>
                    {availableGroups.map(grp => (
                      <SelectItem key={grp} value={grp}>
                        {grp}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Batch Action Bar */}
        <BatchActionBar
          selectedCount={selectedIds.size}
          onDelete={handleBatchDelete}
          onClear={() => setSelectedIds(new Set())}
          isDeleting={isDeletingBatch}
          entityName="parameter"
        />

        {/* The Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-12 pl-6">
                  <Checkbox
                    checked={allCurrentPageSelected}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all rows on current page"
                  />
                </TableHead>

                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Parameter Name
                </TableHead>

                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Group
                </TableHead>

                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Runtime Value
                </TableHead>

                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Description / Rule
                </TableHead>

                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Spinner className="size-6 text-primary" />
                      <p className="text-xs text-muted-foreground">Loading system parameters...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-40 text-center text-sm text-muted-foreground">
                    No system parameters match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map(row => {
                  const isSelected = selectedIds.has(row.id)
                  const group = row.metadata?.group || 'General'
                  const val = row.metadata?.value != null ? String(row.metadata.value) : '—'
                  const unit = row.metadata?.unit || ''
                  const desc = row.metadata?.description || '—'

                  return (
                    <TableRow
                      key={row.id}
                      data-state={isSelected ? 'selected' : undefined}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      {/* Checkbox */}
                      <TableCell className="pl-6">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelectRow(row.id)}
                          aria-label={`Select ${row.name}`}
                        />
                      </TableCell>

                      {/* Name & Code */}
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold text-xs text-foreground">
                            {row.name}
                          </span>
                          <span className="font-mono text-[11px] text-muted-foreground">
                            {row.code} • {group}
                          </span>
                        </div>
                      </TableCell>

                      {/* Group */}
                      <TableCell>
                        {getGroupBadge(group)}
                      </TableCell>

                      {/* Runtime Value */}
                      <TableCell>
                        <span className="font-mono font-bold text-xs text-foreground bg-muted/50 px-2 py-0.5 rounded">
                          {val} {unit}
                        </span>
                      </TableCell>

                      {/* Description */}
                      <TableCell className="text-xs text-muted-foreground max-w-xs truncate">
                        {desc}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-center pr-6">
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleStartEdit(row)}
                            className="size-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                            title="Edit Parameter"
                          >
                            <PencilIcon className="size-4" />
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="size-8 text-muted-foreground hover:text-foreground"
                                  title="More options"
                                />
                              }
                            >
                              <EllipsisVerticalIcon className="size-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem onClick={() => handleStartEdit(row)}>
                                <PencilIcon className="size-4 mr-2" />
                                Edit Parameter
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => copyToClipboard(row.code, 'Code')}>
                                <CopyIcon className="size-4 mr-2" />
                                Copy Parameter Code
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDelete(row)}
                                className="text-destructive focus:text-destructive focus:bg-destructive/10"
                              >
                                <Trash2Icon className="size-4 mr-2" />
                                Delete Record
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer: Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t bg-muted/10 text-sm">
          <p className="text-muted-foreground text-xs sm:text-sm">
            Showing <span className="font-semibold text-foreground">{showingFrom}</span> to{' '}
            <span className="font-semibold text-foreground">{showingTo}</span> of{' '}
            <span className="font-semibold text-foreground">{totalEntries}</span> entries
          </p>

          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={validCurrentPage <= 1}
              className="gap-1 text-xs h-8"
            >
              <ChevronLeftIcon className="size-4" />
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
              const isActive = page === validCurrentPage
              return (
                <Button
                  key={page}
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={`size-8 p-0 text-xs ${
                    isActive ? 'font-bold' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {page}
                </Button>
              )
            })}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={validCurrentPage >= totalPages}
              className="gap-1 text-xs h-8"
            >
              Next
              <ChevronRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Edit Modal Dialog */}
      <Dialog open={!!editRecord} onOpenChange={open => !open && setEditRecord(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">Edit System Parameter</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Update global performance SLA targets and operational limits in Shared Services (:3004).
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3.5 py-2 text-xs">
            <div className="grid gap-1.5">
              <Label htmlFor="param-code" className="text-xs font-medium">
                Parameter Code
              </Label>
              <Input
                id="param-code"
                value={editRecord?.code || ''}
                disabled
                className="font-mono text-xs bg-muted/40 cursor-not-allowed uppercase"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="param-name" className="text-xs font-medium">
                Parameter Name
              </Label>
              <Input
                id="param-name"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                placeholder="e.g. Max Batch Ingestion Window"
                className="text-xs"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="param-group" className="text-xs font-medium">
                Operational Group
              </Label>
              <Select
                value={editGroup}
                onValueChange={(val: string | null) => {
                  if (val) setEditGroup(val)
                }}
              >
                <SelectTrigger id="param-group" className="w-full text-xs">
                  <SelectValue placeholder="Select Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Performance">Performance</SelectItem>
                  <SelectItem value="Statutory & Legal">Statutory & Legal</SelectItem>
                  <SelectItem value="Compliance">Compliance</SelectItem>
                  <SelectItem value="Event Processing">Event Processing</SelectItem>
                  <SelectItem value="Ingestion Gateway">Ingestion Gateway</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="param-val" className="text-xs font-medium">
                  Runtime Value
                </Label>
                <Input
                  id="param-val"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  placeholder="e.g. 500"
                  className="font-mono text-xs"
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="param-unit" className="text-xs font-medium">
                  Unit
                </Label>
                <Input
                  id="param-unit"
                  value={editUnit}
                  onChange={e => setEditUnit(e.target.value)}
                  placeholder="e.g. ms, days, items"
                  className="text-xs"
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="param-desc" className="text-xs font-medium">
                SLA Rule / Description
              </Label>
              <Input
                id="param-desc"
                value={editDesc}
                onChange={e => setEditDesc(e.target.value)}
                placeholder="e.g. Maximum threshold for batch ingestion"
                className="text-xs"
              />
            </div>
          </div>

          <DialogFooter className="gap-3 sm:gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditRecord(null)}
              className="text-xs"
              disabled={savingEdit}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSaveEdit}
              disabled={savingEdit}
              className="text-xs"
            >
              {savingEdit ? <Spinner className="size-3 mr-1.5" /> : null}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
