'use client'

import { useEffect, useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'
import {
  SearchIcon,
  EyeIcon,
  Trash2Icon,
  EllipsisVerticalIcon,
  CopyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
  MailIcon,
  CheckCircle2Icon,
  PauseCircleIcon,
  XCircleIcon,
  Building2Icon
} from 'lucide-react'
import { toast } from 'sonner'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { BatchActionBar } from '@/components/data-table/batch-action-bar'
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

export interface ConcessionRecord {
  id: string
  code: string
  name: string
  contactEmail: string
  status: string
  createdAt: string
}

interface ConcessionsDataTableProps {
  data: ConcessionRecord[]
  loading?: boolean
  onRefresh?: () => void
}

export function ConcessionsDataTable({ data, loading = false, onRefresh }: ConcessionsDataTableProps) {
  const router = useRouter()

  // Row selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isDeletingBatch, setIsDeletingBatch] = useState(false)

  const [search, setSearch] = useState('')
  // Defaults to hiding offboarded concessionaires — otherwise the "Offboard" action looks
  // like it did nothing, since the row stayed put with only a badge color change.
  const [filterStatus, setFilterStatus] = useState<string>('ACTIVE')
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 5

  const [assignedCounts, setAssignedCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    Promise.all(
      data.map(c =>
        fetch(`/api/concessions/${c.id}/assemblies`)
          .then(res => res.json())
          .then(res => [c.id, res.success && Array.isArray(res.data) ? res.data.length : 0] as const)
          .catch(() => [c.id, 0] as const)
      )
    ).then(entries => setAssignedCounts(Object.fromEntries(entries)))
  }, [data])

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.code.toLowerCase().includes(search.toLowerCase()) ||
        item.contactEmail.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase())

      const matchesStatus = filterStatus === 'all' || item.status.toLowerCase() === filterStatus.toLowerCase()

      return matchesSearch && matchesStatus
    })
  }, [data, search, filterStatus])

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

  const handleBatchDelete = async () => {
    if (selectedIds.size === 0) return
    if (!confirm(`Are you sure you want to delete/offboard ${selectedIds.size} selected concessionaire(s)? Items that cannot be deleted will be skipped.`)) {
      return
    }

    setIsDeletingBatch(true)
    let deletedCount = 0
    let skippedCount = 0

    for (const id of Array.from(selectedIds)) {
      try {
        const res = await fetch(`/api/concessions/${id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'deactivate' })
        })
        const json = await res.json().catch(() => ({}))
        if (res.ok && json.success) {
          deletedCount++
        } else {
          skippedCount++
        }
      } catch {
        skippedCount++
      }
    }

    setIsDeletingBatch(false)
    setSelectedIds(new Set())

    if (deletedCount > 0 && skippedCount === 0) {
      toast.success(`Successfully offboarded ${deletedCount} concessionaire${deletedCount > 1 ? 's' : ''}.`)
    } else if (deletedCount > 0 && skippedCount > 0) {
      toast.warning(`Offboarded ${deletedCount} concessionaire${deletedCount > 1 ? 's' : ''}. ${skippedCount} concessionaire${skippedCount > 1 ? 's' : ''} could not be modified and were skipped.`)
    } else if (deletedCount === 0 && skippedCount > 0) {
      toast.error(`Could not delete selected concessions (${skippedCount} skipped — offboarding concessionaires is restricted or unsupported).`)
    }

    onRefresh?.()
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard`)
  }

  const handleDelete = async (item: ConcessionRecord) => {
    if (!confirm(`Offboard "${item.name}"? Its status will be set to INACTIVE. History is kept, nothing is deleted.`)) return

    try {
      const res = await fetch(`/api/concessions/${item.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'deactivate' })
      })
      const json = await res.json().catch(() => ({}))

      if (res.ok && json.success) {
        toast.success(`"${item.name}" offboarded`)
        onRefresh?.()
      } else {
        toast.error(json.error || 'Failed to offboard concessionaire')
      }
    } catch {
      toast.error('Failed to offboard concessionaire')
    }
  }

  const renderStatusBadge = (status: string) => {
    const s = status.toUpperCase()

    if (s === 'ACTIVE') {
      return (
        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-medium">
          <CheckCircle2Icon className="size-2.5 mr-1" />
          Active
        </Badge>
      )
    }

    if (s === 'SUSPENDED') {
      return (
        <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-[10px] font-medium">
          <PauseCircleIcon className="size-2.5 mr-1" />
          Suspended
        </Badge>
      )
    }

    return (
      <Badge variant="outline" className="bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20 text-[10px] font-medium">
        <XCircleIcon className="size-2.5 mr-1" />
        {status}
      </Badge>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">Data table with Filters</h2>
      </div>

      <Card className="shadow-2xs overflow-hidden py-0 gap-0">
        {/* Top Filters */}
        <div className="border-b p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex w-full flex-col gap-2 sm:col-span-2">
              <Label htmlFor="search-concession" className="text-sm font-medium">Search</Label>
              <InputGroup className="w-full">
                <InputGroupAddon align="inline-start">
                  <SearchIcon className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  id="search-concession"
                  placeholder="Search by code, name, or contact email..."
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

            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="filter-status" className="text-sm font-medium">Status</Label>
              <Select
                value={filterStatus}
                onValueChange={(val: string | null) => {
                  if (val) {
                    setFilterStatus(val)
                    setCurrentPage(1)
                  }
                }}
              >
                <SelectTrigger id="filter-status" className="w-full">
                  <SelectValue placeholder="All">
                    {(value: string | null) => {
                      const labels: Record<string, string> = { all: 'All', ACTIVE: 'Active', SUSPENDED: 'Suspended', INACTIVE: 'Offboarded' }
                      return value ? labels[value] ?? value : 'All'
                    }}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="SUSPENDED">Suspended</SelectItem>
                    <SelectItem value="INACTIVE">Offboarded</SelectItem>
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
          entityName="concession"
        />

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-12 pl-6">
                  <Checkbox
                    checked={allCurrentPageSelected}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all concessions on current page"
                  />
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Concessionaire
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Contact Email
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Assigned MMDAs
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Onboarded
                </TableHead>
                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Spinner className="size-6 text-primary" />
                      <p className="text-xs text-muted-foreground">Loading concessions...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-40 text-center text-sm text-muted-foreground">
                    No concessions match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map(row => {
                  const isSelected = selectedIds.has(row.id)
                  return (
                    <TableRow
                      key={row.id}
                      data-state={isSelected ? 'selected' : undefined}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="pl-6">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelectRow(row.id)}
                          aria-label={`Select ${row.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                        <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <Building2Icon className="size-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-xs text-foreground">{row.name}</span>
                          <span className="font-mono text-[11px] text-muted-foreground">
                            {row.code} • Concession Operator
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MailIcon className="size-3.5 text-primary" />
                        <span>{row.contactEmail}</span>
                      </div>
                    </TableCell>

                    <TableCell>{renderStatusBadge(row.status)}</TableCell>

                    <TableCell>
                      <span className="text-xs font-medium text-foreground" title="Assignments made through this console — Platform Governance does not expose a listing endpoint for assigned assemblies.">
                        {assignedCounts[row.id] ?? 0}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span className="text-xs text-muted-foreground">
                        {new Date(row.createdAt).toLocaleDateString('en-GH', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </TableCell>

                    <TableCell className="text-center pr-6">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => router.push(`/concessions/${row.id}`)}
                          className="size-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                          title="View Details"
                        >
                          <EyeIcon className="size-4" />
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
                          <DropdownMenuContent align="end" className="w-52">
                            <DropdownMenuItem onClick={() => router.push(`/concessions/${row.id}`)}>
                              <EyeIcon className="size-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => copyToClipboard(row.code, 'Code')}>
                              <CopyIcon className="size-4 mr-2" />
                              Copy Concession Code
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(row)}
                              className="text-destructive focus:text-destructive focus:bg-destructive/10"
                            >
                              <Trash2Icon className="size-4 mr-2" />
                              Offboard Concessionaire
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
                  className={`size-8 p-0 text-xs ${isActive ? 'font-bold' : 'text-muted-foreground hover:text-foreground'}`}
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
    </div>
  )
}
