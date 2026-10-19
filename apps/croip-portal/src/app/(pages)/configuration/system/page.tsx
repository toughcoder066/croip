'use client'

import { useEffect, useState, useMemo } from 'react'
import {
  SlidersIcon,
  ShieldCheckIcon,
  ClockIcon,
  DatabaseIcon,
  PlusIcon
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
  SystemDataTable,
  type SystemParamDbRecord
} from '@/views/configuration/system-data-table'

export default function SystemParametersPage() {
  const [params, setParams] = useState<SystemParamDbRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // New parameter dialog form
  const [formCode, setFormCode] = useState('')
  const [formName, setFormName] = useState('')
  const [formGroup, setFormGroup] = useState('Performance')
  const [formValue, setFormValue] = useState('')
  const [formUnit, setFormUnit] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchParameters = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/configuration?category=system')
      const data = await res.json()
      if (data.success && Array.isArray(data.data)) {
        setParams(data.data)
      } else {
        toast.error('Failed to load system parameters')
      }
    } catch {
      toast.error('Failed to connect to shared services')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchParameters()
  }, [])

  const stats = useMemo(() => {
    const total = params.length
    const performance = params.filter((p) => p.metadata?.group === 'Performance').length
    const compliance = params.filter((p) => p.metadata?.group === 'Compliance').length
    const statutory = params.filter((p) => p.metadata?.group === 'Statutory & Legal').length
    return { total, performance, compliance, statutory }
  }, [params])

  const handleCreateParam = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formCode || !formName || !formValue) {
      toast.error('Code, Name, and Value are required')
      return
    }

    try {
      setSubmitting(true)
      const parsedVal = isNaN(Number(formValue)) ? formValue : Number(formValue)

      const res = await fetch('/api/configuration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: 'system',
          code: formCode.toUpperCase().replace(/\s+/g, '_'),
          name: formName,
          metadata: {
            group: formGroup,
            value: parsedVal,
            unit: formUnit,
            description: formDesc
          }
        })
      })

      const result = await res.json()
      if (result.success) {
        toast.success(`Parameter "${formName}" registered successfully`)
        setIsDialogOpen(false)
        setFormCode('')
        setFormName('')
        setFormValue('')
        setFormUnit('')
        setFormDesc('')
        fetchParameters()
      } else {
        toast.error(result.error || 'Failed to register parameter')
      }
    } catch {
      toast.error('Error contacting configuration service')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteParam = async (id: string, name: string) => {
    try {
      const res = await fetch(`/api/configuration?id=${id}`, { method: 'DELETE' })
      const result = await res.json()
      if (result.success) {
        toast.success(`Parameter "${name}" removed`)
        setParams((prev) => prev.filter((item) => item.id !== id))
      } else {
        toast.error(result.error || 'Failed to delete parameter')
      }
    } catch {
      toast.error('Error deleting parameter')
    }
  }

  if (loading) {
    return <PageLoader />
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">System Parameters</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Operational latency targets, statutory valuation roll cycles, and audit retention policies across the 9 CROIP services.
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Button size="sm" className="text-xs" onClick={() => setIsDialogOpen(true)}>
              <PlusIcon className="size-3.5 mr-1.5" />
              Add Parameter
            </Button>
            <DialogContent className="sm:max-w-md">
              <form onSubmit={handleCreateParam}>
                <DialogHeader>
                  <DialogTitle className="text-base font-semibold">Add System Parameter</DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground">
                    Define a global runtime threshold, SLA latency goal, or statutory rule.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-3.5 py-4 text-xs">
                  <div className="grid gap-1.5">
                    <label className="text-xs font-medium text-foreground">Operational Group</label>
                    <select
                      value={formGroup}
                      onChange={(e) => setFormGroup(e.target.value)}
                      className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="Performance">Performance</option>
                      <option value="Statutory & Legal">Statutory & Legal</option>
                      <option value="Compliance">Compliance</option>
                      <option value="Event Processing">Event Processing</option>
                      <option value="Ingestion Gateway">Ingestion Gateway</option>
                      <option value="Security">Security</option>
                    </select>
                  </div>

                  <div className="grid gap-1.5">
                    <label className="text-xs font-medium text-foreground">Parameter Code</label>
                    <Input
                      placeholder="e.g. INGESTION_WINDOW_SEC"
                      value={formCode}
                      onChange={(e) => setFormCode(e.target.value.toUpperCase())}
                      className="font-mono text-xs uppercase"
                      required
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <label className="text-xs font-medium text-foreground">Official Parameter Name</label>
                    <Input
                      placeholder="e.g. Max Batch Ingestion Window"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="text-xs"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-1.5">
                      <label className="text-xs font-medium text-foreground">Value</label>
                      <Input
                        placeholder="e.g. 300"
                        value={formValue}
                        onChange={(e) => setFormValue(e.target.value)}
                        className="font-mono text-xs"
                        required
                      />
                    </div>

                    <div className="grid gap-1.5">
                      <label className="text-xs font-medium text-foreground">Unit</label>
                      <Input
                        placeholder="e.g. seconds, days, %"
                        value={formUnit}
                        onChange={(e) => setFormUnit(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid gap-1.5">
                    <label className="text-xs font-medium text-foreground">SLA Rule / Description</label>
                    <Input
                      placeholder="e.g. Max time delta between payment submission and settlement"
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      className="text-xs"
                    />
                  </div>
                </div>

                <DialogFooter className="gap-3 sm:gap-3">
                  <Button type="button" variant="outline" size="sm" onClick={() => setIsDialogOpen(false)} className="text-xs">
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" disabled={submitting} className="text-xs">
                    {submitting ? 'Saving...' : 'Add Parameter'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="p-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <SlidersIcon className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Rules</p>
              <p className="text-xl font-bold text-foreground">{stats.total} Defined</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-sky-500/10 text-sky-600 flex items-center justify-center shrink-0">
              <ClockIcon className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Performance Latency</p>
              <p className="text-xl font-bold text-foreground">{stats.performance} Targets</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheckIcon className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Compliance SLAs</p>
              <p className="text-xl font-bold text-foreground">{stats.compliance} Enforced</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
              <DatabaseIcon className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Statutory Mandates</p>
              <p className="text-xl font-bold text-foreground">{stats.statutory} Policies</p>
            </div>
          </div>
        </Card>
      </div>

      {/* System Parameters Data Table */}
      <SystemDataTable
        data={params}
        loading={loading}
        onDelete={handleDeleteParam}
        onRefresh={fetchParameters}
      />
    </div>
  )
}
