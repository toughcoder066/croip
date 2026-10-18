'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  SearchIcon,
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircle2Icon,
  ClockIcon,
  CircleDollarSignIcon,
  EyeIcon
} from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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

export interface BillPaymentRecord {
  id: string
  amount: string
  balanceAtPayment: string
  status: string
  paidByRatepayerId: string | null
  paidAt: string
}

export interface BillDirectoryRecord {
  id: string
  billNumber: string
  propertyId: string
  ratepayerId: string
  billingPeriod: string
  billType: string
  currency: string
  amountDue: string
  amountPaid: string
  paymentStatus: string
  issuedAt: string
  dueDate: string
  externalBillRef: string
  payments: BillPaymentRecord[]
}

interface BillsDataTableProps {
  data: BillDirectoryRecord[]
  loading?: boolean
  search: string
  onSearchChange: (value: string) => void
  paymentStatus: string
  onPaymentStatusChange: (value: string) => void
  page: number
  pageSize: number
  total: number
  totalPages: number
  onPageChange: (page: number) => void
}

function PaymentStatusBadge({ status }: { status: string }) {
  const s = (status || 'UNPAID').toUpperCase()

  if (s === 'PAID') {
    return (
      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-medium">
        <CheckCircle2Icon className="size-2.5 mr-1" />
        Paid
      </Badge>
    )
  }
  if (s === 'PARTIALLY_PAID') {
    return (
      <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-[10px] font-medium">
        <ClockIcon className="size-2.5 mr-1" />
        Partially Paid
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20 text-[10px] font-medium">
      <CircleDollarSignIcon className="size-2.5 mr-1" />
      Unpaid
    </Badge>
  )
}

function formatMoney(currency: string, amount: string) {
  const n = Number(amount)
  if (Number.isNaN(n)) return `${currency} ${amount}`
  return `${currency} ${n.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function BillsDataTable({
  data,
  loading = false,
  search,
  onSearchChange,
  paymentStatus,
  onPaymentStatusChange,
  page,
  pageSize,
  total,
  totalPages,
  onPageChange
}: BillsDataTableProps) {
  // Local echo of the search box so every keystroke feels immediate, debounced before it is
  // pushed up to the parent page (which re-queries the server-side bill directory endpoint).
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
        <h2 className="text-xl font-bold tracking-tight text-foreground">Bill Directory</h2>
      </div>

      <Card className="shadow-2xs overflow-hidden py-0 gap-0">
        <div className="border-b p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex w-full flex-col gap-2 sm:col-span-2">
              <Label htmlFor="search-bill" className="text-sm font-medium">Search</Label>
              <InputGroup className="w-full">
                <InputGroupAddon align="inline-start">
                  <SearchIcon className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  id="search-bill"
                  placeholder="Search by bill number or external reference..."
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

            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="filter-payment-status" className="text-sm font-medium">Payment Status</Label>
              <Select
                value={paymentStatus}
                onValueChange={(val: string | null) => {
                  if (val) {
                    onPageChange(1)
                    onPaymentStatusChange(val)
                  }
                }}
              >
                <SelectTrigger id="filter-payment-status" className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="UNPAID">Unpaid</SelectItem>
                    <SelectItem value="PARTIALLY_PAID">Partially Paid</SelectItem>
                    <SelectItem value="PAID">Paid</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-6">
                  Bill
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Billing Period
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Amount Due
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Amount Paid
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Due Date
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
                      <p className="text-xs text-muted-foreground">Loading bills...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-40 text-center text-sm text-muted-foreground">
                    No bills match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                data.map(row => (
                  <TableRow key={row.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6">
                      <div className="flex flex-col">
                        <span className="font-mono text-xs font-semibold text-foreground">{row.billNumber}</span>
                        <span className="text-[11px] text-muted-foreground">{row.billType} &middot; {row.externalBillRef}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{row.billingPeriod}</TableCell>
                    <TableCell className="text-xs font-medium text-foreground">{formatMoney(row.currency, row.amountDue)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {formatMoney(row.currency, row.amountPaid)}
                      {row.payments.length > 0 && (
                        <span className="ml-1.5 text-[10px] text-muted-foreground">({row.payments.length} payment{row.payments.length === 1 ? '' : 's'})</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <PaymentStatusBadge status={row.paymentStatus} />
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(row.dueDate).toLocaleDateString('en-GH', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </TableCell>
                    <TableCell className="text-center pr-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-[11px] gap-1"
                        render={<Link href={`/properties/bills/${row.billNumber}`} />}
                        nativeButton={false}
                      >
                        <EyeIcon className="size-3.5" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
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
