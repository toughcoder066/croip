'use client'

import { useEffect, useState } from 'react'
import { SearchIcon, XIcon, ChevronLeftIcon, ChevronRightIcon, CheckCircle2Icon, CircleDollarSignIcon } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Spinner } from '@/components/ui/spinner'
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
  onPageChange
}: PaymentsDataTableProps) {
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

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-6">
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
                  <TableCell colSpan={6} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Spinner className="size-6 text-primary" />
                      <p className="text-xs text-muted-foreground">Loading payments...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-40 text-center text-sm text-muted-foreground">
                    No payments match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                data.map(row => {
                  const currency = row.bill?.currency ?? 'GHS'
                  const paidForOther = row.paidByRatepayerId && row.bill && row.paidByRatepayerId !== row.bill.ratepayerId

                  return (
                    <TableRow key={row.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="pl-6">
                        <div className="flex flex-col">
                          <span className="font-mono text-xs font-semibold text-foreground">{row.externalPaymentRef}</span>
                          {paidForOther && (
                            <span className="text-[10px] text-amber-700 dark:text-amber-400">Paid on behalf of another ratepayer</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground">{row.bill?.billNumber ?? row.billId.slice(0, 8)}</TableCell>
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
