'use client'

import { useCallback, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import {
  ArrowLeftIcon,
  Building2Icon,
  MailIcon,
  CalendarIcon,
  LandmarkIcon,
  UsersIcon,
  KeyRoundIcon,
  PlusIcon,
  CheckCircle2Icon,
  PauseCircleIcon,
  XCircleIcon,
  InfoIcon,
  PhoneIcon,
  UserIcon,
  FileTextIcon,
  ReceiptIcon
} from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { PageLoader, Spinner } from '@/components/ui/spinner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

import { AssignAssemblyForm } from './assign-assembly-form'
import { RegisterPersonnelForm } from './register-personnel-form'
import { ProvisionApiClientDialog } from './provision-api-client-dialog'

interface ConcessionDetail {
  id: string
  code: string
  name: string
  businessRegistrationNumber: string
  tin: string
  contactName: string
  contactPhone: string
  contactEmail: string
  status: string
  createdAt: string
}

interface AssignedAssembly {
  id: string
  assemblyId: string
  contractStart: string
  contractEnd: string
  status: string
}

interface ApiClientRecord {
  id: string
  clientId: string
  status: string
  issuedVia: string
  expiresAt: string
  revokedAt: string | null
}

interface PersonnelRecord {
  id: string
  externalStaffRef: string
  fullName: string
  phone: string
  status: string
  createdAt?: string
}

function StatusBadge({ status }: { status: string }) {
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

interface ConcessionDetailViewProps {
  concessionId: string
}

export function ConcessionDetailView({ concessionId }: ConcessionDetailViewProps) {
  const router = useRouter()

  const [concession, setConcession] = useState<ConcessionDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const [personnel, setPersonnel] = useState<PersonnelRecord[]>([])
  const [loadingPersonnel, setLoadingPersonnel] = useState(true)
  const [personnelDialogOpen, setPersonnelDialogOpen] = useState(false)

  const [assignments, setAssignments] = useState<AssignedAssembly[]>([])
  const [loadingAssignments, setLoadingAssignments] = useState(true)
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)

  // concessionAssembly rows only carry assemblyId (platform-governance-service doesn't
  // hold MMDA names — shared-services does), so names are resolved here client-side the
  // same way AssignAssemblyForm already does for its picker.
  const [assemblyLookup, setAssemblyLookup] = useState<Record<string, { code: string; name: string }>>({})

  const [apiClients, setApiClients] = useState<ApiClientRecord[]>([])
  const [loadingApiClients, setLoadingApiClients] = useState(true)
  const [revoking, setRevoking] = useState(false)

  const [deactivating, setDeactivating] = useState(false)

  const fetchConcession = useCallback(() => {
    setLoading(true)
    fetch(`/api/concessions/${concessionId}`)
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          setConcession(res.data)
        } else {
          setNotFound(true)
        }
      })
      .catch(() => {
        toast.error('Failed to load concession from platform governance')
        setNotFound(true)
      })
      .finally(() => setLoading(false))
  }, [concessionId])

  const fetchPersonnel = useCallback(() => {
    setLoadingPersonnel(true)
    fetch(`/api/concessions/${concessionId}/personnel`)
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data)) {
          setPersonnel(res.data)
        } else {
          toast.error(res.error || 'Failed to load personnel')
        }
      })
      .catch(() => toast.error('Failed to load personnel'))
      .finally(() => setLoadingPersonnel(false))
  }, [concessionId])

  const fetchAssignments = useCallback(() => {
    setLoadingAssignments(true)
    fetch(`/api/concessions/${concessionId}/assemblies`)
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data)) {
          setAssignments(res.data)
        } else {
          toast.error(res.error || 'Failed to load assigned MMDAs')
        }
      })
      .catch(() => toast.error('Failed to load assigned MMDAs'))
      .finally(() => setLoadingAssignments(false))
  }, [concessionId])

  const fetchAssemblyLookup = useCallback(() => {
    fetch('/api/geo/assemblies')
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data)) {
          const lookup: Record<string, { code: string; name: string }> = {}

          for (const a of res.data) {
            lookup[a.id] = { code: a.code, name: a.name }
          }
          setAssemblyLookup(lookup)
        }
      })
      .catch(() => {})
  }, [])

  const fetchApiClients = useCallback(() => {
    setLoadingApiClients(true)
    fetch(`/api/concessions/${concessionId}/api-clients`)
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data)) {
          setApiClients(res.data)
        } else {
          toast.error(res.error || 'Failed to load API clients')
        }
      })
      .catch(() => toast.error('Failed to load API clients'))
      .finally(() => setLoadingApiClients(false))
  }, [concessionId])

  const handleRevoke = useCallback(() => {
    if (!confirm('Revoke the active API credential without issuing a replacement? The concessionaire will lose access until a new one is rotated.')) return

    setRevoking(true)
    fetch(`/api/concessions/${concessionId}/api-clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'revoke' })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          toast.success('API credential revoked')
          fetchApiClients()
        } else {
          toast.error(res.error || 'Failed to revoke API credential')
        }
      })
      .catch(() => toast.error('Failed to revoke API credential'))
      .finally(() => setRevoking(false))
  }, [concessionId, fetchApiClients])

  const handleDeactivate = useCallback(() => {
    if (!concession) return
    if (!confirm(`Offboard "${concession.name}"? Its status will be set to INACTIVE. History is kept, nothing is deleted.`)) return

    setDeactivating(true)
    fetch(`/api/concessions/${concessionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'deactivate' })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          toast.success(`"${concession.name}" offboarded`)
          setConcession(res.data)
        } else {
          toast.error(res.error || 'Failed to offboard concession')
        }
      })
      .catch(() => toast.error('Failed to offboard concession'))
      .finally(() => setDeactivating(false))
  }, [concession, concessionId])

  useEffect(() => {
    fetchConcession()
    fetchPersonnel()
    fetchAssignments()
    fetchAssemblyLookup()
    fetchApiClients()
  }, [fetchConcession, fetchPersonnel, fetchAssignments, fetchAssemblyLookup, fetchApiClients])

  if (loading) {
    return <PageLoader />
  }

  if (notFound || !concession) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
        <Building2Icon className="size-10 text-muted-foreground" />
        <p className="text-sm font-medium text-foreground">Concession not found</p>
        <p className="text-xs text-muted-foreground">It may have been removed, or the link is incorrect.</p>
        <Button size="sm" variant="outline" className="text-xs mt-2" onClick={() => router.push('/concessions')}>
          <ArrowLeftIcon className="size-3.5 mr-1.5" />
          Back to Registry
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/40">
        <div className="flex items-center gap-3">
          <Button size="icon" variant="ghost" className="size-8" onClick={() => router.push('/concessions')}>
            <ArrowLeftIcon className="size-4" />
          </Button>
          <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Building2Icon className="size-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">{concession.name}</h1>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">{concession.code} • {concession.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={concession.status} />
          {concession.status === 'ACTIVE' && (
            <Button size="sm" variant="outline" className="text-xs text-destructive hover:text-destructive" disabled={deactivating} onClick={handleDeactivate}>
              {deactivating ? <Spinner className="size-3 mr-1.5" /> : null}
              Offboard Concessionaire
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="overview" className="flex-1 justify-between gap-6">
        <div className="overflow-x-auto">
          <TabsList className="w-max min-w-full **:group-data-[orientation=horizontal]/tabs:after:h-0">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assemblies">Assigned MMDAs</TabsTrigger>
            <TabsTrigger value="personnel">Personnel</TabsTrigger>
            <TabsTrigger value="api-clients">API Clients</TabsTrigger>
          </TabsList>
        </div>

        {/* Overview */}
        <TabsContent value="overview">
          <Card className="shadow-2xs">
            <CardHeader>
              <CardTitle className="text-base">Concessionaire Overview</CardTitle>
              <CardDescription className="text-xs">Core onboarding details from Platform Governance (:3010).</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-2.5">
                <Building2Icon className="size-4 text-primary mt-0.5" />
                <div>
                  <p className="text-[11px] text-muted-foreground">Concession Code</p>
                  <p className="text-xs font-mono font-semibold text-foreground">{concession.code}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CalendarIcon className="size-4 text-primary mt-0.5" />
                <div>
                  <p className="text-[11px] text-muted-foreground">Onboarded</p>
                  <p className="text-xs font-semibold text-foreground">
                    {new Date(concession.createdAt).toLocaleDateString('en-GH', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <FileTextIcon className="size-4 text-primary mt-0.5" />
                <div>
                  <p className="text-[11px] text-muted-foreground">Business Registration No.</p>
                  <p className="text-xs font-semibold text-foreground">{concession.businessRegistrationNumber}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ReceiptIcon className="size-4 text-primary mt-0.5" />
                <div>
                  <p className="text-[11px] text-muted-foreground">TIN</p>
                  <p className="text-xs font-semibold text-foreground">{concession.tin}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <UserIcon className="size-4 text-primary mt-0.5" />
                <div>
                  <p className="text-[11px] text-muted-foreground">Primary Contact</p>
                  <p className="text-xs font-semibold text-foreground">{concession.contactName}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <PhoneIcon className="size-4 text-primary mt-0.5" />
                <div>
                  <p className="text-[11px] text-muted-foreground">Contact Phone</p>
                  <p className="text-xs font-semibold text-foreground">{concession.contactPhone}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MailIcon className="size-4 text-primary mt-0.5" />
                <div>
                  <p className="text-[11px] text-muted-foreground">Contact Email</p>
                  <p className="text-xs font-semibold text-foreground">{concession.contactEmail}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2Icon className="size-4 text-primary mt-0.5" />
                <div>
                  <p className="text-[11px] text-muted-foreground">Status</p>
                  <StatusBadge status={concession.status} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assigned MMDAs */}
        <TabsContent value="assemblies">
          <Card className="shadow-2xs overflow-hidden py-0 gap-0">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <CardTitle className="text-base">Assigned MMDAs</CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  Territorial rating concessions contracted to this concessionaire.
                </CardDescription>
              </div>
              <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
                <Button size="sm" className="text-xs" onClick={() => setAssignDialogOpen(true)}>
                  <PlusIcon className="size-3.5 mr-1.5" />
                  Assign Another MMDA
                </Button>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-base font-semibold">Assign MMDA to {concession.name}</DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground">
                      Contract this concessionaire to collect rates for an assembly territory.
                    </DialogDescription>
                  </DialogHeader>
                  <AssignAssemblyForm
                    concessionId={concessionId}
                    excludeAssemblyIds={assignments.filter(a => a.status === 'ACTIVE').map(a => a.assemblyId)}
                    onCancel={() => setAssignDialogOpen(false)}
                    onAssigned={() => {
                      fetchAssignments()
                      setAssignDialogOpen(false)
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-6">MMDA</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contract Start</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contract End</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-6">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingAssignments ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <Spinner className="size-6 text-primary" />
                          <p className="text-xs text-muted-foreground">Loading assigned MMDAs...</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : assignments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-32 text-center text-sm text-muted-foreground">
                        No MMDAs assigned to this concession yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    assignments.map(a => {
                      const assembly = assemblyLookup[a.assemblyId]

                      return (
                      <TableRow key={a.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="pl-6">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                            <LandmarkIcon className="size-3.5 text-primary" />
                            <span>{assembly ? `${assembly.code} — ${assembly.name}` : a.assemblyId}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {new Date(a.contractStart).toLocaleDateString('en-GH', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {new Date(a.contractEnd).toLocaleDateString('en-GH', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </TableCell>
                        <TableCell className="pr-6">
                          <StatusBadge status={a.status} />
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

        {/* Personnel */}
        <TabsContent value="personnel">
          <Card className="shadow-2xs overflow-hidden py-0 gap-0">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <CardTitle className="text-base">Field Personnel</CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  External staff registered for audit verification trails.
                </CardDescription>
              </div>
              <Dialog open={personnelDialogOpen} onOpenChange={setPersonnelDialogOpen}>
                <Button size="sm" className="text-xs" onClick={() => setPersonnelDialogOpen(true)}>
                  <PlusIcon className="size-3.5 mr-1.5" />
                  Register Agent
                </Button>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-base font-semibold">Register Field Personnel</DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground">
                      Add an external staff member to {concession.name}&apos;s verified agent roster.
                    </DialogDescription>
                  </DialogHeader>
                  <RegisterPersonnelForm
                    concessionId={concessionId}
                    onCancel={() => setPersonnelDialogOpen(false)}
                    onRegistered={() => {
                      fetchPersonnel()
                      setPersonnelDialogOpen(false)
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-6">Agent</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Staff Reference</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-6">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingPersonnel ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <Spinner className="size-6 text-primary" />
                          <p className="text-xs text-muted-foreground">Loading personnel...</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : personnel.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-32 text-center text-sm text-muted-foreground">
                        No field personnel registered for this concession yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    personnel.map(p => (
                      <TableRow key={p.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="pl-6">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                            <UsersIcon className="size-3.5 text-primary" />
                            {p.fullName}
                          </div>
                        </TableCell>
                        <TableCell className="text-xs font-mono text-muted-foreground">{p.externalStaffRef}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <PhoneIcon className="size-3 text-muted-foreground" />
                            {p.phone}
                          </span>
                        </TableCell>
                        <TableCell className="pr-6">
                          <StatusBadge status={p.status} />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* API Clients */}
        <TabsContent value="api-clients">
          <Card className="shadow-2xs overflow-hidden py-0 gap-0">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <CardTitle className="text-base">API Clients & Keys</CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  Machine-to-machine credentials for this concessionaire&apos;s backend integration.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {apiClients.some(c => c.status === 'ACTIVE') && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs text-destructive hover:text-destructive"
                    disabled={revoking}
                    onClick={handleRevoke}
                  >
                    {revoking ? <Spinner className="size-3 mr-1.5" /> : null}
                    Revoke
                  </Button>
                )}
                <ProvisionApiClientDialog
                  concessionId={concessionId}
                  hasActiveClient={apiClients.some(c => c.status === 'ACTIVE')}
                  onProvisioned={() => fetchApiClients()}
                />
              </div>
            </div>

            <div className="px-6 pt-4">
              <div className="flex items-start gap-2 rounded-md border border-blue-500/20 bg-blue-500/5 p-3 text-[11px] text-muted-foreground">
                <InfoIcon className="size-3.5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <span>
                  Client secrets are shown only once, at the moment of creation, and are never stored in retrievable form —
                  not even by this console. This list never shows a secret for an existing client.
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-6">Client ID</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Issued Via</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-6">Expires</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingApiClients ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <Spinner className="size-6 text-primary" />
                          <p className="text-xs text-muted-foreground">Loading API clients...</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : apiClients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-32 text-center text-sm text-muted-foreground">
                        No API clients issued for this concession yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    apiClients.map(c => (
                      <TableRow key={c.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="pl-6">
                          <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-foreground">
                            <KeyRoundIcon className="size-3.5 text-primary" />
                            {c.clientId}
                          </div>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={c.status} />
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {c.issuedVia === 'zitadel' ? 'Zitadel' : 'Stub (no Management API configured)'}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground pr-6">
                          {new Date(c.expiresAt).toLocaleDateString('en-GH', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
