'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import {
  ArrowLeftIcon,
  CheckCircle2Icon,
  ClockIcon,
  CircleDollarSignIcon,
  ReceiptIcon,
  UserIcon,
  Building2Icon
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PageLoader } from '@/components/ui/spinner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface BillPayment {
  id: string
  amount: string
  balanceAtPayment: string
  status: string
  paidByRatepayerId: string | null
  externalPaymentRef: string
  paidAt: string
  receivedAt: string
}

interface BillDetail {
  id: string
  billNumber: string
  propertyId: string
  ratepayerId: string
  concessionId: string
  issuedByPersonnelId: string | null
  billingPeriod: string
  billType: string
  currency: string
  amountDue: string
  amountPaid: string
  paymentStatus: string
  issuedAt: string
  dueDate: string
  externalBillRef: string
  payments: BillPayment[]
}

const formatDate = (value?: string | null) =>
  value ? new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'

const formatDateTime = (value?: string | null) =>
  value
    ? new Date(value).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : '—'

function formatMoney(currency: string, amount: string) {
  const n = Number(amount)
  if (Number.isNaN(n)) return `${currency} ${amount}`
  return `${currency} ${n.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
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

function OverviewField({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value ?? '—'}</span>
    </div>
  )
}

export function BillDetailView({ billNumber }: { billNumber: string }) {
  const [bill, setBill] = useState<BillDetail | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchBill = useCallback(() => {
    setLoading(true)
    return fetch(`/api/billing/bills/${encodeURIComponent(billNumber)}`)
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          setBill(res.data)
        } else {
          toast.error(res.error || 'Failed to load bill')
        }
      })
      .catch(err => {
        console.error('Failed to load bill:', err)
        toast.error('Failed to load bill')
      })
      .finally(() => setLoading(false))
  }, [billNumber])

  useEffect(() => {
    fetchBill()
  }, [fetchBill])

  if (loading) {
    return <PageLoader />
  }

  if (!bill) {
    return (
      <Card className="shadow-2xs">
        <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <p className="text-sm text-muted-foreground">Bill not found.</p>
          <Button variant="outline" size="sm" render={<Link href="/properties/bills" />} nativeButton={false}>
            Back to Bills
          </Button>
        </CardContent>
      </Card>
    )
  }

  const balance = (Number(bill.amountDue) - Number(bill.amountPaid)).toFixed(2)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 pb-2 border-b border-border/40 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 mt-0.5"
            render={<Link href="/properties/bills" />}
            nativeButton={false}
            title="Back to bills"
          >
            <ArrowLeftIcon className="size-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground font-mono">{bill.billNumber}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">{bill.billType} &middot; {bill.billingPeriod}</p>
          </div>
        </div>
        <PaymentStatusBadge status={bill.paymentStatus} />
      </div>

      <Card className="shadow-2xs">
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <ReceiptIcon className="size-4 text-primary" />
            Bill Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <OverviewField label="Bill Number" value={<span className="font-mono">{bill.billNumber}</span>} />
          <OverviewField label="External Reference" value={<span className="font-mono text-xs">{bill.externalBillRef}</span>} />
          <OverviewField label="Billing Period" value={bill.billingPeriod} />
          <OverviewField label="Bill Type" value={<Badge variant="outline" className="text-[10px] font-medium bg-muted text-muted-foreground">{bill.billType}</Badge>} />
          <OverviewField label="Amount Due" value={formatMoney(bill.currency, bill.amountDue)} />
          <OverviewField label="Amount Paid" value={formatMoney(bill.currency, bill.amountPaid)} />
          <OverviewField label="Outstanding Balance" value={formatMoney(bill.currency, balance)} />
          <OverviewField label="Issued" value={formatDate(bill.issuedAt)} />
          <OverviewField label="Due Date" value={formatDate(bill.dueDate)} />
        </CardContent>
      </Card>

      <Card className="shadow-2xs">
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <UserIcon className="size-4 text-primary" />
            Issuance &amp; Parties
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <OverviewField
            label="Property Billed"
            value={
              <span className="flex items-center gap-1.5 font-mono text-xs">
                <Building2Icon className="size-3.5 text-muted-foreground" />
                {bill.propertyId}
              </span>
            }
          />
          <OverviewField
            label="Ratepayer Billed"
            value={
              <Link href={`/ratepayers/${bill.ratepayerId}`} className="font-mono text-xs text-primary hover:underline">
                {bill.ratepayerId}
              </Link>
            }
          />
          <OverviewField label="Issuing Concession" value={<span className="font-mono text-xs">{bill.concessionId}</span>} />
          <OverviewField
            label="Issued By"
            value={bill.issuedByPersonnelId ? <span className="font-mono text-xs">{bill.issuedByPersonnelId}</span> : '—'}
          />
        </CardContent>
      </Card>

      <Card className="shadow-2xs overflow-hidden py-0 gap-0">
        <CardHeader className="border-b py-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <CircleDollarSignIcon className="size-4 text-primary" />
            Payment History
          </CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-6">Reference</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Amount</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Balance After</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Paid By</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-6">Paid</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bill.payments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-sm text-muted-foreground">
                    No payments recorded against this bill yet.
                  </TableCell>
                </TableRow>
              ) : (
                bill.payments.map(p => {
                  const paidForOther = p.paidByRatepayerId && p.paidByRatepayerId !== bill.ratepayerId
                  return (
                    <TableRow key={p.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="pl-6 font-mono text-xs text-foreground">{p.externalPaymentRef}</TableCell>
                      <TableCell className="text-xs font-medium text-foreground">{formatMoney(bill.currency, p.amount)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{formatMoney(bill.currency, p.balanceAtPayment)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {p.paidByRatepayerId ? (
                          <span className="font-mono">
                            {p.paidByRatepayerId.slice(0, 8)}...
                            {paidForOther && <span className="ml-1.5 text-[10px] text-amber-700 dark:text-amber-400">(on behalf of another ratepayer)</span>}
                          </span>
                        ) : '—'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px] font-medium bg-muted text-muted-foreground">{p.status}</Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground pr-6">{formatDateTime(p.paidAt)}</TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
