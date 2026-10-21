'use client'

import { useState } from 'react'
import {
  SearchIcon,
  XIcon,
  ClockIcon,
  CheckCircle2Icon,
  XCircleIcon,
  CircleDotIcon,
  ScaleIcon
} from 'lucide-react'

import { toast } from 'sonner'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
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

import { DisputeStatusDialog, type DisputeTargetStatus } from './dispute-status-dialog'

export interface DisputeRecord {
  id: string
  code: string
  disputeType: string
  propertyId: string | null
  billId: string | null
  raisedByRatepayerId: string
  status: string
  assignedToPersonnelId: string | null
  slaDueAt: string | null
  resolution: string | null
  resolvedAt: string | null
  createdAt: string
}

interface DisputesDataTableProps {
  data: DisputeRecord[]
  loading?: boolean
  search: string
  onSearchChange: (value: string) => void
  status: string
  onStatusChange: (value: string) => void
  onChanged: () => void
}

function StatusBadge({ status }: { status: string }) {
  const s = (status || 'OPEN').toUpperCase()
  if (s === 'OPEN') {
    return (
      <Badge variant="outline" className="bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20 text-[10px] font-medium">
        <CircleDotIcon className="size-2.5 mr-1" />
        Open
      </Badge>
    )
  }
  if (s === 'UNDER_REVIEW') {
    return (
      <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-[10px] font-medium">
        <ClockIcon className="size-2.5 mr-1" />
        Under Review
      </Badge>
    )
  }
  if (s === 'RESOLVED') {
    return (
      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-medium">
        <CheckCircle2Icon className="size-2.5 mr-1" />
        Resolved
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="bg-muted text-muted-foreground text-[10px] font-medium">
      <XCircleIcon className="size-2.5 mr-1" />
      Rejected
    </Badge>
  )
}

function DisputeTypeBadge({ type }: { type: string }) {
  return (
    <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20 text-[10px] font-medium">
      <ScaleIcon className="size-2.5 mr-1" />
      {type}
    </Badge>
  )
}

export function DisputesDataTable({ data, loading = false, search, onSearchChange, status, onStatusChange, onChanged }: DisputesDataTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isDeletingBatch, setIsDeletingBatch] = useState(false)
  const [actionTarget, setActionTarget] = useState<{ dispute: DisputeRecord; targetStatus: DisputeTargetStatus } | null>(null)

  const filtered = data.filter(d => {
    if (!search) return true
    const needle = search.toLowerCase()
    return d.code.toLowerCase().includes(needle) || d.disputeType.toLowerCase().includes(needle)
  })

  const allCurrentPageSelected =
    filtered.length > 0 && filtered.every(d => selectedIds.has(d.id))

  const toggleSelectAll = () => {
    const next = new Set(selectedIds)
    if (allCurrentPageSelected) {
      filtered.forEach(d => next.delete(d.id))
    } else {
      filtered.forEach(d => next.add(d.id))
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
    if (!confirm(`Are you sure you want to delete ${selectedIds.size} selected dispute(s)? Any dispute that cannot be deleted (e.g. audit locked cases) will be skipped.`)) {
      return
    }

    setIsDeletingBatch(true)
    let deletedCount = 0
    let skippedCount = 0

    for (const _id of Array.from(selectedIds)) {
      try {
        // Dispute service maintains statutory complaint history — individual deletion is restricted
        skippedCount++
      } catch {
        skippedCount++
      }
    }

    setIsDeletingBatch(false)
    setSelectedIds(new Set())

    if (deletedCount > 0 && skippedCount === 0) {
      toast.success(`Successfully deleted ${deletedCount} dispute record${deletedCount > 1 ? 's' : ''}.`)
    } else if (deletedCount > 0 && skippedCount > 0) {
      toast.warning(`Deleted ${deletedCount} dispute record${deletedCount > 1 ? 's' : ''}. ${skippedCount} record${skippedCount > 1 ? 's' : ''} could not be deleted and were skipped.`)
    } else if (deletedCount === 0 && skippedCount > 0) {
      toast.error(`Could not delete selected disputes (${skippedCount} skipped — disputes are protected audit records).`)
    }

    onChanged?.()
  }

  const nextAction = (d: DisputeRecord): { label: string; targetStatus: DisputeTargetStatus; variant: 'default' | 'destructive' }[] => {
    const s = (d.status || 'OPEN').toUpperCase()
    if (s === 'OPEN') return [{ label: 'Start Review', targetStatus: 'UNDER_REVIEW', variant: 'default' }]
    if (s === 'UNDER_REVIEW') {
      return [
        { label: 'Resolve', targetStatus: 'RESOLVED', variant: 'default' },
        { label: 'Reject', targetStatus: 'REJECTED', variant: 'destructive' }
      ]
    }
    return []
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">Dispute Queue</h2>
      </div>

      <Card className="shadow-2xs overflow-hidden py-0 gap-0">
        <div className="border-b p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex w-full flex-col gap-2 sm:col-span-2">
              <Label htmlFor="search-dispute" className="text-sm font-medium">Search</Label>
              <InputGroup className="w-full">
                <InputGroupAddon align="inline-start">
                  <SearchIcon className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  id="search-dispute"
                  placeholder="Search by dispute code or type..."
                  value={search}
                  onChange={e => onSearchChange(e.target.value)}
                  className="text-sm"
                />
                {search && (
                  <InputGroupAddon align="inline-end">
                    <button
                      type="button"
                      onClick={() => onSearchChange('')}
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
              <Label htmlFor="filter-dispute-status" className="text-sm font-medium">Status</Label>
              <Select value={status} onValueChange={(val: string | null) => val && onStatusChange(val)}>
                <SelectTrigger id="filter-dispute-status" className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="OPEN">Open</SelectItem>
                    <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                    <SelectItem value="RESOLVED">Resolved</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
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
          entityName="dispute"
        />

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-12 pl-6">
                  <Checkbox
                    checked={allCurrentPageSelected}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all disputes on current page"
                  />
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Dispute</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Type</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">SLA Due</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Raised</TableHead>
                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Spinner className="size-6 text-primary" />
                      <p className="text-xs text-muted-foreground">Loading disputes...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-40 text-center text-sm text-muted-foreground">
                    No disputes match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map(row => {
                  const isSelected = selectedIds.has(row.id)
                  const actions = nextAction(row)
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
                          aria-label={`Select ${row.code}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-mono text-xs font-semibold text-foreground">{row.code}</span>
                          {row.resolution && (
                            <span className="text-[10px] text-muted-foreground max-w-xs truncate" title={row.resolution}>{row.resolution}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DisputeTypeBadge type={row.disputeType} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={row.status} />
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {row.slaDueAt ? new Date(row.slaDueAt).toLocaleDateString('en-GH', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(row.createdAt).toLocaleDateString('en-GH', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </TableCell>
                      <TableCell className="text-center pr-6">
                        {actions.length === 0 ? (
                          <span className="text-[11px] text-muted-foreground italic">No action</span>
                        ) : (
                          <div className="flex items-center justify-center gap-1.5">
                            {actions.map(action => (
                              <Button
                                key={action.targetStatus}
                                size="sm"
                                variant={action.variant === 'destructive' ? 'outline' : 'default'}
                                className={`h-7 text-[11px] ${action.variant === 'destructive' ? 'text-destructive hover:text-destructive' : ''}`}
                                onClick={() => setActionTarget({ dispute: row, targetStatus: action.targetStatus })}
                              >
                                {action.label}
                              </Button>
                            ))}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <DisputeStatusDialog
        dispute={actionTarget?.dispute ?? null}
        targetStatus={actionTarget?.targetStatus ?? null}
        onClose={() => setActionTarget(null)}
        onUpdated={() => {
          setActionTarget(null)
          onChanged()
        }}
      />
    </div>
  )
}
