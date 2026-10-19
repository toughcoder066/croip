'use client'

import { useEffect, useState } from 'react'

import { Landmark } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface AssemblyOption {
  id: string
  code: string
  name: string
}

interface AssignAssemblyFormProps {
  concessionId: string

  /** Called after a successful assignment, with the assembly label that was assigned. */
  onAssigned?: (assemblyLabel: string) => void

  /** Render a cancel button (used inside dialogs). */
  onCancel?: () => void
  submitLabel?: string
}

export function AssignAssemblyForm({ concessionId, onAssigned, onCancel, submitLabel = 'Assign MMDA' }: AssignAssemblyFormProps) {
  const [assemblies, setAssemblies] = useState<AssemblyOption[]>([])
  const [loadingAssemblies, setLoadingAssemblies] = useState(true)

  const [assemblyId, setAssemblyId] = useState('')
  const [contractStart, setContractStart] = useState('')
  const [contractEnd, setContractEnd] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch('/api/geo/assemblies')
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data)) {
          setAssemblies(res.data.map((a: any) => ({ id: a.id, code: a.code, name: a.name })))
        } else {
          toast.error('Failed to load MMDAs from Shared Services')
        }
      })
      .catch(() => toast.error('Failed to load MMDAs from Shared Services'))
      .finally(() => setLoadingAssemblies(false))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!assemblyId || !contractStart || !contractEnd) {
      toast.error('Select an MMDA and both contract dates')

      return
    }

    if (new Date(contractEnd) <= new Date(contractStart)) {
      toast.error('Contract end date must be after the start date')

      return
    }

    setSubmitting(true)

    try {
      const res = await fetch(`/api/concessions/${concessionId}/assemblies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assemblyId, contractStart, contractEnd })
      })

      const data = await res.json()

      if (data.success) {
        const assembly = assemblies.find(a => a.id === assemblyId)
        const assemblyLabel = assembly ? `${assembly.code} — ${assembly.name}` : assemblyId

        toast.success(`${assemblyLabel} assigned to this concession`)
        setAssemblyId('')
        setContractStart('')
        setContractEnd('')
        onAssigned?.(assemblyLabel)
      } else {
        toast.error(data.error || 'Failed to assign MMDA')
      }
    } catch {
      toast.error('Network error assigning MMDA')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
      <div className="grid gap-1.5">
        <Label htmlFor="assign-assembly" className="text-xs font-medium">MMDA / Assembly</Label>
        <Select
          value={assemblyId}
          onValueChange={(val: string | null) => val && setAssemblyId(val)}
          disabled={loadingAssemblies}
        >
          <SelectTrigger id="assign-assembly" className="w-full text-xs">
            <SelectValue placeholder={loadingAssemblies ? 'Loading MMDAs...' : 'Select an MMDA'} />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            <SelectGroup>
              {assemblies.map(a => (
                <SelectItem key={a.id} value={a.id}>
                  <span className="flex items-center gap-1.5">
                    <Landmark className="size-3.5 text-primary" />
                    {a.code} — {a.name}
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {!loadingAssemblies && assemblies.length === 0 && (
          <p className="text-[11px] text-muted-foreground">
            No MMDAs configured yet. Add one under Configuration &rsaquo; Assemblies first.
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-1.5">
          <Label htmlFor="contract-start" className="text-xs font-medium">Contract Start</Label>
          <Input
            id="contract-start"
            type="date"
            value={contractStart}
            onChange={e => setContractStart(e.target.value)}
            className="text-xs"
            required
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="contract-end" className="text-xs font-medium">Contract End</Label>
          <Input
            id="contract-end"
            type="date"
            value={contractEnd}
            onChange={e => setContractEnd(e.target.value)}
            className="text-xs"
            required
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-1">
        {onCancel && (
          <Button type="button" variant="outline" size="sm" onClick={onCancel} className="text-xs" disabled={submitting}>
            Cancel
          </Button>
        )}
        <Button type="submit" size="sm" disabled={submitting || loadingAssemblies} className="text-xs">
          {submitting ? <Spinner className="size-3 mr-1.5" /> : null}
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
