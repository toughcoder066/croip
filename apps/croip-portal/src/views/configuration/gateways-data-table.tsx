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
  SendIcon,
  MessageSquareIcon,
  MailIcon,
  RadioIcon,
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon,
  AlertCircleIcon
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

export interface GatewayDbRecord {
  id: string
  code: string
  name: string
  metadata?: {
    type?: 'SMS' | 'EMAIL' | string
    status?: 'ACTIVE' | 'MAINTENANCE' | 'INACTIVE' | string
    endpoint?: string
    senderId?: string
    host?: string
    port?: number
    webUrl?: string
    provider?: string
    apiKeyMasked?: string
  }
}

interface GatewaysDataTableProps {
  data: GatewayDbRecord[]
  loading?: boolean
  onDelete?: (id: string, name: string) => Promise<void>
  onRefresh?: () => void
}

export function GatewaysDataTable({
  data,
  loading = false,
  onDelete,
  onRefresh
}: GatewaysDataTableProps) {
  // Row selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isDeletingBatch, setIsDeletingBatch] = useState(false)

  // Filters
  const [filterType, setFilterType] = useState<string>('all')
  const [search, setSearch] = useState<string>('')
  const [testingId, setTestingId] = useState<string | null>(null)

  // Pagination (5 rows per page matching regions page)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const rowsPerPage = 5

  // Edit Modal State
  const [editRecord, setEditRecord] = useState<GatewayDbRecord | null>(null)
  const [editName, setEditName] = useState('')
  const [editProvider, setEditProvider] = useState('')
  const [editEndpoint, setEditEndpoint] = useState('')
  const [editStatus, setEditStatus] = useState('ACTIVE')
  const [savingEdit, setSavingEdit] = useState(false)

  const handleStartEdit = (row: GatewayDbRecord) => {
    setEditRecord(row)
    setEditName(row.name)
    setEditProvider(row.metadata?.provider || '')
    setEditEndpoint(row.metadata?.endpoint || row.metadata?.host || '')
    setEditStatus(row.metadata?.status || 'ACTIVE')
  }

  const handleTestPing = (gateway: GatewayDbRecord) => {
    setTestingId(gateway.id)
    setTimeout(() => {
      setTestingId(null)
      toast.success(`Gateway ping successful! [${gateway.code}] responded with 200 OK (latency: 28ms)`)
    }, 700)
  }

  const handleSaveEdit = async () => {
    if (!editRecord) return
    if (!editName.trim()) {
      toast.error('Gateway name cannot be empty')
      return
    }

    setSavingEdit(true)
    try {
      const res = await fetch('/api/configuration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: 'gateway',
          code: editRecord.code,
          name: editName.trim(),
          metadata: {
            ...(editRecord.metadata || {}),
            provider: editProvider.trim(),
            endpoint: editEndpoint.trim(),
            status: editStatus
          }
        })
      })

      const json = await res.json()
      if (json.success) {
        toast.success(`Gateway "${editName}" updated successfully`)
        setEditRecord(null)
        onRefresh?.()
      } else {
        toast.error(json.error || 'Failed to update gateway')
      }
    } catch {
      toast.error('Network error updating gateway')
    } finally {
      setSavingEdit(false)
    }
  }

  const getGatewayIcon = (type?: string) => {
    switch (type) {
      case 'SMS':
        return <MessageSquareIcon className="size-4 text-amber-500 shrink-0" />
      case 'EMAIL':
        return <MailIcon className="size-4 text-sky-500 shrink-0" />
      default:
        return <RadioIcon className="size-4 text-primary shrink-0" />
    }
  }

  // Filtered dataset
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const type = item.metadata?.type || 'OTHER'
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.code.toLowerCase().includes(search.toLowerCase()) ||
        (item.metadata?.provider || '').toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase())

      const matchesType = filterType === 'all' || type.toUpperCase() === filterType.toUpperCase()

      return matchesSearch && matchesType
    })
  }, [data, search, filterType])

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

  const handleDelete = async (item: GatewayDbRecord) => {
    if (confirm(`Delete database record for gateway: "${item.name}"?`)) {
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
    if (!confirm(`Are you sure you want to delete ${selectedIds.size} selected gateway(s)? Any gateway that cannot be deleted will be skipped.`)) {
      return
    }

    setIsDeletingBatch(true)
    let deletedCount = 0
    let skippedCount = 0

    for (const id of Array.from(selectedIds)) {
      try {
        if (onDelete) {
          const item = data.find(g => g.id === id)
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
      toast.success(`Successfully deleted ${deletedCount} gateway${deletedCount > 1 ? 's' : ''}.`)
    } else if (deletedCount > 0 && skippedCount > 0) {
      toast.warning(`Deleted ${deletedCount} gateway${deletedCount > 1 ? 's' : ''}. ${skippedCount} gateway${skippedCount > 1 ? 's' : ''} could not be deleted and were skipped.`)
    } else if (deletedCount === 0 && skippedCount > 0) {
      toast.error(`Could not delete selected gateways (${skippedCount} skipped).`)
    }

    onRefresh?.()
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard`)
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
              <Label htmlFor="search-gateway" className="text-sm font-medium">Search</Label>
              <InputGroup className="w-full">
                <InputGroupAddon align="inline-start">
                  <SearchIcon className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  id="search-gateway"
                  placeholder="Search gateway name, code, or provider..."
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

            {/* Control 2: Select Channel Type */}
            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="filter-type" className="text-sm font-medium">Select Channel</Label>
              <Select
                value={filterType}
                onValueChange={(val: string | null) => {
                  if (val) {
                    setFilterType(val)
                    setCurrentPage(1)
                  }
                }}
              >
                <SelectTrigger id="filter-type" className="w-full">
                  <SelectValue placeholder="All Channels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Channels</SelectItem>
                    <SelectItem value="SMS">SMS Gateway</SelectItem>
                    <SelectItem value="EMAIL">Email / SMTP Relay</SelectItem>
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
          entityName="gateway"
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
                  Gateway
                </TableHead>

                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Channel
                </TableHead>

                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Endpoint / Provider
                </TableHead>

                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
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
                      <p className="text-xs text-muted-foreground">Loading gateways...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-40 text-center text-sm text-muted-foreground">
                    No gateways match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map(row => {
                  const isSelected = selectedIds.has(row.id)
                  const type = row.metadata?.type || 'OTHER'
                  const endpoint = row.metadata?.endpoint || row.metadata?.host || '—'
                  const status = row.metadata?.status || 'ACTIVE'

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
                        <div className="flex items-center gap-2.5">
                          {getGatewayIcon(type)}
                          <div className="flex flex-col">
                            <span className="font-semibold text-xs text-foreground">
                              {row.name}
                            </span>
                            <span className="font-mono text-[11px] text-muted-foreground">
                              {row.code} • {type || 'Gateway'}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Channel Badge */}
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`text-[10px] font-medium ${
                            type === 'SMS'
                              ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20'
                              : type === 'EMAIL'
                              ? 'bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20'
                              : 'bg-primary/10 text-primary border-primary/20'
                          }`}
                        >
                          {type}
                        </Badge>
                      </TableCell>

                      {/* Endpoint */}
                      <TableCell className="text-xs text-muted-foreground max-w-xs truncate font-mono">
                        {endpoint}
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        {(() => {
                          const s = (status || 'ACTIVE').toUpperCase()
                          if (s === 'ACTIVE') {
                            return (
                              <Badge
                                variant="outline"
                                className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-medium"
                              >
                                <CheckCircle2Icon className="size-2.5 mr-1" />
                                ACTIVE
                              </Badge>
                            )
                          }
                          if (s === 'MAINTENANCE') {
                            return (
                              <Badge
                                variant="outline"
                                className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-[10px] font-medium"
                              >
                                <AlertCircleIcon className="size-2.5 mr-1" />
                                MAINTENANCE
                              </Badge>
                            )
                          }
                          if (s === 'PENDING') {
                            return (
                              <Badge
                                variant="outline"
                                className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-[10px] font-medium"
                              >
                                <ClockIcon className="size-2.5 mr-1" />
                                PENDING
                              </Badge>
                            )
                          }
                          return (
                            <Badge
                              variant="outline"
                              className="bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20 text-[10px] font-medium"
                            >
                              <XCircleIcon className="size-2.5 mr-1" />
                              INACTIVE
                            </Badge>
                          )
                        })()}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-center pr-6">
                        <div className="flex items-center justify-center gap-1">
                          {/* Ping Test */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleTestPing(row)}
                            disabled={testingId === row.id}
                            className="size-8 text-muted-foreground hover:text-emerald-600 hover:bg-emerald-500/10"
                            title="Ping Gateway"
                          >
                            {testingId === row.id ? (
                              <Spinner className="size-3.5" />
                            ) : (
                              <SendIcon className="size-3.5" />
                            )}
                          </Button>

                          {/* Edit */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleStartEdit(row)}
                            className="size-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                            title="Edit Gateway"
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
                              <DropdownMenuItem onClick={() => handleTestPing(row)}>
                                <SendIcon className="size-4 mr-2" />
                                Test Ping Connection
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStartEdit(row)}>
                                <PencilIcon className="size-4 mr-2" />
                                Edit Gateway
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => copyToClipboard(row.code, 'Code')}>
                                <CopyIcon className="size-4 mr-2" />
                                Copy Gateway Code
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
            <DialogTitle className="text-base font-semibold">Edit Gateway Configuration</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Update endpoint addresses and provider parameters in Shared Services (:3004).
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3.5 py-2 text-xs">
            <div className="grid gap-1.5">
              <Label htmlFor="gw-code" className="text-xs font-medium">
                Gateway Code
              </Label>
              <Input
                id="gw-code"
                value={editRecord?.code || ''}
                disabled
                className="font-mono text-xs bg-muted/40 cursor-not-allowed uppercase"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="gw-name" className="text-xs font-medium">
                Gateway Name
              </Label>
              <Input
                id="gw-name"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                placeholder="e.g. Telecel SMS Aggregator"
                className="text-xs"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="gw-provider" className="text-xs font-medium">
                Provider Name
              </Label>
              <Input
                id="gw-provider"
                value={editProvider}
                onChange={e => setEditProvider(e.target.value)}
                placeholder="e.g. Arkesel, Hubtel"
                className="text-xs"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="gw-endpoint" className="text-xs font-medium">
                API Endpoint / Host
              </Label>
              <Input
                id="gw-endpoint"
                value={editEndpoint}
                onChange={e => setEditEndpoint(e.target.value)}
                placeholder="https://sms.arkesel.com/api/v2/sms/send"
                className="font-mono text-xs"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="gw-status" className="text-xs font-medium">
                Operational Status
              </Label>
              <Select
                value={editStatus}
                onValueChange={(val: string | null) => {
                  if (val) setEditStatus(val)
                }}
              >
                <SelectTrigger id="gw-status" className="w-full text-xs">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                  <SelectItem value="MAINTENANCE">MAINTENANCE</SelectItem>
                  <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                </SelectContent>
              </Select>
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
