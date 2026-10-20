'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import {
  ArrowLeftIcon,
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon,
  ShieldCheckIcon,
  LandmarkIcon,
  UserIcon,
  Building2Icon,
  ReceiptIcon,
  EyeIcon
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PageLoader, Spinner } from '@/components/ui/spinner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  VerificationReviewDialog,
  type PendingVerification
} from '@/views/ratepayers/verification-review-dialog'

interface RatepayerVerification {
  id: string
  ratepayerId: string
  provider: string
  providerReference: string
  verificationStatus: string
  verifiedAt: string | null
  createdAt: string
}

interface RatepayerDetail {
  id: string
  code: string
  ratepayerType: string
  legalName: string
  phone: string
  email?: string | null
  regionId: string
  assemblyId: string
  status: string
  createdAt: string
  updatedAt?: string
  verifications?: RatepayerVerification[]
}

interface RatepayerPayment {
  id: string
  billId: string
  externalPaymentRef: string
  amount: string
  balanceAtPayment: string
  paidAt: string
  bill?: { billNumber: string; ratepayerId: string; currency: string }
}

interface PropertyLink {
  id: string
  unitId: string
  propertyId: string
  ratepayerId: string
  ownershipType: string
  ownershipPercentage: number | string
  isPrimaryBillingContact: boolean
  claimStatus: string
  effectiveFrom: string
  effectiveTo?: string | null
  createdAt: string
}

const humanize = (value?: string | null) =>
  (value ?? 'UNSPECIFIED')
    .toLowerCase()
    .split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

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

function RatepayerStatusBadge({ status }: { status: string }) {
  const s = (status || 'ACTIVE').toUpperCase()
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
        <ClockIcon className="size-2.5 mr-1" />
        Suspended
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20 text-[10px] font-medium">
      <XCircleIcon className="size-2.5 mr-1" />
      Deactivated
    </Badge>
  )
}

function VerificationStatusBadge({ status }: { status: string }) {
  const s = (status || 'PENDING').toUpperCase()
  if (s === 'VERIFIED') {
    return (
      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-medium">
        <CheckCircle2Icon className="size-2.5 mr-1" />
        Verified
      </Badge>
    )
  }
  if (s === 'REJECTED') {
    return (
      <Badge variant="outline" className="bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20 text-[10px] font-medium">
        <XCircleIcon className="size-2.5 mr-1" />
        Rejected
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-[10px] font-medium">
      <ClockIcon className="size-2.5 mr-1" />
      Pending
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

export function RatepayerDetailView({ ratepayerId }: { ratepayerId: string }) {
  const [ratepayer, setRatepayer] = useState<RatepayerDetail | null>(null)
  const [properties, setProperties] = useState<PropertyLink[]>([])
  const [payments, setPayments] = useState<RatepayerPayment[]>([])
  const [loading, setLoading] = useState(true)
  const [propertiesLoading, setPropertiesLoading] = useState(true)
  const [paymentsLoading, setPaymentsLoading] = useState(true)
  const [reviewTarget, setReviewTarget] = useState<PendingVerification | null>(null)
  const [reviewDecision, setReviewDecision] = useState<'VERIFIED' | 'REJECTED' | null>(null)

  const fetchRatepayer = useCallback(() => {
    setLoading(true)
    return fetch(`/api/ratepayers/${ratepayerId}`)
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          setRatepayer(res.data)
        } else {
          toast.error(res.error || 'Failed to load ratepayer')
        }
      })
      .catch(err => {
        console.error('Failed to load ratepayer:', err)
        toast.error('Failed to load ratepayer')
      })
      .finally(() => setLoading(false))
  }, [ratepayerId])

  const fetchProperties = useCallback(() => {
    setPropertiesLoading(true)
    return fetch(`/api/ratepayers/${ratepayerId}/properties`)
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data)) {
          setProperties(res.data)
        } else {
          toast.error(res.error || 'Failed to load linked properties')
        }
      })
      .catch(err => {
        console.error('Failed to load linked properties:', err)
        toast.error('Failed to load linked properties')
      })
      .finally(() => setPropertiesLoading(false))
  }, [ratepayerId])

  const fetchPayments = useCallback(() => {
    setPaymentsLoading(true)
    return fetch(`/api/billing/payments?paidByRatepayerId=${encodeURIComponent(ratepayerId)}&pageSize=50`)
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          setPayments(res.data.items ?? [])
        } else {
          toast.error(res.error || 'Failed to load payments')
        }
      })
      .catch(err => {
        console.error('Failed to load payments:', err)
        toast.error('Failed to load payments')
      })
      .finally(() => setPaymentsLoading(false))
  }, [ratepayerId])

  useEffect(() => {
    fetchRatepayer()
    fetchProperties()
    fetchPayments()
  }, [fetchRatepayer, fetchProperties, fetchPayments])

  const openReview = (verification: RatepayerVerification, decision: 'VERIFIED' | 'REJECTED') => {
    setReviewTarget({
      id: verification.id,
      provider: verification.provider,
      providerReference: verification.providerReference
    })
    setReviewDecision(decision)
  }

  const closeReview = () => {
    setReviewTarget(null)
    setReviewDecision(null)
  }

  const handleReviewed = () => {
    closeReview()
    fetchRatepayer()
  }

  if (loading) {
    return <PageLoader />
  }

  if (!ratepayer) {
    return (
      <Card className="shadow-2xs">
        <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <p className="text-sm text-muted-foreground">Ratepayer not found.</p>
          <Button variant="outline" size="sm" render={<Link href="/ratepayers" />} nativeButton={false}>
            Back to Directory
          </Button>
        </CardContent>
      </Card>
    )
  }

  const verifications = ratepayer.verifications ?? []
  const pendingCount = verifications.filter(v => (v.verificationStatus || 'PENDING').toUpperCase() === 'PENDING').length

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 pb-2 border-b border-border/40 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 mt-0.5"
            render={<Link href="/ratepayers" />}
            nativeButton={false}
            title="Back to directory"
          >
            <ArrowLeftIcon className="size-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{ratepayer.legalName}</h1>
            <p className="font-mono text-xs text-muted-foreground mt-0.5">{ratepayer.code}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <RatepayerStatusBadge status={ratepayer.status} />
          {pendingCount > 0 && (
            <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-[10px] font-medium">
              {pendingCount} verification{pendingCount > 1 ? 's' : ''} awaiting review
            </Badge>
          )}
        </div>
      </div>

      {/* Profile */}
      <Card className="shadow-2xs">
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            {ratepayer.ratepayerType === 'ORGANIZATION' ? (
              <Building2Icon className="size-4 text-primary" />
            ) : (
              <UserIcon className="size-4 text-primary" />
            )}
            Ratepayer Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <OverviewField label="Legal Name" value={ratepayer.legalName} />
          <OverviewField label="Ratepayer Code" value={<span className="font-mono">{ratepayer.code}</span>} />
          <OverviewField
            label="Ratepayer Type"
            value={
              <Badge variant="outline" className="text-[10px] font-medium bg-muted text-muted-foreground">
                {humanize(ratepayer.ratepayerType)}
              </Badge>
            }
          />
          <OverviewField label="Phone" value={<span className="font-mono">{ratepayer.phone}</span>} />
          <OverviewField label="Email" value={ratepayer.email} />
          <OverviewField label="Status" value={<RatepayerStatusBadge status={ratepayer.status} />} />
          <OverviewField label="Registered" value={formatDate(ratepayer.createdAt)} />
        </CardContent>
      </Card>

      {/* Linked Properties */}
      <Card className="shadow-2xs overflow-hidden py-0 gap-0">
        <CardHeader className="border-b py-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <LandmarkIcon className="size-4 text-primary" />
            Linked Properties
          </CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-6">
                  Property / Unit
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Ownership Type
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Ownership %
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Claim Status
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-6">
                  Effective From
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {propertiesLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-40 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Spinner className="size-6 text-primary" />
                      <p className="text-xs text-muted-foreground">Loading linked properties...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : properties.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-sm text-muted-foreground">
                    No properties are linked to this ratepayer.
                  </TableCell>
                </TableRow>
              ) : (
                properties.map(link => (
                  <TableRow key={link.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-foreground">Property Parcel</span>
                        <span className="text-[11px] text-muted-foreground">Registered Unit</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] font-medium bg-muted text-muted-foreground">
                        {humanize(link.ownershipType)}
                        {link.isPrimaryBillingContact ? ' • Primary Contact' : ''}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{Number(link.ownershipPercentage).toFixed(2)}%</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] font-medium bg-muted text-muted-foreground">
                        {humanize(link.claimStatus)}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-6 text-xs text-muted-foreground">{formatDate(link.effectiveFrom)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Payments */}
      <Card className="shadow-2xs overflow-hidden py-0 gap-0">
        <CardHeader className="border-b py-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <ReceiptIcon className="size-4 text-primary" />
            Payments
          </CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-6">
                  Reference
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
                  Paid
                </TableHead>
                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentsLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Spinner className="size-6 text-primary" />
                      <p className="text-xs text-muted-foreground">Loading payments...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : payments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-sm text-muted-foreground">
                    This ratepayer has not made any payments yet.
                  </TableCell>
                </TableRow>
              ) : (
                payments.map(payment => {
                  const currency = payment.bill?.currency ?? 'GHS'
                  const paidForOther = payment.bill && payment.bill.ratepayerId !== ratepayerId
                  return (
                    <TableRow key={payment.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="pl-6">
                        <div className="flex flex-col">
                          <span className="font-mono text-xs font-semibold text-foreground">{payment.externalPaymentRef}</span>
                          {paidForOther && (
                            <span className="text-[10px] text-amber-700 dark:text-amber-400">Paid on behalf of another ratepayer</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground">{payment.bill?.billNumber ?? 'Bill Ref'}</TableCell>
                      <TableCell className="text-xs font-medium text-foreground">{formatMoney(currency, payment.amount)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{formatMoney(currency, payment.balanceAtPayment)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{formatDate(payment.paidAt)}</TableCell>
                      <TableCell className="text-center pr-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-[11px] gap-1"
                          render={<Link href={`/properties/bills/${payment.bill?.billNumber ?? ''}`} />}
                          nativeButton={false}
                          disabled={!payment.bill?.billNumber}
                        >
                          <EyeIcon className="size-3.5" />
                          View Bill
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* KYC Verifications */}
      <Card className="shadow-2xs overflow-hidden py-0 gap-0">
        <CardHeader className="border-b py-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <ShieldCheckIcon className="size-4 text-primary" />
            KYC Verifications
          </CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-6">
                  Provider
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Provider Reference
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Verified At
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Submitted
                </TableHead>
                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {verifications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-sm text-muted-foreground">
                    No KYC verification records on file for this ratepayer.
                  </TableCell>
                </TableRow>
              ) : (
                verifications.map(v => {
                  const isPending = (v.verificationStatus || 'PENDING').toUpperCase() === 'PENDING'
                  return (
                    <TableRow key={v.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="pl-6 text-xs font-medium text-foreground">{humanize(v.provider)}</TableCell>
                      <TableCell className="font-mono text-[11px] text-muted-foreground">{v.providerReference}</TableCell>
                      <TableCell>
                        <VerificationStatusBadge status={v.verificationStatus} />
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{formatDate(v.verifiedAt)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{formatDateTime(v.createdAt)}</TableCell>
                      <TableCell className="text-center pr-6">
                        {isPending ? (
                          <div className="flex items-center justify-center gap-1.5">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 text-[11px] text-emerald-700 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
                              onClick={() => openReview(v, 'VERIFIED')}
                            >
                              <CheckCircle2Icon className="size-3 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 text-[11px] text-rose-700 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/10"
                              onClick={() => openReview(v, 'REJECTED')}
                            >
                              <XCircleIcon className="size-3 mr-1" />
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-muted-foreground">Reviewed</span>
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

      <VerificationReviewDialog
        ratepayerId={ratepayerId}
        verification={reviewTarget}
        decision={reviewDecision}
        onClose={closeReview}
        onReviewed={handleReviewed}
      />
    </div>
  )
}
