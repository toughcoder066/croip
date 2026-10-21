'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  ArrowLeftIcon,
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon,
  FileTextIcon,
  LayersIcon,
  MapPinIcon,
  Building2Icon,
  UserIcon,
  BanknoteIcon,
  ShieldCheckIcon,
  ShieldAlertIcon,
  Trash2Icon,
  ChevronDownIcon
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PageLoader, Spinner } from '@/components/ui/spinner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
} from '@/views/properties/verification-review-dialog'

const PropertyPolygonMap = dynamic(() => import('@/views/properties/property-polygon-map'), {
  ssr: false,
  loading: () => (
    <div className='flex h-[360px] w-full items-center justify-center bg-muted/20 rounded-lg border'>
      <div className='flex flex-col items-center gap-2 text-muted-foreground'>
        <Spinner className='size-6 text-primary' />
        <span className='text-xs'>Loading cadastral map...</span>
      </div>
    </div>
  )
})

interface PropertyDetail {
  id: string
  code: string
  version?: number
  ghanaPostGps?: string | null
  createdBy?: string | null
  verifiedBy?: string | null
  verifiedAt?: string | null
  accountNumber?: string | null
  propertyName?: string | null
  assemblyId: string
  propertyClass: string
  buildingStatus: string
  propertyStatus: string
  propertyUse: string
  tenureType: string
  structureType: string
  registrationSource: string
  registeredByConcessionId?: string | null
  createdByRatepayerId?: string | null
  claimedByRatepayerId?: string | null
  verificationStatus: string
  polygonGeoJson?: Record<string, unknown>
  leaseDurationYears?: number | null
  landAreaSqm?: number | null
  numberOfFloors?: number
  createdAt: string
  updatedAt?: string
  units?: Array<{ id: string; unitIdentifier: string; unitType: string; floorLevel: number; createdAt: string }>
  documents?: Array<{
    id: string
    documentType: string
    documentNumber?: string | null
    issuingAuthority?: string | null
    issueDate?: string | null
    mediaUrl: string
    verificationStatus: string
    uploadedByActorType: string
    isCapturedOnPremises: boolean
    createdAt: string
  }>
  valuations?: Array<{
    id: string
    valuationListId: string
    lvdReference: string
    rateableValue: number | string
    isCurrent: boolean
    effectiveDate: string
    createdAt: string
  }>
}

interface VerificationRecord {
  id: string
  propertyId: string
  verifiedByPersonnelId: string
  isWithinPolygon: boolean
  outcome: string
  notes?: string | null
  reviewStatus: string
  reviewedByPersonnelId?: string | null
  reviewedAt?: string | null
  reviewNotes?: string | null
  capturedAt: string
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
  value ? new Date(value).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'

const currencyFormatter = new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS', minimumFractionDigits: 2 })

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

function ReviewStatusBadge({ status }: { status: string }) {
  const s = (status || 'PENDING').toUpperCase()
  if (s === 'APPROVED') {
    return (
      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-medium">
        <CheckCircle2Icon className="size-2.5 mr-1" />
        Approved
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

export function PropertyDetailView({ propertyId }: { propertyId: string }) {
  const [property, setProperty] = useState<PropertyDetail | null>(null)
  const [verifications, setVerifications] = useState<VerificationRecord[]>([])
  const [assemblies, setAssemblies] = useState<Array<{ id: string; code: string; name: string }>>([])
  const [loading, setLoading] = useState(true)
  const [verificationsLoading, setVerificationsLoading] = useState(true)
  const [reviewerId, setReviewerId] = useState('')
  const [reviewTarget, setReviewTarget] = useState<PendingVerification | null>(null)
  const [reviewDecision, setReviewDecision] = useState<'APPROVED' | 'REJECTED' | null>(null)

  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteSubmitting, setDeleteSubmitting] = useState(false)

  const fetchProperty = useCallback(() => {
    setLoading(true)
    return fetch(`/api/properties/${propertyId}`)
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          setProperty(res.data)
        } else {
          toast.error(res.error || 'Failed to load property')
        }
      })
      .catch(err => {
        console.error('Failed to load property:', err)
        toast.error('Failed to load property')
      })
      .finally(() => setLoading(false))
  }, [propertyId])

  const fetchVerifications = useCallback(() => {
    setVerificationsLoading(true)
    return fetch(`/api/properties/${propertyId}/verifications`)
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data)) {
          setVerifications(res.data)
        } else {
          toast.error(res.error || 'Failed to load verifications')
        }
      })
      .catch(err => {
        console.error('Failed to load verifications:', err)
        toast.error('Failed to load verifications')
      })
      .finally(() => setVerificationsLoading(false))
  }, [propertyId])

  useEffect(() => {
    fetchProperty()
    fetchVerifications()

    fetch('/api/geo/assemblies')
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data)) {
          setAssemblies(res.data)
        }
      })
      .catch(() => {})

    // Reviewer identity: in this admin portal context the reviewing "personnel" is the
    // logged-in oversight officer. property-registry-service stores reviewedByPersonnelId
    // as an opaque reference string, so the active session user's id is used here.
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(res => {
        if (res?.user?.id) setReviewerId(res.user.id)
      })
      .catch(() => {})
  }, [fetchProperty, fetchVerifications])

  const openReview = (verification: VerificationRecord, decision: 'APPROVED' | 'REJECTED') => {
    setReviewTarget({
      id: verification.id,
      outcome: verification.outcome,
      verifiedByPersonnelId: verification.verifiedByPersonnelId,
      capturedAt: verification.capturedAt
    })
    setReviewDecision(decision)
  }

  const closeReview = () => {
    setReviewTarget(null)
    setReviewDecision(null)
  }

  const handleReviewed = () => {
    closeReview()
    fetchVerifications()
    fetchProperty()
  }

  const handleDeleteProperty = async () => {
    setDeleteSubmitting(true)
    try {
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      if (data.success) {
        toast.success(data.data?.message || 'Property deleted successfully')
        setDeleteDialogOpen(false)
        router.push('/properties')
      } else {
        toast.error(data.error || 'Failed to delete property')
      }
    } catch (err) {
      console.error('Failed to delete property:', err)
      toast.error('An unexpected error occurred while deleting property')
    } finally {
      setDeleteSubmitting(false)
    }
  }

  if (loading) {
    return <PageLoader />
  }

  if (!property) {
    return (
      <Card className="shadow-2xs">
        <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <p className="text-sm text-muted-foreground">Property not found.</p>
          <Button variant="outline" size="sm" render={<Link href="/properties" />} nativeButton={false}>
            Back to Registry
          </Button>
        </CardContent>
      </Card>
    )
  }

  const pendingCount = verifications.filter(v => (v.reviewStatus || 'PENDING').toUpperCase() === 'PENDING').length
  const assembly = assemblies.find(a => a.id === property.assemblyId)

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 pb-2 border-b border-border/40 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 mt-0.5"
            render={<Link href="/properties" />}
            nativeButton={false}
            title="Back to registry"
          >
            <ArrowLeftIcon className="size-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {property.propertyName || 'Unnamed Property'}
              </h1>
              <Badge variant="outline" className="font-mono text-xs font-semibold px-2 py-0.5 border-primary/30 text-primary bg-primary/5">
                v{property.version ?? 1}
              </Badge>
            </div>
            <p className="font-mono text-xs text-muted-foreground mt-0.5">
              {property.code}
              {property.accountNumber ? ` • A/C ${property.accountNumber}` : ''}
              {property.ghanaPostGps ? ` • GPS: ${property.ghanaPostGps}` : ''}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <VerificationStatusBadge status={property.verificationStatus} />
          {pendingCount > 0 && (
            <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-[10px] font-medium">
              {pendingCount} verification{pendingCount > 1 ? 's' : ''} awaiting review
            </Badge>
          )}
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-500/10 border-rose-500/30"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2Icon className="size-3.5" />
            Delete Property
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="flex-1 justify-between gap-6">
        <div className="overflow-x-auto">
          <TabsList className="w-max min-w-full **:group-data-[orientation=horizontal]/tabs:after:h-0">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="units">Units</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="valuations">Valuations</TabsTrigger>
            <TabsTrigger value="verifications">
              Verifications & Review
              {pendingCount > 0 && (
                <Badge variant="outline" className="ml-1.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-[9px] px-1.5">
                  {pendingCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Overview */}
        <TabsContent value="overview">
          <Card className="shadow-2xs">
            <CardHeader>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Building2Icon className="size-4 text-primary" />
                Property Particulars
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <OverviewField label="Property Code" value={<span className="font-mono">{property.code}</span>} />
              <OverviewField
                label="Property Version"
                value={
                  <Badge variant="outline" className="font-mono text-xs font-semibold px-2 py-0.5">
                    v{property.version ?? 1}
                  </Badge>
                }
              />
              <OverviewField
                label="Ghana Post GPS"
                value={
                  property.ghanaPostGps ? (
                    <span className="font-mono font-medium text-xs text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                      {property.ghanaPostGps}
                    </span>
                  ) : (
                    '—'
                  )
                }
              />
              <OverviewField label="Account Number" value={property.accountNumber} />
              <OverviewField label="Property Class" value={humanize(property.propertyClass)} />
              <OverviewField label="Property Use" value={humanize(property.propertyUse)} />
              <OverviewField label="Building Status" value={humanize(property.buildingStatus)} />
              <OverviewField label="Property Status" value={humanize(property.propertyStatus)} />
              <OverviewField label="Tenure Type" value={humanize(property.tenureType)} />
              <OverviewField label="Structure Type" value={humanize(property.structureType)} />
              <OverviewField label="Number of Floors" value={property.numberOfFloors ?? '—'} />
              <OverviewField label="Land Area (sqm)" value={property.landAreaSqm ? `${property.landAreaSqm} m²` : '—'} />
              <OverviewField label="Lease Duration" value={property.leaseDurationYears ? `${property.leaseDurationYears} years` : '—'} />
              <OverviewField
                label="Registration Source"
                value={
                  <Badge variant="outline" className="text-[10px] font-medium bg-muted text-muted-foreground">
                    {humanize(property.registrationSource)}
                  </Badge>
                }
              />
              <OverviewField
                label="Assigned MMDA"
                value={
                  assembly ? (
                    <div className="flex flex-col">
                      <span className="font-semibold text-xs text-foreground">{assembly.name}</span>
                      <span className="font-mono text-[11px] text-muted-foreground">{assembly.code}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">Local Assembly</span>
                  )
                }
              />
              <OverviewField
                label="Created By"
                value={property.createdBy || (property.createdByRatepayerId ? `Ratepayer (${property.createdByRatepayerId.slice(0, 8)})` : '—')}
              />
              <OverviewField
                label="Verified By"
                value={property.verifiedBy || '—'}
              />
              <OverviewField
                label="Verified At"
                value={property.verifiedAt ? formatDateTime(property.verifiedAt) : '—'}
              />
              <OverviewField label="Created At" value={formatDateTime(property.createdAt)} />
              <OverviewField label="Last Updated" value={formatDateTime(property.updatedAt)} />
            </CardContent>
          </Card>

          {/* Interactive Cadastral Boundary Map */}
          <Card className="shadow-2xs mt-5 overflow-hidden">
            <CardHeader className="border-b py-3 px-4 bg-muted/20">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <MapPinIcon className="size-4 text-primary" />
                  Cadastral Boundary Map
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-xs font-medium">
                    <CheckCircle2Icon className="size-3 mr-1" />
                    GIS Boundary
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <PropertyPolygonMap
                polygonGeoJson={property.polygonGeoJson}
                propertyName={property.propertyName}
                propertyCode={property.code}
                assemblyName={assembly ? `${assembly.name} (${assembly.code})` : undefined}
                verificationStatus={property.verificationStatus}
              />
            </CardContent>
          </Card>

          <Card className="shadow-2xs mt-4 py-0 gap-0 overflow-hidden">
            <Collapsible className="group/polygon">
              <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 p-4 text-left">
                <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <LayersIcon className="size-4 text-primary" />
                  Raw Boundary Coordinates (GeoJSON)
                </span>
                <ChevronDownIcon className="size-4 text-muted-foreground transition-transform duration-200 group-data-open/polygon:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="h-(--collapsible-panel-height) overflow-hidden transition-all duration-200 data-ending-style:h-0 data-starting-style:h-0">
                <div className="border-t p-4">
                  <pre className="max-h-64 overflow-auto rounded-md bg-muted/40 p-3 text-[11px] text-muted-foreground">
                    {JSON.stringify(property.polygonGeoJson ?? {}, null, 2)}
                  </pre>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </TabsContent>

        {/* Units */}
        <TabsContent value="units">
          <Card className="shadow-2xs overflow-hidden py-0 gap-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-6">
                      Unit Identifier
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Unit Type
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Floor Level
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-6">
                      Declared
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!property.units || property.units.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-32 text-center text-sm text-muted-foreground">
                        No sectional units declared for this property.
                      </TableCell>
                    </TableRow>
                  ) : (
                    property.units.map(unit => (
                      <TableRow key={unit.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="pl-6 font-mono text-xs">{unit.unitIdentifier}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px] font-medium bg-muted text-muted-foreground">
                            <LayersIcon className="size-2.5 mr-1" />
                            {humanize(unit.unitType)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{unit.floorLevel}</TableCell>
                        <TableCell className="pr-6 text-xs text-muted-foreground">{formatDate(unit.createdAt)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Documents */}
        <TabsContent value="documents">
          <Card className="shadow-2xs overflow-hidden py-0 gap-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-6">
                      Document Type
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Issuing Authority
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Uploaded By
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Verification
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-6">
                      Uploaded
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!property.documents || property.documents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center text-sm text-muted-foreground">
                        No ownership or verification documents attached to this property.
                      </TableCell>
                    </TableRow>
                  ) : (
                    property.documents.map(doc => (
                      <TableRow key={doc.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="pl-6">
                          <div className="flex flex-col">
                            <span className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                              <FileTextIcon className="size-3.5 text-primary" />
                              {humanize(doc.documentType)}
                            </span>
                            {doc.documentNumber && (
                              <span className="font-mono text-[11px] text-muted-foreground">{doc.documentNumber}</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{doc.issuingAuthority || '—'}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px] font-medium bg-muted text-muted-foreground">
                            {doc.isCapturedOnPremises ? 'On-Premises Capture' : humanize(doc.uploadedByActorType)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <VerificationStatusBadge status={doc.verificationStatus} />
                        </TableCell>
                        <TableCell className="pr-6 text-xs text-muted-foreground">{formatDate(doc.createdAt)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Valuations */}
        <TabsContent value="valuations">
          <Card className="shadow-2xs overflow-hidden py-0 gap-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-6">
                      LVD Reference
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Rateable Value
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Effective Date
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-6">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!property.valuations || property.valuations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-32 text-center text-sm text-muted-foreground">
                        No current valuation on record for this property.
                      </TableCell>
                    </TableRow>
                  ) : (
                    property.valuations.map(v => (
                      <TableRow key={v.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="pl-6 font-mono text-xs">{v.lvdReference}</TableCell>
                        <TableCell className="text-xs font-semibold text-foreground">
                          <span className="flex items-center gap-1.5">
                            <BanknoteIcon className="size-3.5 text-primary" />
                            {currencyFormatter.format(Number(v.rateableValue || 0))}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{formatDate(v.effectiveDate)}</TableCell>
                        <TableCell className="pr-6">
                          {v.isCurrent ? (
                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-medium">
                              Current
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-muted text-muted-foreground text-[10px] font-medium">
                              Superseded
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Verifications & Review */}
        <TabsContent value="verifications">
          <Card className="shadow-2xs overflow-hidden py-0 gap-0">
            <CardHeader className="border-b py-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <ShieldCheckIcon className="size-4 text-primary" />
                Field Verification Submissions
              </CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-6">
                      Outcome
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Surveyor (Personnel ID)
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Captured
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Review Status
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Reviewer Notes
                    </TableHead>
                    <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-6">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {verificationsLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-40 text-center">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <Spinner className="size-6 text-primary" />
                          <p className="text-xs text-muted-foreground">Loading verifications...</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : verifications.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center text-sm text-muted-foreground">
                        No field verifications have been submitted for this property yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    verifications.map(v => {
                      const isPending = (v.reviewStatus || 'PENDING').toUpperCase() === 'PENDING'
                      return (
                        <TableRow key={v.id} className="hover:bg-muted/30 transition-colors">
                          <TableCell className="pl-6">
                            <div className="flex flex-col gap-1">
                              <Badge variant="outline" className="text-[10px] font-medium bg-muted text-muted-foreground w-fit">
                                {humanize(v.outcome)}
                              </Badge>
                              {!v.isWithinPolygon && (
                                <span className="text-[10px] text-rose-600 dark:text-rose-400">Outside registered polygon</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                              <UserIcon className="size-3 text-primary" />
                              Field Officer
                            </span>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">{formatDateTime(v.capturedAt)}</TableCell>
                          <TableCell>
                            <ReviewStatusBadge status={v.reviewStatus} />
                          </TableCell>
                          <TableCell className="max-w-[220px] text-xs text-muted-foreground truncate" title={v.reviewNotes || v.notes || ''}>
                            {v.reviewNotes || v.notes || '—'}
                          </TableCell>
                          <TableCell className="text-center pr-6">
                            {isPending ? (
                              <div className="flex items-center justify-center gap-1.5">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 text-[11px] text-emerald-700 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
                                  onClick={() => openReview(v, 'APPROVED')}
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
                              <span className="text-[11px] text-muted-foreground">
                                {formatDate(v.reviewedAt)}
                              </span>
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
        </TabsContent>
      </Tabs>

      <VerificationReviewDialog
        verification={reviewTarget}
        decision={reviewDecision}
        reviewerId={reviewerId}
        onClose={closeReview}
        onReviewed={handleReviewed}
      />

      {/* Delete Property Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-rose-600 flex items-center gap-2">
              <Trash2Icon className="size-4" />
              Delete Property Parcel
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Are you sure you want to delete cadastral parcel{' '}
              <strong className="text-foreground">{property.propertyName || property.code} ({property.code})</strong>?
            </DialogDescription>
          </DialogHeader>

          <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-800 dark:text-rose-300 space-y-1.5">
            <p className="font-semibold flex items-center gap-1.5">
              <ShieldAlertIcon className="size-3.5" />
              Statutory Protection Rule:
            </p>
            <p className="text-[11px]">
              If any citizen has <strong>paid bills on this property</strong>, the parcel <strong>cannot be deleted</strong> to maintain financial audit integrity. In that scenario, only severing the ratepayer link is permitted.
            </p>
            <p className="text-[11px]">
              If no bills have been paid, deleting this property will remove its units, valuations, documents, and <strong>sever all ratepayer links automatically</strong>.
            </p>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleteSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteProperty}
              disabled={deleteSubmitting}
              className="gap-1.5"
            >
              {deleteSubmitting ? <Spinner className="size-3.5" /> : <Trash2Icon className="size-3.5" />}
              Confirm Deletion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
