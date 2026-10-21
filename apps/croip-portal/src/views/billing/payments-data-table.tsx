'use client'

import { useEffect, useState } from 'react'
import { SearchIcon, XIcon, ChevronLeftIcon, ChevronRightIcon, CheckCircle2Icon, CircleDollarSignIcon } from 'lucide-react'

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export interface PaymentDirectoryRecord {
  id: string
  billId: string
  paidByRatepayerId: string | null
  externalPaymentRef: string
  paymentType: string
  amount: string
  balanceAtPayment: string
  status: string
  paidAt: string
  receivedAt: string
  bill?: { id: string; billNumber: string; ratepayerId: string; propertyId: string; currency: string }
}

interface PaymentsDataTableProps {
  data: PaymentDirectoryRecord[]
  loading?: boolean
  search: string
  onSearchChange: (value: string) => void
  page: number
  pageSize: number
  total: number
  totalPages: number
  onPageChange: (page: number) => void
  onRefresh?: () => void
}

function StatusBadge({ status }: { status: string }) {
  const s = (status || 'CONFIRMED').toUpperCase()
  if (s === 'CONFIRMED') {
    return (
      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-medium">
        <CheckCircle2Icon className="size-2.5 mr-1" />
        Confirmed
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="bg-muted text-muted-foreground text-[10px] font-medium">
      <CircleDollarSignIcon className="size-2.5 mr-1" />
      {status}
    </Badge>
  )
}

function formatMoney(currency: string, amount: string) {
  const n = Number(amount)
  if (Number.isNaN(n)) return `${currency} ${amount}`
  return `${currency} ${n.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function PaymentsDataTable({
  data,
  loading = false,
  search,
  onSearchChange,
  page,
  pageSize,
  total,
  totalPages,
  onPageChange,
  onRefresh
}: PaymentsDataTableProps) {
  // Row selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isDeletingBatch, setIsDeletingBatch] = useState(false)

  const [searchInput, setSearchInput] = useState(search)

  useEffect(() => {
    setSearchInput(search)
  }, [search])

  useEffect(() => {
    const handle = setTimeout(() => {
      if (searchInput !== search) {
        onPageChange(1)
        onSearchChange(searchInput)
      }
    }, 400)
    return () => clearTimeout(handle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput])

  const showingFrom = total === 0 ? 0 : (page - 1) * pageSize + 1
  const showingTo = Math.min(page * pageSize, total)

  const pageButtons: number[] = []
  const windowSize = 5
  let start = Math.max(1, page - Math.floor(windowSize / 2))
  let end = Math.min(totalPages, start + windowSize - 1)
  start = Math.max(1, end - windowSize + 1)
  for (let p = start; p <= end; p++) pageButtons.push(p)

  const allCurrentPageSelected =
    data.length > 0 && data.every(r => selectedIds.has(r.id))

  const toggleSelectAll = () => {
    const next = new Set(selectedIds)
    if (allCurrentPageSelected) {
      data.forEach(r => next.delete(r.id))
    } else {
      data.forEach(r => next.add(r.id))
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
    if (!confirm(`Are you sure you want to delete ${selectedIds.size} selected payment(s)? Payment receipts and confirmed financial records cannot be purged individually and will be skipped.`)) {
      return
    }

    setIsDeletingBatch(true)
    let deletedCount = 0
    let skippedCount = 0

    for (const _id of Array.from(selectedIds)) {
      try {
        // Payments are immutable financial ledger transactions — individual delete is disallowed by policy
        skippedCount++
      } catch {
        skippedCount++
      }
    }

    setIsDeletingBatch(false)
    setSelectedIds(new Set())

    if (deletedCount > 0 && skippedCount === 0) {
      toast.success(`Successfully deleted ${deletedCount} payment${deletedCount > 1 ? 's' : ''}.`)
    } else if (deletedCount > 0 && skippedCount > 0) {
      toast.warning(`Deleted ${deletedCount} payment${deletedCount > 1 ? 's' : ''}. ${skippedCount} payment${skippedCount > 1 ? 's' : ''} could not be deleted and were skipped.`)
    } else if (deletedCount === 0 && skippedCount > 0) {
      toast.error(`Could not delete selected payments (${skippedCount} skipped — payments are immutable statutory ledger entries).`)
    }

    onRefresh?.()
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">Payment Ledger</h2>
      </div>

      <Card className="shadow-2xs overflow-hidden py-0 gap-0">
        <div className="border-b p-6">
          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="search-payment" className="text-sm font-medium">Search</Label>
            <InputGroup className="w-full max-w-md">
              <InputGroupAddon align="inline-start">
                <SearchIcon className="size-4 text-muted-foreground" />
              </InputGroupAddon>
              <InputGroupInput
                id="search-payment"
                placeholder="Search by bill number or payment reference..."
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                className="text-sm"
              />
              {searchInput && (
                <InputGroupAddon align="inline-end">
                  <button
                    type="button"
                    onClick={() => setSearchInput('')}
                    className="text-muted-foreground hover:text-foreground p-0.5 rounded-full transition-colors cursor-pointer"
                    title="Clear search"
                  >
                    <XIcon className="size-3.5" />
                  </button>
                </InputGroupAddon>
              )}
            </InputGroup>
          </div>
        </div>

        {/* Batch Action Bar */}
        <BatchActionBar
          selectedCount={selectedIds.size}
          onDelete={handleBatchDelete}
          onClear={() => setSelectedIds(new Set())}
          isDeleting={isDeletingBatch}
          entityName="payment"
        />

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-12 pl-6">
                  <Checkbox
                    checked={allCurrentPageSelected}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all payments on current page"
                  />
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Payment Reference
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Bill
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Amount
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Balance After
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-6">
                  Paid
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Spinner className="size-6 text-primary" />
                      <p className="text-xs text-muted-foreground">Loading payments...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-40 text-center text-sm text-muted-foreground">
                    No payments match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                data.map(row => {
                  const isSelected = selectedIds.has(row.id)
                  const currency = row.bill?.currency ?? 'GHS'
                  const paidForOther = row.paidByRatepayerId && row.bill && row.paidByRatepayerId !== row.bill.ratepayerId

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
                          aria-label={`Select ${row.externalPaymentRef}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-mono text-xs font-semibold text-foreground">{row.externalPaymentRef}</span>
                          {paidForOther && (
                            <span className="text-[10px] text-amber-700 dark:text-amber-400">Paid on behalf of another ratepayer</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground">{row.bill?.billNumber ?? 'Bill Ref'}</TableCell>
                      <TableCell className="text-xs font-medium text-foreground">{formatMoney(currency, row.amount)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{formatMoney(currency, row.balanceAtPayment)}</TableCell>
                      <TableCell>
                        <StatusBadge status={row.status} />
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground pr-6">
                        {new Date(row.paidAt).toLocaleDateString('en-GH', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t bg-muted/10 text-sm">
          <p className="text-muted-foreground text-xs sm:text-sm">
            Showing <span className="font-semibold text-foreground">{showingFrom}</span> to{' '}
            <span className="font-semibold text-foreground">{showingTo}</span> of{' '}
            <span className="font-semibold text-foreground">{total}</span> entries
          </p>

          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(Math.max(page - 1, 1))}
              disabled={page <= 1 || loading}
              className="gap-1 text-xs h-8"
            >
              <ChevronLeftIcon className="size-4" />
              Previous
            </Button>

            {pageButtons.map(p => {
              const isActive = p === page
              return (
                <Button
                  key={p}
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onPageChange(p)}
                  disabled={loading}
                  className={`size-8 p-0 text-xs ${isActive ? 'font-bold' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {p}
                </Button>
              )
            })}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(Math.min(page + 1, totalPages))}
              disabled={page >= totalPages || loading}
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
