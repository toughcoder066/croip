'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import {
  ArrowLeftIcon,
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon,
  MailIcon,
  PhoneIcon,
  ShieldIcon,
  SendIcon,
  UserIcon
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PageLoader, Spinner } from '@/components/ui/spinner'

interface UserRole {
  id: string
  code: string
  name: string
  scopeLevel?: string
}

interface UserProfile {
  id: string
  code: string
  fullName: string
  email: string
  phone?: string | null
  status: string
  zitadelId?: string
  countryId?: string | null
  createdAt?: string
  invitedAt?: string | null
  invitedViaStub?: boolean
  roles?: UserRole[]
}

const formatDateTime = (value?: string | null) =>
  value
    ? new Date(value).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : '—'

function StatusBadge({ status }: { status: string }) {
  const s = (status || 'ACTIVE').toUpperCase()
  if (s === 'ACTIVE') {
    return (
      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-medium">
        <CheckCircle2Icon className="size-2.5 mr-1" />
        Active
      </Badge>
    )
  }
  if (s === 'PENDING_ACTIVATION') {
    return (
      <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-[10px] font-medium">
        <ClockIcon className="size-2.5 mr-1" />
        Pending Activation
      </Badge>
    )
  }
  if (s === 'SUSPENDED' || s === 'LOCKED_OUT') {
    return (
      <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-[10px] font-medium">
        <ClockIcon className="size-2.5 mr-1" />
        {s === 'LOCKED_OUT' ? 'Locked Out' : 'Suspended'}
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

function OverviewField({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value ?? '—'}</span>
    </div>
  )
}

export function UserProfileView({ userId }: { userId: string }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [resending, setResending] = useState(false)

  const fetchUser = useCallback(() => {
    setLoading(true)
    return fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          setUser(res.data)
        } else {
          toast.error(res.error || 'Failed to load officer profile')
        }
      })
      .catch(err => {
        console.error('Failed to load officer profile:', err)
        toast.error('Failed to load officer profile')
      })
      .finally(() => setLoading(false))
  }, [userId])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const handleResendInvite = async () => {
    setResending(true)
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'resend-invite' })
      })
      const json = await res.json()
      if (json.success) {
        toast.success('Invite re-sent')
        setUser(json.data)
      } else {
        toast.error(json.error || 'Failed to resend invite')
      }
    } catch {
      toast.error('Network error resending invite')
    } finally {
      setResending(false)
    }
  }

  if (loading) {
    return <PageLoader />
  }

  if (!user) {
    return (
      <Card className="shadow-2xs">
        <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <p className="text-sm text-muted-foreground">Officer not found.</p>
          <Button variant="outline" size="sm" render={<Link href="/apps/users/list" />} nativeButton={false}>
            Back to Directory
          </Button>
        </CardContent>
      </Card>
    )
  }

  const isPending = (user.status || '').toUpperCase() === 'PENDING_ACTIVATION'
  const roles = user.roles ?? []

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 pb-2 border-b border-border/40 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 mt-0.5"
            render={<Link href="/apps/users/list" />}
            nativeButton={false}
            title="Back to directory"
          >
            <ArrowLeftIcon className="size-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{user.fullName}</h1>
            <p className="font-mono text-xs text-muted-foreground mt-0.5">{user.code}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={user.status} />
          {isPending && (
            <Button size="sm" variant="outline" className="text-xs gap-1.5" onClick={handleResendInvite} disabled={resending}>
              {resending ? <Spinner className="size-3" /> : <SendIcon className="size-3.5" />}
              Resend Invite
            </Button>
          )}
        </div>
      </div>

      <Card className="shadow-2xs">
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <UserIcon className="size-4 text-primary" />
            Officer Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <OverviewField label="Full Name" value={user.fullName} />
          <OverviewField label="Officer Code" value={<span className="font-mono">{user.code}</span>} />
          <OverviewField label="Status" value={<StatusBadge status={user.status} />} />
          <OverviewField label="Email" value={<span className="flex items-center gap-1.5"><MailIcon className="size-3.5 text-muted-foreground" />{user.email}</span>} />
          <OverviewField label="Phone" value={user.phone ? <span className="flex items-center gap-1.5"><PhoneIcon className="size-3.5 text-muted-foreground" />{user.phone}</span> : '—'} />
          <OverviewField label="Registered" value={formatDateTime(user.createdAt)} />
        </CardContent>
      </Card>

      <Card className="shadow-2xs">
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <ShieldIcon className="size-4 text-primary" />
            Zitadel Invite Status
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <OverviewField label="Last Invited" value={formatDateTime(user.invitedAt)} />
          <OverviewField
            label="Invite Delivery"
            value={
              user.invitedViaStub ? (
                <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-[10px] font-medium">
                  Stubbed (no Zitadel credentials configured)
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-medium">
                  Sent via Zitadel
                </Badge>
              )
            }
          />
          <OverviewField label="Zitadel ID" value={<span className="font-mono text-xs break-all">{user.zitadelId}</span>} />
        </CardContent>
      </Card>

      <Card className="shadow-2xs">
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <ShieldIcon className="size-4 text-primary" />
            Assigned Roles
          </CardTitle>
        </CardHeader>
        <CardContent>
          {roles.length === 0 ? (
            <p className="text-xs text-muted-foreground">No role assigned.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {roles.map(role => (
                <Badge key={role.id} variant="outline" className="text-[11px] font-medium">
                  {role.name}
                  {role.scopeLevel ? ` · ${role.scopeLevel}` : ''}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
