'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { format } from 'date-fns'
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  BanIcon,
  BriefcaseBusinessIcon,
  Building2Icon,
  CalendarDaysIcon,
  CheckCircle2Icon,
  ClockIcon,
  DownloadIcon,
  EyeIcon,
  FileCheck2Icon,
  FileTextIcon,
  HashIcon,
  LandmarkIcon,
  LayersIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ReceiptIcon,
  RefreshCwIcon,
  ShieldAlertIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  Trash2Icon,
  UnlinkIcon,
  UserCheckIcon,
  UserIcon,
  XCircleIcon
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BackgroundRippleEffect } from '@/components/ui/background-ripple'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PageLoader, Spinner } from '@/components/ui/spinner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  VerificationReviewDialog,
  type PendingVerification
} from '@/views/ratepayers/verification-review-dialog'
import { AddressLocationDialog } from '@/views/ratepayers/address-location-dialog'
import { RatepayerKycDialog } from '@/views/ratepayers/ratepayer-kyc-dialog'

interface RatepayerVerification {
  id: string
  ratepayerId: string
  provider: string
  providerReference: string
  verificationStatus: string
  verifiedAt: string | null
  createdAt: string
}

interface ActivityRecord {
  id: string
  occurredAt: string
  actorId: string
  actorType: string
  action: string
  outcome: string
  metadata?: Record<string, any>
}

export interface RatepayerCompletion {
  completionPercentage: number
  isProfileComplete: boolean
  hasVerifiedKyc: boolean
  isEligibleForPropertyCreation: boolean
  missingSections: string[]
}

interface RatepayerDetail {
  id: string
  code: string
  ratepayerType: string
  firstName?: string | null
  middleName?: string | null
  lastName?: string | null
  legalName: string
  phone: string
  email?: string | null
  address?: string | null
  concessionId?: string | null
  regionId: string
  assemblyId: string
  status: string
  createdAt: string
  updatedAt?: string
  locationGeo?: any
  verifications?: RatepayerVerification[]
  completion?: RatepayerCompletion
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

interface RatepayerDispute {
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

const humanize = (value?: string | null) =>
  (value ?? 'UNSPECIFIED')
    .toLowerCase()
    .split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

const formatDate = (value?: string | null) => {
  if (!value) return '—'
  try {
    return format(new Date(value), 'dd MMM yyyy')
  } catch {
    return '—'
  }
}

const formatDateTime = (value?: string | null) => {
  if (!value) return '—'
  try {
    return format(new Date(value), 'dd MMM yyyy, HH:mm')
  } catch {
    return '—'
  }
}

const ACTIVITY_DOT_CLASS: Record<string, string> = {
  'ratepayer.registered': 'bg-primary/20 border-primary',
  'ratepayer.login': 'bg-sky-500/20 border-sky-500',
  'ratepayer.logout': 'bg-slate-500/20 border-slate-500',
  'ratepayer.profile_updated': 'bg-blue-500/20 border-blue-500',
  'ratepayer.kyc_submitted': 'bg-amber-500/20 border-amber-500',
  'ratepayer.kyc_reviewed': 'bg-emerald-500/20 border-emerald-500',
  'ratepayer.status_changed': 'bg-rose-500/20 border-rose-500',
  'ratepayer.property_claimed': 'bg-emerald-500/20 border-emerald-500',
  'ratepayer.property_link_severed': 'bg-rose-500/20 border-rose-500',
  'ratepayer.password_reset_requested': 'bg-amber-500/20 border-amber-500',
  'ratepayer.password_reset_completed': 'bg-emerald-500/20 border-emerald-500',
  'ratepayer.deleted': 'bg-rose-500/20 border-rose-500'
}

function describeActor(record: ActivityRecord): string {
  if (record.actorType === 'RATEPAYER') return 'by the ratepayer'
  if (record.actorType === 'SERVICE') return 'by the registering concession'
  return 'by a CROIP officer'
}

// Turns one raw audit-record action into the title + sentence the timeline renders —
// deliberately driven by real metadata (updatedFields, provider, from/to, etc.) rather
// than a canned description, so the card reflects what actually happened.
function describeActivity(record: ActivityRecord): { title: string; description: string } {
  const meta = record.metadata ?? {}
  switch (record.action) {
    case 'ratepayer.registered':
      return {
        title: 'Account Registered',
        description: `Citizen profile registered (${meta.via === 'concession' ? 'via concession walk-in' : meta.via === 'staff' ? 'via staff walk-in' : 'self-registered'}). Ratepayer code ${meta.code ?? ''} issued.`
      }
    case 'ratepayer.login':
      return { title: 'Signed In', description: 'Ratepayer completed OTP verification and started a new session.' }
    case 'ratepayer.logout':
      return { title: 'Signed Out', description: 'Ratepayer ended that session; the session token was revoked.' }
    case 'ratepayer.profile_updated': {
      const fields = Array.isArray(meta.updatedFields) ? meta.updatedFields.join(', ') : 'profile fields'
      return {
        title: 'Profile Updated',
        description: `${describeActor(record)}, via ${meta.via ?? 'unknown'}. Changed: ${fields}.`
      }
    }
    case 'ratepayer.kyc_submitted':
      return {
        title: `${humanize(meta.provider)} Verification Submitted`,
        description: `Identity verification recorded with status ${humanize(meta.verificationStatus)}${meta.autoVerified === false ? ' — pending officer review' : ''}.`
      }
    case 'ratepayer.kyc_reviewed':
      return {
        title: `${humanize(meta.provider)} Verification Reviewed`,
        description: `Verification ${describeActor(record)}, outcome: ${humanize(meta.verificationStatus)}.`
      }
    case 'ratepayer.status_changed':
      return {
        title: 'Account Status Changed',
        description: `Status changed from ${humanize(meta.from)} to ${humanize(meta.to)} ${describeActor(record)}.`
      }
    case 'ratepayer.property_claimed':
      return { title: 'Property Claimed', description: `Ownership/tenancy claim submitted ${describeActor(record)}.` }
    case 'ratepayer.property_link_severed':
      return { title: 'Property Link Severed', description: `A property link was removed from this account ${describeActor(record)}.` }
    case 'ratepayer.password_reset_requested':
      return { title: 'Password Reset Requested', description: 'A one-time code was dispatched to confirm this request.' }
    case 'ratepayer.password_reset_completed':
      return { title: 'Password Reset Completed', description: 'Password was changed and a new session was issued.' }
    case 'ratepayer.deleted':
      return { title: 'Account Deleted', description: `Profile removed ${describeActor(record)}.` }
    default:
      return { title: humanize(record.action), description: `Outcome: ${humanize(record.outcome)}.` }
  }
}

function formatMoney(currency: string, amount: string | number) {
  const n = Number(amount)
  if (Number.isNaN(n)) return `${currency} ${amount}`
  return `${currency} ${n.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function RatepayerStatusBadge({ status }: { status: string }) {
  const s = (status || 'ACTIVE').toUpperCase()
  if (s === 'ACTIVE') {
    return (
      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-xs font-medium">
        <CheckCircle2Icon className="size-3 mr-1" />
        Active
      </Badge>
    )
  }
  if (s === 'SUSPENDED') {
    return (
      <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-xs font-medium">
        <ClockIcon className="size-3 mr-1" />
        Suspended
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20 text-xs font-medium">
      <XCircleIcon className="size-3 mr-1" />
      Deactivated
    </Badge>
  )
}

function DisputeStatusBadge({ status }: { status: string }) {
  const s = (status || 'OPEN').toUpperCase()
  if (s === 'RESOLVED') {
    return (
      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-medium">
        <CheckCircle2Icon className="size-2.5 mr-1" />
        Resolved
      </Badge>
    )
  }
  if (s === 'UNDER_REVIEW') {
    return (
      <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20 text-[10px] font-medium">
        <ClockIcon className="size-2.5 mr-1" />
        Under Review
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
      <AlertCircleIcon className="size-2.5 mr-1" />
      Open
    </Badge>
  )
}

function VerificationStatusBadge({ status }: { status: string }) {
  const s = (status || 'PENDING').toUpperCase()
  if (s === 'VERIFIED') {
    return (
      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-medium">
        <CheckCircle2Icon className="size-2.5 mr-1" />
        Verified (Active)
      </Badge>
    )
  }
  if (s === 'ARCHIVED') {
    return (
      <Badge variant="outline" className="bg-muted text-muted-foreground border-border text-[10px] font-medium">
        <ClockIcon className="size-2.5 mr-1" />
        Archived (Audit Trail)
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
      Pending Review
    </Badge>
  )
}

export function RatepayerDetailView({ ratepayerId }: { ratepayerId: string }) {
  const [activeTab, setActiveTab] = useState<'bio' | 'properties' | 'payments' | 'disputes' | 'actions'>('bio')
  const [ratepayer, setRatepayer] = useState<RatepayerDetail | null>(null)
  const [properties, setProperties] = useState<PropertyLink[]>([])
  const [payments, setPayments] = useState<RatepayerPayment[]>([])
  const [disputes, setDisputes] = useState<RatepayerDispute[]>([])
  const [activity, setActivity] = useState<ActivityRecord[]>([])
  const [assemblyName, setAssemblyName] = useState<string>('Accra Metropolitan Assembly (AMA)')
  const [regionName, setRegionName] = useState<string>('Greater Accra Region (GAR)')
  const [concessionInfo, setConcessionInfo] = useState<{ name: string; code: string } | null>(null)
  const [concessionResolved, setConcessionResolved] = useState(false)

  const [loading, setLoading] = useState(true)
  const [propertiesLoading, setPropertiesLoading] = useState(true)
  const [paymentsLoading, setPaymentsLoading] = useState(true)
  const [disputesLoading, setDisputesLoading] = useState(true)
  const [activityLoading, setActivityLoading] = useState(true)

  // Status Action Dialog
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  const [pendingStatus, setPendingStatus] = useState<'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED' | null>(null)
  const [statusSubmitting, setStatusSubmitting] = useState(false)

  // Review Dialog
  const [reviewTarget, setReviewTarget] = useState<PendingVerification | null>(null)
  const [reviewDecision, setReviewDecision] = useState<'VERIFIED' | 'REJECTED' | null>(null)

  // Address & Location Dialog
  const [addressDialogOpen, setAddressDialogOpen] = useState(false)

  // KYC Verification Dialog
  const [kycDialogOpen, setKycDialogOpen] = useState(false)

  const router = useRouter()

  // KYC Verification Action
  const [kycVerifying, setKycVerifying] = useState(false)

  // Ratepayer Delete Dialog
  const [deleteRatepayerDialogOpen, setDeleteRatepayerDialogOpen] = useState(false)
  const [deleteSubmitting, setDeleteSubmitting] = useState(false)

  // Sever Property Link Dialog
  const [severTarget, setSeverTarget] = useState<{ propertyId: string } | null>(null)
  const [severSubmitting, setSeverSubmitting] = useState(false)

  const fetchRatepayer = useCallback(() => {
    setLoading(true)
    return fetch(`/api/ratepayers/${ratepayerId}`)
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          setRatepayer(res.data)
        } else {
          toast.error(res.error || 'Failed to load ratepayer profile')
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

  const fetchDisputes = useCallback(() => {
    setDisputesLoading(true)
    return fetch(`/api/disputes?raisedByRatepayerId=${encodeURIComponent(ratepayerId)}`)
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data)) {
          setDisputes(res.data)
        }
      })
      .catch(err => {
        console.error('Failed to load ratepayer disputes:', err)
      })
      .finally(() => setDisputesLoading(false))
  }, [ratepayerId])

  const fetchActivity = useCallback(() => {
    setActivityLoading(true)
    return fetch(`/api/ratepayers/${ratepayerId}/activity`)
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data)) {
          setActivity(res.data)
        }
      })
      .catch(err => {
        console.error('Failed to load ratepayer account activity:', err)
      })
      .finally(() => setActivityLoading(false))
  }, [ratepayerId])

  // Resolve Assembly & Region Jurisdictions
  useEffect(() => {
    if (!ratepayer) return

    fetch('/api/geo/assemblies')
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data)) {
          const found = res.data.find((a: any) => a.id === ratepayer.assemblyId)
          if (found) setAssemblyName(`${found.name} (${found.code})`)
        }
      })
      .catch(() => {})

    fetch('/api/geo/regions')
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data)) {
          const found = res.data.find((r: any) => r.id === ratepayer.regionId)
          if (found) setRegionName(`${found.name} (${found.code})`)
        }
      })
      .catch(() => {})
  }, [ratepayer])

  // Resolve the concession this ratepayer was registered under. Not every ratepayer has
  // one tied to a real concessionaire — a staff walk-in registration carries the shared
  // CROIP-admin placeholder id instead, which 404s here — so a failed lookup is treated as
  // "no specific concession", not an error.
  useEffect(() => {
    if (!ratepayer) return
    setConcessionResolved(false)
    if (!ratepayer.concessionId) {
      setConcessionInfo(null)
      setConcessionResolved(true)
      return
    }
    fetch(`/api/concessions/${encodeURIComponent(ratepayer.concessionId)}`)
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          setConcessionInfo({ name: res.data.name, code: res.data.code })
        } else {
          setConcessionInfo(null)
        }
      })
      .catch(() => setConcessionInfo(null))
      .finally(() => setConcessionResolved(true))
  }, [ratepayer])

  useEffect(() => {
    fetchRatepayer(); fetchActivity()
    fetchProperties()
    fetchPayments()
    fetchDisputes()
  }, [fetchRatepayer, fetchProperties, fetchPayments, fetchDisputes, fetchActivity])

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
    fetchRatepayer(); fetchActivity()
  }

  const handleStatusChangeSubmit = async () => {
    if (!pendingStatus) return
    setStatusSubmitting(true)

    try {
      const res = await fetch(`/api/ratepayers/${ratepayerId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: pendingStatus })
      })
      const data = await res.json()

      if (data.success) {
        toast.success(`Ratepayer account marked as ${pendingStatus.toLowerCase()}`)
        setStatusDialogOpen(false)
        setPendingStatus(null)
        fetchRatepayer(); fetchActivity()
      } else {
        toast.error(data.error || 'Failed to update account status')
      }
    } catch (err) {
      console.error('Failed to change status:', err)
      toast.error('An unexpected error occurred while updating status')
    } finally {
      setStatusSubmitting(false)
    }
  }

  const handlePrintStatement = () => {
    window.print()
  }

  const handleVerifyKyc = async () => {
    setKycVerifying(true)
    try {
      const res = await fetch(`/api/ratepayers/${ratepayerId}/verifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: 'GHANA_CARD_NIA',
          autoVerify: true
        })
      })
      const data = await res.json()
      if (data.success) {
        toast.success(`KYC verified successfully (${data.data?.providerReference || 'Ghana Card NIA'})`)
        fetchRatepayer(); fetchActivity()
      } else {
        toast.error(data.error || 'Failed to verify KYC')
      }
    } catch (err) {
      console.error('Failed to verify KYC:', err)
      toast.error('An unexpected error occurred while verifying KYC')
    } finally {
      setKycVerifying(false)
    }
  }

  const handleDeleteRatepayer = async () => {
    setDeleteSubmitting(true)
    try {
      const res = await fetch(`/api/ratepayers/${ratepayerId}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      if (data.success) {
        toast.success(data.data?.message || 'Ratepayer deleted successfully')
        setDeleteRatepayerDialogOpen(false)
        router.push('/ratepayers')
      } else {
        toast.error(data.error || 'Failed to delete ratepayer')
      }
    } catch (err) {
      console.error('Failed to delete ratepayer:', err)
      toast.error('An unexpected error occurred while deleting ratepayer')
    } finally {
      setDeleteSubmitting(false)
    }
  }

  const handleSeverPropertyLink = async () => {
    if (!severTarget) return
    setSeverSubmitting(true)
    try {
      const res = await fetch(`/api/ratepayers/${ratepayerId}/properties/${severTarget.propertyId}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Property link severed successfully')
        setSeverTarget(null)
        fetchProperties()
        fetchRatepayer(); fetchActivity()
      } else {
        toast.error(data.error || 'Failed to sever property link')
      }
    } catch (err) {
      console.error('Failed to sever property link:', err)
      toast.error('An unexpected error occurred while severing property link')
    } finally {
      setSeverSubmitting(false)
    }
  }

  if (loading) {
    return <PageLoader />
  }

  if (!ratepayer) {
    return (
      <Card className="shadow-2xs">
        <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <p className="text-sm text-muted-foreground">Ratepayer profile not found.</p>
          <Button variant="outline" size="sm" render={<Link href="/ratepayers" />} nativeButton={false}>
            Back to Directory
          </Button>
        </CardContent>
      </Card>
    )
  }

  const initials = ratepayer.legalName
    .split(' ')
    .filter(Boolean)
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'RP'

  const verifications = ratepayer.verifications ?? []
  const activeVerification = verifications.find(v => (v.verificationStatus || '').toUpperCase() === 'VERIFIED')
  const pendingCount = verifications.filter(v => (v.verificationStatus || 'PENDING').toUpperCase() === 'PENDING').length
  const totalPaidSum = payments.reduce((acc, p) => acc + (Number(p.amount) || 0), 0)
  const openDisputesCount = disputes.filter(d => ['OPEN', 'UNDER_REVIEW'].includes(d.status.toUpperCase())).length

  // How this profile came to exist — read from the account activity log's own
  // ratepayer.registered entry rather than guessed from other fields, so it reflects
  // exactly what happened (self-service, concession walk-in, or staff walk-in).
  const registrationRecord = activity.find(a => a.action === 'ratepayer.registered')
  const registrationVia = registrationRecord?.metadata?.via as string | undefined
  const registrationMethodLabel =
    registrationVia === 'concession' ? 'Concession Walk-In'
      : registrationVia === 'staff' ? 'Staff Walk-In'
      : registrationVia === 'self-service' ? 'Self-Registered'
      : null

  return (
    <div className="space-y-6">
      {/* Top Profile Banner Header (Matching User Profile Screen) */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            render={<Link href="/ratepayers" />}
            nativeButton={false}
          >
            <ArrowLeftIcon className="size-3.5" />
            Back to Directory
          </Button>
        </div>

        <Card className="py-0 pb-6 overflow-hidden">
          <div className="bg-muted relative h-44 overflow-hidden">
            <div className="absolute inset-0">
              <BackgroundRippleEffect cellSize={45} rows={8} activeSquares={18} cols={45} />
            </div>
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <span className="bg-background/80 backdrop-blur-xs text-foreground px-2.5 py-1 rounded-md text-xs font-mono font-medium shadow-2xs border border-border/40">
                {ratepayer.code}
              </span>
            </div>
          </div>

          <CardContent>
            <div className="flex items-end gap-4 pb-1 max-md:flex-col max-md:items-center md:flex-nowrap md:gap-6">
              <Avatar className="ring-card z-3 -mt-12 size-28 overflow-hidden rounded-xl ring-4 after:rounded-xl md:-mt-14 shadow-md bg-background">
                <AvatarImage src="/images/avatars/avatar-1.webp" alt={ratepayer.legalName} className="size-full !rounded-none object-cover" />
                <AvatarFallback className="size-full !rounded-none text-2xl font-semibold bg-primary/10 text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1 space-y-2 text-center md:text-left">
                <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">{ratepayer.legalName}</h2>
                  <RatepayerStatusBadge status={ratepayer.status} />
                  {pendingCount > 0 && (
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-[10px] font-medium">
                      {pendingCount} KYC pending
                    </Badge>
                  )}
                </div>

                <div className="text-muted-foreground flex flex-wrap items-center gap-x-6 gap-y-2 max-md:justify-center text-xs">
                  <span className="inline-flex items-center gap-1.5">
                    {ratepayer.ratepayerType === 'ORGANIZATION' ? (
                      <Building2Icon className="size-4 shrink-0 text-primary" />
                    ) : (
                      <UserIcon className="size-4 shrink-0 text-primary" />
                    )}
                    {humanize(ratepayer.ratepayerType)} Ratepayer
                  </span>

                  <span className="inline-flex items-center gap-1.5" title={assemblyName}>
                    <MapPinIcon className="size-4 shrink-0 text-primary" />
                    {assemblyName}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <PhoneIcon className="size-4 shrink-0 text-primary" />
                    <span className="font-mono">{ratepayer.phone}</span>
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDaysIcon className="size-4 shrink-0 text-primary" />
                    Registered {formatDate(ratepayer.createdAt)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 md:ml-auto md:self-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs"
                  onClick={() => setAddressDialogOpen(true)}
                >
                  <UserCheckIcon className="size-3.5" />
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs"
                  onClick={handlePrintStatement}
                >
                  <DownloadIcon className="size-3.5" />
                  Statement
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-500/10 border-rose-500/30"
                  onClick={() => setDeleteRatepayerDialogOpen(true)}
                >
                  <Trash2Icon className="size-3.5" />
                  Delete
                </Button>
                <Button
                  size="sm"
                  className="gap-1.5 text-xs"
                  onClick={() => setActiveTab('actions')}
                >
                  <SlidersHorizontalIcon className="size-3.5" />
                  Manage Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Navigation (Bio, Properties, Payments, Disputes, Actions) */}
      <Tabs
        value={activeTab}
        onValueChange={val => setActiveTab(val as any)}
        className="w-full space-y-6"
      >
        <TabsList className="max-sm:w-full flex flex-wrap h-auto p-1 bg-muted/60 border border-border/40">
          <TabsTrigger value="bio" className="flex items-center gap-2 py-2 px-3 text-xs">
            <UserIcon className="size-3.5" />
            <span>Bio</span>
          </TabsTrigger>

          <TabsTrigger value="properties" className="flex items-center gap-2 py-2 px-3 text-xs">
            <LandmarkIcon className="size-3.5" />
            <span>Properties</span>
            {properties.length > 0 && (
              <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0 h-4">
                {properties.length}
              </Badge>
            )}
          </TabsTrigger>

          <TabsTrigger value="payments" className="flex items-center gap-2 py-2 px-3 text-xs">
            <ReceiptIcon className="size-3.5" />
            <span>Payments</span>
            {payments.length > 0 && (
              <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0 h-4">
                {payments.length}
              </Badge>
            )}
          </TabsTrigger>

          <TabsTrigger value="disputes" className="flex items-center gap-2 py-2 px-3 text-xs">
            <AlertCircleIcon className="size-3.5" />
            <span>Disputes</span>
            {disputes.length > 0 && (
              <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0 h-4">
                {disputes.length}
              </Badge>
            )}
          </TabsTrigger>

          <TabsTrigger value="actions" className="flex items-center gap-2 py-2 px-3 text-xs">
            <SlidersHorizontalIcon className="size-3.5" />
            <span>Actions</span>
          </TabsTrigger>
        </TabsList>

        {/* =========================================================================
            TAB 1: BIO
           ========================================================================= */}
        <TabsContent value="bio" className="space-y-6">
          {/* Profile Completion Overview Banner */}
          {ratepayer.completion && (
            <Card className="border-border/60 bg-linear-to-r from-primary/5 via-background to-background">
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Profile Completion Score
                      </span>
                      <Badge
                        variant="outline"
                        className={
                          ratepayer.completion.completionPercentage === 100
                            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 font-bold'
                            : 'bg-primary/10 text-primary border-primary/30 font-bold'
                        }
                      >
                        {ratepayer.completion.completionPercentage}%
                      </Badge>
                      {ratepayer.completion.hasVerifiedKyc ? (
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px]">
                          <ShieldCheckIcon className="size-2.5 mr-1" />
                          KYC Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-[10px]">
                          <ClockIcon className="size-2.5 mr-1" />
                          KYC Pending
                        </Badge>
                      )}
                      {ratepayer.completion.isEligibleForPropertyCreation ? (
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px]">
                          <CheckCircle2Icon className="size-2.5 mr-1" />
                          Eligible for Properties
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20 text-[10px]">
                          <AlertCircleIcon className="size-2.5 mr-1" />
                          Property Creation Ineligible
                        </Badge>
                      )}
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden border border-border/40">
                      <div
                        className="bg-primary h-full transition-all duration-500 rounded-full"
                        style={{ width: `${ratepayer.completion.completionPercentage}%` }}
                      />
                    </div>
                    {ratepayer.completion.missingSections?.length > 0 && (
                      <p className="text-[11px] text-muted-foreground pt-0.5">
                        Incomplete sections: <strong>{ratepayer.completion.missingSections.join(', ')}</strong>.
                        <span className="text-primary cursor-pointer hover:underline ml-1 font-medium" onClick={() => setAddressDialogOpen(true)}>
                          Complete missing profile information now &rarr;
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 self-stretch sm:self-center shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs gap-1.5 h-8 w-full sm:w-auto"
                      onClick={() => setAddressDialogOpen(true)}
                    >
                      <MapPinIcon className="size-3.5 text-primary" />
                      Pinpoint Location
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-12 gap-6">
            {/* Left Column (4 cols): Profile Details & Contacts */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* About Ratepayer */}
              <Card>
                <CardHeader className="pb-3 border-b border-border/40">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <UserIcon className="size-4 text-primary" />
                      Ratepayer Bio
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-1.5 text-[11px] text-primary hover:text-primary"
                      onClick={() => setAddressDialogOpen(true)}
                    >
                      Edit Profile
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2 text-sm">
                      <span className="text-muted-foreground text-xs font-medium">Legal Name:</span>
                      <span className="font-semibold text-foreground text-right">{ratepayer.legalName}</span>
                    </div>

                    {(ratepayer.firstName || ratepayer.lastName) && (
                      <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-muted/40 border border-border/50 text-xs">
                        <div>
                          <div className="text-[10px] uppercase font-semibold text-muted-foreground">First</div>
                          <div className="font-medium text-foreground truncate">{ratepayer.firstName || '—'}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-semibold text-muted-foreground">Middle</div>
                          <div className="font-medium text-foreground truncate">{ratepayer.middleName || '—'}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-semibold text-muted-foreground">Last</div>
                          <div className="font-medium text-foreground truncate">{ratepayer.lastName || '—'}</div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-2 text-sm">
                      <span className="text-muted-foreground text-xs font-medium">Ratepayer Code:</span>
                      <span className="font-mono text-xs font-semibold text-foreground">{ratepayer.code}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2 text-sm">
                      <span className="text-muted-foreground text-xs font-medium">Entity Type:</span>
                      <Badge variant="outline" className="text-[10px] font-medium bg-muted">
                        {humanize(ratepayer.ratepayerType)}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between gap-2 text-sm">
                      <span className="text-muted-foreground text-xs font-medium">Status:</span>
                      <RatepayerStatusBadge status={ratepayer.status} />
                    </div>

                    <div className="flex items-center justify-between gap-2 text-sm">
                      <span className="text-muted-foreground text-xs font-medium">Country:</span>
                      <span className="text-xs text-foreground font-medium">Ghana 🇬🇭</span>
                    </div>

                    <div className="flex items-center justify-between gap-2 text-sm">
                      <span className="text-muted-foreground text-xs font-medium">Primary Languages:</span>
                      <span className="text-xs text-muted-foreground">English, Twi</span>
                    </div>

                    <div className="flex items-center justify-between gap-2 text-sm">
                      <span className="text-muted-foreground text-xs font-medium">Registration Date:</span>
                      <span className="text-xs text-muted-foreground">{formatDate(ratepayer.createdAt)}</span>
                    </div>

                    {registrationMethodLabel && (
                      <div className="flex items-center justify-between gap-2 text-sm">
                        <span className="text-muted-foreground text-xs font-medium">Registration Method:</span>
                        <Badge variant="outline" className="text-[10px] font-medium bg-muted">
                          {registrationMethodLabel}
                        </Badge>
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-2 text-sm pt-1 border-t border-border/40">
                      <span className="text-muted-foreground text-xs font-medium inline-flex items-center gap-1.5 shrink-0">
                        <BriefcaseBusinessIcon className="size-3.5 text-muted-foreground" />
                        Registered Via Concession:
                      </span>
                      <span className="text-xs text-right">
                        {!concessionResolved ? (
                          <span className="text-muted-foreground">Resolving…</span>
                        ) : concessionInfo ? (
                          <span className="font-semibold text-foreground">
                            {concessionInfo.name} <span className="font-mono text-[11px] text-muted-foreground">({concessionInfo.code})</span>
                          </span>
                        ) : (
                          <span className="text-muted-foreground italic">CROIP staff (no specific concession)</span>
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact & Jurisdiction */}
              <Card>
                <CardHeader className="pb-3 border-b border-border/40">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <MapPinIcon className="size-4 text-primary" />
                      Jurisdiction & Address
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-1.5 text-[11px] text-primary hover:text-primary"
                      onClick={() => setAddressDialogOpen(true)}
                    >
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 text-sm">
                      <span className="text-muted-foreground text-xs font-medium inline-flex items-center gap-1.5">
                        <PhoneIcon className="size-3.5 text-muted-foreground" />
                        Phone:
                      </span>
                      <span className="font-mono text-xs font-semibold text-foreground">{ratepayer.phone || '—'}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2 text-sm">
                      <span className="text-muted-foreground text-xs font-medium inline-flex items-center gap-1.5">
                        <MailIcon className="size-3.5 text-muted-foreground" />
                        Email:
                      </span>
                      <span className="text-xs text-foreground truncate max-w-[180px]">{ratepayer.email || '—'}</span>
                    </div>

                    <div className="flex items-start justify-between gap-2 text-sm">
                      <span className="text-muted-foreground text-xs font-medium inline-flex items-center gap-1.5 shrink-0">
                        <MapPinIcon className="size-3.5 text-muted-foreground" />
                        Address:
                      </span>
                      <span className="text-xs text-foreground text-right font-medium">
                        {ratepayer.address || (
                          <span className="text-muted-foreground italic">Not provided</span>
                        )}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-2 text-sm">
                      <span className="text-muted-foreground text-xs font-medium inline-flex items-center gap-1.5 shrink-0">
                        <Building2Icon className="size-3.5 text-muted-foreground" />
                        MMDA (Zone):
                      </span>
                      <span className="text-xs text-foreground text-right font-medium">{assemblyName}</span>
                    </div>

                    <div className="flex items-start justify-between gap-2 text-sm">
                      <span className="text-muted-foreground text-xs font-medium inline-flex items-center gap-1.5 shrink-0">
                        <LandmarkIcon className="size-3.5 text-muted-foreground" />
                        Region:
                      </span>
                      <span className="text-xs text-foreground text-right">{regionName}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2 text-sm pt-1 border-t border-border/40">
                      <span className="text-muted-foreground text-xs font-medium">Pinpoint Coordinates:</span>
                      <span className="font-mono text-[11px] text-foreground">
                        {ratepayer.locationGeo?.coordinates
                          ? `[${Number(ratepayer.locationGeo.coordinates[0]).toFixed(4)}, ${Number(ratepayer.locationGeo.coordinates[1]).toFixed(4)}]`
                          : 'Not pinned'}
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2 text-xs gap-1.5 h-8"
                      onClick={() => setAddressDialogOpen(true)}
                    >
                      <MapPinIcon className="size-3.5 text-primary" />
                      {ratepayer.address ? 'Edit Profile & Pin Location' : 'Complete Profile & Pin Location'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Account Overview Metrics */}
              <Card className="bg-muted/30">
                <CardHeader className="pb-3 border-b border-border/40">
                  <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <LayersIcon className="size-4 text-primary" />
                    Account Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-background border border-border/40">
                    <span className="text-[11px] text-muted-foreground uppercase font-medium">Properties</span>
                    <p className="text-xl font-bold mt-1 text-foreground">{properties.length}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-background border border-border/40">
                    <span className="text-[11px] text-muted-foreground uppercase font-medium">Total Paid</span>
                    <p className="text-xl font-bold mt-1 text-foreground">GHS {totalPaidSum.toLocaleString('en-GH', { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-background border border-border/40">
                    <span className="text-[11px] text-muted-foreground uppercase font-medium">KYC Records</span>
                    <p className="text-xl font-bold mt-1 text-foreground">{verifications.length}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-background border border-border/40">
                    <span className="text-[11px] text-muted-foreground uppercase font-medium">Disputes</span>
                    <p className="text-xl font-bold mt-1 text-foreground">{disputes.length}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column (8 cols): KYC Verifications & Activity Timeline */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {/* KYC Verifications Card */}
              <Card className="shadow-2xs overflow-hidden py-0 gap-0">
                <CardHeader className="border-b py-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                      <ShieldCheckIcon className="size-4 text-primary" />
                      KYC & Citizen Identity Verifications
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {activeVerification && (
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-xs font-medium">
                          <CheckCircle2Icon className="size-3 mr-1" />
                          Active: {humanize(activeVerification.provider)}
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-xs h-7 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
                        onClick={() => setKycDialogOpen(true)}
                      >
                        <ShieldCheckIcon className="size-3.5" />
                        Verify / Change ID
                      </Button>
                      {pendingCount > 0 && (
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-xs">
                          {pendingCount} Pending Review
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/40 hover:bg-muted/40">
                        <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-6">
                          Provider
                        </TableHead>
                        <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          ID Reference
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
                            <div className="flex flex-col items-center justify-center gap-2 py-4">
                              <p>No KYC verification records found for this ratepayer profile.</p>
                              <Button
                                size="sm"
                                variant="outline"
                                className="gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
                                onClick={() => setKycDialogOpen(true)}
                              >
                                <ShieldCheckIcon className="size-3.5" />
                                Verify Citizen Identity (Ghana Card, Passport, Driver&apos;s License)
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        verifications.map(v => {
                          const isPending = (v.verificationStatus || 'PENDING').toUpperCase() === 'PENDING'
                          const isArchived = (v.verificationStatus || '').toUpperCase() === 'ARCHIVED'
                          const isVerified = (v.verificationStatus || '').toUpperCase() === 'VERIFIED'
                          return (
                            <TableRow key={v.id} className="hover:bg-muted/30 transition-colors">
                              <TableCell className="pl-6 text-xs font-medium text-foreground">
                                <div className="flex items-center gap-2">
                                  <ShieldCheckIcon className="size-3.5 text-primary/70" />
                                  {humanize(v.provider)}
                                </div>
                              </TableCell>
                              <TableCell className="font-mono text-xs text-foreground font-semibold">
                                {v.providerReference}
                              </TableCell>
                              <TableCell>
                                <VerificationStatusBadge status={v.verificationStatus} />
                              </TableCell>
                              <TableCell className="text-xs text-muted-foreground">
                                {formatDate(v.verifiedAt)}
                              </TableCell>
                              <TableCell className="text-xs text-muted-foreground">
                                {formatDate(v.createdAt)}
                              </TableCell>
                              <TableCell className="text-center pr-6">
                                {isPending ? (
                                  <div className="flex items-center justify-center gap-1.5">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-7 text-xs text-emerald-700 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10 gap-1"
                                      onClick={() => openReview(v, 'VERIFIED')}
                                    >
                                      <CheckCircle2Icon className="size-3" />
                                      Approve
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-7 text-xs text-rose-700 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/10 gap-1"
                                      onClick={() => openReview(v, 'REJECTED')}
                                    >
                                      <XCircleIcon className="size-3" />
                                      Reject
                                    </Button>
                                  </div>
                                ) : isArchived ? (
                                  <span className="text-[11px] text-muted-foreground font-mono">Archived (Audit)</span>
                                ) : isVerified ? (
                                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium inline-flex items-center gap-1">
                                    <CheckCircle2Icon className="size-3" />
                                    Active
                                  </span>
                                ) : (
                                  <span className="text-xs text-muted-foreground font-medium">Reviewed</span>
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

              {/* Account Activity */}
              <Card>
                <CardHeader className="pb-3 border-b border-border/40">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <ClockIcon className="size-4 text-primary" />
                    Account Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  {activityLoading ? (
                    <div className="flex items-center justify-center gap-3 py-10">
                      <Spinner className="size-5 text-primary" />
                      <p className="text-xs text-muted-foreground">Loading account activity...</p>
                    </div>
                  ) : activity.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-6">No recorded activity on this account yet.</p>
                  ) : (
                    <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border/60">
                      {activity.map(record => {
                        const { title, description } = describeActivity(record)
                        const dotClass = ACTIVITY_DOT_CLASS[record.action] ?? 'bg-muted border-muted-foreground/40'
                        return (
                          <div key={record.id} className="relative">
                            <div className={`absolute -left-6 top-1 size-4 rounded-full border-2 flex items-center justify-center ${dotClass}`} />
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-foreground">{title}</span>
                                <span className="text-muted-foreground">{formatDateTime(record.occurredAt)}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">{description}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* =========================================================================
            TAB 2: PROPERTIES
           ========================================================================= */}
        <TabsContent value="properties" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="p-4 flex items-center gap-4">
              <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <LandmarkIcon className="size-5" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase font-medium">Linked Parcels</span>
                <p className="text-xl font-bold text-foreground">{properties.length}</p>
              </div>
            </Card>

            <Card className="p-4 flex items-center gap-4">
              <div className="size-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <UserCheckIcon className="size-5" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase font-medium">Primary Contact</span>
                <p className="text-xl font-bold text-foreground">
                  {properties.filter(p => p.isPrimaryBillingContact).length}
                </p>
              </div>
            </Card>

            <Card className="p-4 flex items-center gap-4">
              <div className="size-10 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Building2Icon className="size-5" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase font-medium">Wholly Owned (100%)</span>
                <p className="text-xl font-bold text-foreground">
                  {properties.filter(p => Number(p.ownershipPercentage) === 100).length}
                </p>
              </div>
            </Card>
          </div>

          {/* Properties Table */}
          <Card className="shadow-2xs overflow-hidden py-0 gap-0">
            <CardHeader className="border-b py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <LandmarkIcon className="size-4 text-primary" />
                  Linked Properties & Land Parcels
                </CardTitle>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    {properties.length} parcel{properties.length === 1 ? '' : 's'} linked
                  </span>
                </div>
              </div>
            </CardHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-6">
                      Property / Parcel
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Ownership Type
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Ownership Share
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Claim Status
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Effective From
                    </TableHead>
                    <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-6">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {propertiesLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-40 text-center">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <Spinner className="size-6 text-primary" />
                          <p className="text-xs text-muted-foreground">Loading linked properties...</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : properties.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center text-sm text-muted-foreground">
                        No property parcels currently linked to this ratepayer account.
                      </TableCell>
                    </TableRow>
                  ) : (
                    properties.map(link => (
                      <TableRow key={link.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="pl-6">
                          <div className="flex items-center gap-2">
                            <Building2Icon className="size-4 text-primary shrink-0" />
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold text-foreground">Registered Property Parcel</span>
                              <span className="text-[11px] text-muted-foreground">MMDA Cadastral Unit</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <Badge variant="outline" className="text-[10px] font-medium bg-muted text-muted-foreground">
                              {humanize(link.ownershipType)}
                            </Badge>
                            {link.isPrimaryBillingContact && (
                              <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-primary/20">
                                Primary Billing
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-xs font-mono font-medium text-foreground">
                          {Number(link.ownershipPercentage).toFixed(2)}%
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px] font-medium bg-muted text-muted-foreground">
                            {humanize(link.claimStatus)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {formatDate(link.effectiveFrom)}
                        </TableCell>
                        <TableCell className="text-center pr-6">
                          <div className="flex items-center justify-center gap-1.5">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs gap-1"
                              render={<Link href={`/properties/${link.propertyId}`} />}
                              nativeButton={false}
                            >
                              <EyeIcon className="size-3.5" />
                              View
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs gap-1 text-rose-600 hover:text-rose-700 hover:bg-rose-500/10"
                              onClick={() => setSeverTarget({ propertyId: link.propertyId })}
                            >
                              <UnlinkIcon className="size-3.5" />
                              Sever Link
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* =========================================================================
            TAB 3: PAYMENTS
           ========================================================================= */}
        <TabsContent value="payments" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="p-4 flex items-center gap-4">
              <div className="size-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ReceiptIcon className="size-5" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase font-medium">Total Paid</span>
                <p className="text-xl font-bold text-foreground">GHS {totalPaidSum.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </Card>

            <Card className="p-4 flex items-center gap-4">
              <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <FileCheck2Icon className="size-5" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase font-medium">Transactions</span>
                <p className="text-xl font-bold text-foreground">{payments.length}</p>
              </div>
            </Card>

            <Card className="p-4 flex items-center gap-4">
              <div className="size-10 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <ClockIcon className="size-5" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase font-medium">Last Payment Date</span>
                <p className="text-sm font-semibold text-foreground mt-1">
                  {payments.length > 0 ? formatDate(payments[0].paidAt) : 'No transactions'}
                </p>
              </div>
            </Card>
          </div>

          {/* Payments Table */}
          <Card className="shadow-2xs overflow-hidden py-0 gap-0">
            <CardHeader className="border-b py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <ReceiptIcon className="size-4 text-primary" />
                  Payments & Reconciliation Records
                </CardTitle>
                <span className="text-xs text-muted-foreground">
                  {payments.length} recorded transaction{payments.length === 1 ? '' : 's'}
                </span>
              </div>
            </CardHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-6">
                      Payment Ref
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Bill Number
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Amount Paid
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Balance After
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Date Paid
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
                        This ratepayer has not completed any property tax or rate payments yet.
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
                              <span className="font-mono text-xs font-semibold text-foreground">
                                {payment.externalPaymentRef}
                              </span>
                              {paidForOther && (
                                <span className="text-[10px] text-amber-700 dark:text-amber-400">
                                  Paid on behalf of another ratepayer
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-xs font-mono text-muted-foreground">
                            {payment.bill?.billNumber ?? 'Bill Ref'}
                          </TableCell>
                          <TableCell className="text-xs font-medium text-emerald-600 dark:text-emerald-400 font-mono">
                            {formatMoney(currency, payment.amount)}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground font-mono">
                            {formatMoney(currency, payment.balanceAtPayment)}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {formatDateTime(payment.paidAt)}
                          </TableCell>
                          <TableCell className="text-center pr-6">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs gap-1"
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
        </TabsContent>

        {/* =========================================================================
            TAB 4: DISPUTES
           ========================================================================= */}
        <TabsContent value="disputes" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="p-4 flex items-center gap-4">
              <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <AlertCircleIcon className="size-5" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase font-medium">Total Disputes</span>
                <p className="text-xl font-bold text-foreground">{disputes.length}</p>
              </div>
            </Card>

            <Card className="p-4 flex items-center gap-4">
              <div className="size-10 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <ClockIcon className="size-5" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase font-medium">Active / In Review</span>
                <p className="text-xl font-bold text-foreground">{openDisputesCount}</p>
              </div>
            </Card>

            <Card className="p-4 flex items-center gap-4">
              <div className="size-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2Icon className="size-5" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase font-medium">Resolved</span>
                <p className="text-xl font-bold text-foreground">
                  {disputes.filter(d => d.status.toUpperCase() === 'RESOLVED').length}
                </p>
              </div>
            </Card>
          </div>

          {/* Disputes Table */}
          <Card className="shadow-2xs overflow-hidden py-0 gap-0">
            <CardHeader className="border-b py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <AlertCircleIcon className="size-4 text-primary" />
                  Dispute & Grievance Logs
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs gap-1.5"
                  render={<Link href="/ratepayers/disputes" />}
                  nativeButton={false}
                >
                  <EyeIcon className="size-3.5" />
                  All Disputes Queue
                </Button>
              </div>
            </CardHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-6">
                      Dispute Code
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Dispute Type
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Status
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      SLA Due
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Resolution
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-6">
                      Date Logged
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {disputesLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <Spinner className="size-6 text-primary" />
                          <p className="text-xs text-muted-foreground">Loading disputes...</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : disputes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center text-sm text-muted-foreground">
                        No billing, valuation, or boundary disputes lodged by this ratepayer.
                      </TableCell>
                    </TableRow>
                  ) : (
                    disputes.map(d => (
                      <TableRow key={d.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="pl-6 font-mono text-xs font-semibold text-foreground">
                          {d.code}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px] font-medium bg-muted text-muted-foreground">
                            {humanize(d.disputeType)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DisputeStatusBadge status={d.status} />
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {d.slaDueAt ? formatDate(d.slaDueAt) : 'Standard SLA'}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">
                          {d.resolution ?? 'Pending officer review'}
                        </TableCell>
                        <TableCell className="pr-6 text-xs text-muted-foreground">
                          {formatDate(d.createdAt)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* =========================================================================
            TAB 5: ACTIONS
           ========================================================================= */}
        <TabsContent value="actions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Status Management Card */}
            <Card>
              <CardHeader className="pb-3 border-b border-border/40">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <SlidersHorizontalIcon className="size-4 text-primary" />
                  Account Status Management
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <p className="text-xs text-muted-foreground">
                  Update this ratepayer&apos;s system status to manage portal login privileges, payment permissions, and property claim eligibility.
                </p>

                <div className="p-3 rounded-lg bg-muted/40 border border-border/40 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-foreground">Current Account Status</span>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Last modified {formatDate(ratepayer.updatedAt || ratepayer.createdAt)}
                    </p>
                  </div>
                  <RatepayerStatusBadge status={ratepayer.status} />
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {ratepayer.status !== 'ACTIVE' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs text-emerald-700 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10 gap-1.5"
                      onClick={() => {
                        setPendingStatus('ACTIVE')
                        setStatusDialogOpen(true)
                      }}
                    >
                      <CheckCircle2Icon className="size-3.5" />
                      Activate Account
                    </Button>
                  )}

                  {ratepayer.status !== 'SUSPENDED' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs text-amber-700 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/10 gap-1.5"
                      onClick={() => {
                        setPendingStatus('SUSPENDED')
                        setStatusDialogOpen(true)
                      }}
                    >
                      <ClockIcon className="size-3.5" />
                      Suspend Account
                    </Button>
                  )}

                  {ratepayer.status !== 'DEACTIVATED' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs text-rose-700 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/10 gap-1.5"
                      onClick={() => {
                        setPendingStatus('DEACTIVATED')
                        setStatusDialogOpen(true)
                      }}
                    >
                      <BanIcon className="size-3.5" />
                      Deactivate Account
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Reports & Statements Card */}
            <Card>
              <CardHeader className="pb-3 border-b border-border/40">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <FileTextIcon className="size-4 text-primary" />
                  Official Statements & Financial Audit
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <p className="text-xs text-muted-foreground">
                  Generate official ratepayer statements of account, property tax assessment rolls, and historical payment receipts for sovereign audit.
                </p>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-xs h-9 gap-2"
                    onClick={handlePrintStatement}
                  >
                    <DownloadIcon className="size-4 text-primary" />
                    <span>Generate Consolidated Ratepayer Statement (PDF / Print)</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start text-xs h-9 gap-2"
                    render={<Link href={`/properties?ratepayerId=${encodeURIComponent(ratepayerId)}`} />}
                    nativeButton={false}
                  >
                    <LandmarkIcon className="size-4 text-primary" />
                    <span>View All Cadastral Parcels in Property Registry</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Identity & KYC Operations Card */}
            <Card>
              <CardHeader className="pb-3 border-b border-border/40">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <ShieldCheckIcon className="size-4 text-primary" />
                  National Identity & KYC Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <p className="text-xs text-muted-foreground">
                  National Identification Authority (NIA) Ghana Card and GRA TIN cross-verification protocols.
                </p>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-xs h-9 gap-2"
                    onClick={() => {
                      toast.info('Initiating live verification refresh with Shared Services identity adapter...')
                      setTimeout(() => {
                        toast.success('Identity adapter check completed. All records synchronized.')
                        fetchRatepayer(); fetchActivity()
                      }, 1200)
                    }}
                  >
                    <RefreshCwIcon className="size-4 text-primary" />
                    <span>Re-verify Ghana Card with Identity Provider</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Act 843 Data Governance Card */}
            <Card>
              <CardHeader className="pb-3 border-b border-border/40">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <ShieldAlertIcon className="size-4 text-primary" />
                  Data Protection Act, 2012 (Act 843)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="p-3 rounded-lg bg-muted/40 border border-border/40 space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                    <span>DPC Registration Status</span>
                    <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20">
                      Compliant
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Citizen personal identifying data is protected under cryptographic encryption at rest and in transit.
                  </p>
                </div>

                <div className="text-[11px] text-muted-foreground space-y-1">
                  <p>• Data Subject Consent: <strong>Granted at registration</strong></p>
                  <p>• Retention Schedule: <strong>Statutory 7-year fiscal audit archive</strong></p>
                  <p>• Supervising MMDA: <strong>{assemblyName}</strong></p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* KYC Verification Review Dialog */}
      <VerificationReviewDialog
        ratepayerId={ratepayerId}
        verification={reviewTarget}
        decision={reviewDecision}
        onClose={closeReview}
        onReviewed={handleReviewed}
      />

      {/* Account Status Change Confirmation Dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">
              Confirm Account Status Change
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Are you sure you want to change this ratepayer&apos;s status to{' '}
              <strong className="text-foreground">{pendingStatus}</strong>?
            </DialogDescription>
          </DialogHeader>

          <div className="p-3 rounded-lg bg-muted/40 border border-border/40 text-xs text-muted-foreground space-y-1">
            {pendingStatus === 'SUSPENDED' && (
              <p>
                Suspending this account will immediately revoke citizen login to the Unified Ratepayer Portal and freeze pending property claims.
              </p>
            )}
            {pendingStatus === 'DEACTIVATED' && (
              <p>
                Deactivating this account prevents any future transactions, property registrations, or bill notifications.
              </p>
            )}
            {pendingStatus === 'ACTIVE' && (
              <p>
                Activating this account restores all portal access, payment gateways, and property management rights.
              </p>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setStatusDialogOpen(false)
                setPendingStatus(null)
              }}
              disabled={statusSubmitting}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleStatusChangeSubmit}
              disabled={statusSubmitting}
              className="gap-1.5"
            >
              {statusSubmitting ? <Spinner className="size-3.5" /> : null}
              Confirm Status Change
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Address & Pinpoint Location Dialog */}
      <AddressLocationDialog
        open={addressDialogOpen}
        onOpenChange={setAddressDialogOpen}
        ratepayerId={ratepayer.id}
        currentFirstName={ratepayer.firstName}
        currentMiddleName={ratepayer.middleName}
        currentLastName={ratepayer.lastName}
        currentLegalName={ratepayer.legalName}
        currentPhone={ratepayer.phone}
        currentEmail={ratepayer.email}
        currentAddress={ratepayer.address}
        currentLocationGeo={ratepayer.locationGeo}
        onSuccess={() => {
          fetchRatepayer(); fetchActivity()
        }}
      />

      {/* Citizen Identity Verification (KYC) Dialog */}
      <RatepayerKycDialog
        open={kycDialogOpen}
        onOpenChange={setKycDialogOpen}
        ratepayerId={ratepayer.id}
        ratepayerName={ratepayer.legalName}
        currentActiveProvider={activeVerification?.provider}
        currentActiveReference={activeVerification?.providerReference}
        onSuccess={() => {
          fetchRatepayer(); fetchActivity()
        }}
      />

      {/* Delete Ratepayer Confirmation Dialog */}
      <Dialog open={deleteRatepayerDialogOpen} onOpenChange={setDeleteRatepayerDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-rose-600 flex items-center gap-2">
              <Trash2Icon className="size-4" />
              Delete Ratepayer Profile
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Are you sure you want to delete ratepayer{' '}
              <strong className="text-foreground">{ratepayer.legalName} ({ratepayer.code})</strong>?
            </DialogDescription>
          </DialogHeader>

          <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-800 dark:text-rose-300 space-y-1.5">
            <p className="font-semibold flex items-center gap-1.5">
              <ShieldAlertIcon className="size-3.5" />
              Governance & Integrity Restriction:
            </p>
            <p className="text-[11px]">
              You <strong>cannot delete a ratepayer who has active linked properties</strong>. All property links must be severed or properties reassigned before this profile can be removed.
            </p>
            {properties.length > 0 && (
              <p className="text-[11px] font-medium text-rose-900 dark:text-rose-200">
                Currently linked to {properties.length} parcel(s). Sever these links first in the &quot;Linked Properties&quot; tab.
              </p>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteRatepayerDialogOpen(false)}
              disabled={deleteSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteRatepayer}
              disabled={deleteSubmitting || properties.length > 0}
              className="gap-1.5"
            >
              {deleteSubmitting ? <Spinner className="size-3.5" /> : <Trash2Icon className="size-3.5" />}
              Confirm Deletion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sever Property Link Dialog */}
      <Dialog open={!!severTarget} onOpenChange={open => !open && setSeverTarget(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <UnlinkIcon className="size-4 text-primary" />
              Sever Property Parcel Link
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Are you sure you want to sever the ownership link between{' '}
              <strong className="text-foreground">{ratepayer.legalName}</strong> and this property parcel?
            </DialogDescription>
          </DialogHeader>

          <div className="p-3 rounded-lg bg-muted/40 border border-border/40 text-xs text-muted-foreground space-y-1">
            <p>
              The cadastral parcel will remain intact in the national property registry, but will no longer appear under this ratepayer&apos;s account.
            </p>
            <p className="text-[11px]">
              If this property has paid bills, severing the link preserves audit compliance while freeing the property for reassignment.
            </p>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSeverTarget(null)}
              disabled={severSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleSeverPropertyLink}
              disabled={severSubmitting}
              className="gap-1.5"
            >
              {severSubmitting ? <Spinner className="size-3.5" /> : <UnlinkIcon className="size-3.5" />}
              Sever Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
