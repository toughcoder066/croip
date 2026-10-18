'use client'

import { useEffect, useState, useMemo } from 'react'
import {
  MessageSquareIcon,
  MailIcon,
  PlusIcon,
  RadioIcon
} from 'lucide-react'
import { toast } from 'sonner'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  GatewaysDataTable,
  type GatewayDbRecord
} from '@/views/configuration/gateways-data-table'

export default function GatewaysConfigPage() {
  const [gateways, setGateways] = useState<GatewayDbRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Form State
  const [formCode, setFormCode] = useState('')
  const [formName, setFormName] = useState('')
  const [formType, setFormType] = useState<'SMS' | 'EMAIL'>('SMS')
  const [formProvider, setFormProvider] = useState('')
  const [formEndpoint, setFormEndpoint] = useState('')
  const [formSenderId, setFormSenderId] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchGateways = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/configuration?category=gateway')
      const data = await res.json()
      if (data.success && Array.isArray(data.data)) {
        setGateways(data.data)
      } else {
        toast.error('Failed to load gateways configuration')
      }
    } catch {
      toast.error('Failed to connect to shared services')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGateways()
  }, [])

  const stats = useMemo(() => {
    const total = gateways.length
    const sms = gateways.filter((g) => g.metadata?.type === 'SMS').length
    const email = gateways.filter((g) => g.metadata?.type === 'EMAIL').length
    return { total, sms, email }
  }, [gateways])

  const handleCreateGateway = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formCode || !formName) {
      toast.error('Code and Name are required')
      return
    }

    try {
      setSubmitting(true)
      const metadataPayload: Record<string, any> = {
        type: formType,
        status: 'ACTIVE',
        provider: formProvider || formName
      }

      if (formType === 'SMS') {
        metadataPayload.senderId = formSenderId || 'CROIP-REV'
        metadataPayload.endpoint = formEndpoint || 'https://api.sms-gateway.local/v1/send'
      } else {
        metadataPayload.host = formEndpoint || 'smtp.gov.gh'
        metadataPayload.port = 587
      }

      const res = await fetch('/api/configuration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: 'gateway',
          code: formCode.toUpperCase().replace(/\s+/g, '_'),
          name: formName,
          metadata: metadataPayload
        })
      })

      const result = await res.json()
      if (result.success) {
        toast.success(`Gateway "${formName}" registered successfully`)
        setIsDialogOpen(false)
        setFormCode('')
        setFormName('')
        setFormProvider('')
        setFormEndpoint('')
        setFormSenderId('')
        fetchGateways()
      } else {
        toast.error(result.error || 'Failed to register gateway')
      }
    } catch {
      toast.error('Error contacting configuration service')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteGateway = async (id: string, name: string) => {
    try {
      const res = await fetch(`/api/configuration?id=${id}`, { method: 'DELETE' })
      const result = await res.json()
      if (result.success) {
        toast.success(`Gateway "${name}" deleted`)
        setGateways((prev) => prev.filter((item) => item.id !== id))
      } else {
        toast.error(result.error || 'Failed to delete gateway')
      }
    } catch {
      toast.error('Error deleting gateway')
    }
  }

  if (loading) {
    return <PageLoader />
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Communication Gateways</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure national SMS dispatchers and Mailpit SMTP relays in Shared Services (:3004).
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Button size="sm" className="text-xs" onClick={() => setIsDialogOpen(true)}>
              <PlusIcon className="size-3.5 mr-1.5" />
              Add Gateway
            </Button>
            <DialogContent className="sm:max-w-md">
              <form onSubmit={handleCreateGateway}>
                <DialogHeader>
                  <DialogTitle className="text-base font-semibold">Register New Gateway</DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground">
                    Add a telecom SMS aggregator or SMTP relay server.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-3.5 py-4 text-xs">
                  <div className="grid gap-1.5">
                    <label className="text-xs font-medium text-foreground">Channel Type</label>
                    <div className="flex gap-2">
                      {(['SMS', 'EMAIL'] as const).map((t) => (
                        <Button
                          key={t}
                          type="button"
                          variant={formType === t ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setFormType(t)}
                          className="flex-1 text-xs"
                        >
                          {t}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-1.5">
                    <label className="text-xs font-medium text-foreground">Gateway Code</label>
                    <Input
                      placeholder="e.g. ARKESEL_SMS, HUBTEL_SMS"
                      value={formCode}
                      onChange={(e) => setFormCode(e.target.value.toUpperCase())}
                      className="font-mono text-xs uppercase"
                      required
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <label className="text-xs font-medium text-foreground">Official Name</label>
                    <Input
                      placeholder="e.g. Arkesel Telecom Relay"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="text-xs"
                      required
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <label className="text-xs font-medium text-foreground">Provider</label>
                    <Input
                      placeholder="e.g. Arkesel, Hubtel"
                      value={formProvider}
                      onChange={(e) => setFormProvider(e.target.value)}
                      className="text-xs"
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <label className="text-xs font-medium text-foreground">
                      {formType === 'EMAIL' ? 'SMTP Host' : 'API Endpoint URL'}
                    </label>
                    <Input
                      placeholder={formType === 'EMAIL' ? 'smtp.gov.gh' : 'https://api.sms-gateway.local/v1/send'}
                      value={formEndpoint}
                      onChange={(e) => setFormEndpoint(e.target.value)}
                      className="font-mono text-xs"
                    />
                  </div>

                  {formType === 'SMS' && (
                    <div className="grid gap-1.5">
                      <label className="text-xs font-medium text-foreground">Sender ID</label>
                      <Input
                        placeholder="CROIP-REV"
                        value={formSenderId}
                        onChange={(e) => setFormSenderId(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                  )}
                </div>

                <DialogFooter className="gap-3 sm:gap-3">
                  <Button type="button" variant="outline" size="sm" onClick={() => setIsDialogOpen(false)} className="text-xs">
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" disabled={submitting} className="text-xs">
                    {submitting ? 'Registering...' : 'Register Gateway'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <RadioIcon className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Relays</p>
              <p className="text-xl font-bold text-foreground">{stats.total} Configured</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <MessageSquareIcon className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">SMS Aggregators</p>
              <p className="text-xl font-bold text-foreground">{stats.sms} Active</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-sky-500/10 text-sky-600 flex items-center justify-center shrink-0">
              <MailIcon className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email Relays</p>
              <p className="text-xl font-bold text-foreground">{stats.email} Active</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Gateways Data Table */}
      <GatewaysDataTable
        data={gateways}
        loading={loading}
        onDelete={handleDeleteGateway}
        onRefresh={fetchGateways}
      />
    </div>
  )
}
