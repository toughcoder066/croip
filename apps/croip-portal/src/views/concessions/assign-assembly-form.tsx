'use client'

import { useEffect, useState } from 'react'

import { Landmark } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { DatePicker } from '@/components/ui/date-picker'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from '@/components/ui/combobox'

interface AssemblyOption {
  id: string
  code: string
  name: string
}

export interface PendingAssignment {
  assemblyId: string
  assemblyLabel: string

  /** Display only — today's date at the moment it was added to the pending list. The
   * server always stamps the real contractStart itself at creation time; this never gets
   * sent back to it (see onboard-concession-view.tsx's final submit). */
  contractStart: string
  contractEnd: string
}

interface AssignAssemblyFormProps {

  /** Required in the default 'remote' mode — ignored in 'local' mode, since there's no
   * concession to assign against yet (the onboarding wizard builds up a pending list
   * before the concession itself exists). */
  concessionId?: string

  /** 'remote' (default) POSTs the assignment immediately. 'local' hands the picked
   * assignment to `onAdd` instead — nothing is sent over the network here. */
  mode?: 'remote' | 'local'

  /** Remote mode: called after a successful server-side assignment, with the assembly label. */
  onAssigned?: (assemblyLabel: string) => void

  /** Local mode: called with the picked MMDA + contract dates instead of submitting. */
  onAdd?: (assignment: PendingAssignment) => void

  /** MMDA ids to leave out of the picker entirely — the ones already added to this same
   * pending list (local mode) or already actively assigned to this concession (remote
   * mode), so the list of choices shrinks as they're picked instead of offering the same
   * one twice. */
  excludeAssemblyIds?: string[]

  /** Render a cancel button (used inside dialogs). */
  onCancel?: () => void
  submitLabel?: string
}

export function AssignAssemblyForm({
  concessionId,
  mode = 'remote',
  onAssigned,
  onAdd,
  excludeAssemblyIds,
  onCancel,
  submitLabel = mode === 'local' ? 'Add MMDA' : 'Assign MMDA'
}: AssignAssemblyFormProps) {
  const [assemblies, setAssemblies] = useState<AssemblyOption[]>([])
  const [loadingAssemblies, setLoadingAssemblies] = useState(true)

  const [selectedAssembly, setSelectedAssembly] = useState<AssemblyOption | null>(null)
  const [contractEnd, setContractEnd] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const availableAssemblies = excludeAssemblyIds?.length
    ? assemblies.filter(a => !excludeAssemblyIds.includes(a.id))
    : assemblies

  // The contract always starts today (stamped server-side), so the end date has to be
  // strictly after today — disable today and everything earlier in the calendar itself
  // rather than letting it be picked and rejected on submit.
  const earliestContractEnd = new Date()

  earliestContractEnd.setHours(0, 0, 0, 0)
  earliestContractEnd.setDate(earliestContractEnd.getDate() + 1)

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

    if (!selectedAssembly || !contractEnd) {
      toast.error('Select an MMDA and a contract end date')

      return
    }

    const today = new Date()

    today.setHours(0, 0, 0, 0)

    if (new Date(contractEnd) <= today) {
      toast.error('Contract end date must be in the future — the contract starts today')

      return
    }

    const assemblyLabel = `${selectedAssembly.code} — ${selectedAssembly.name}`

    if (mode === 'local') {
      onAdd?.({ assemblyId: selectedAssembly.id, assemblyLabel, contractStart: today.toISOString().slice(0, 10), contractEnd })
      setSelectedAssembly(null)
      setContractEnd('')

      return
    }

    setSubmitting(true)

    try {
      const res = await fetch(`/api/concessions/${concessionId}/assemblies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assemblyId: selectedAssembly.id, contractEnd })
      })

      const data = await res.json()

      if (data.success) {
        toast.success(`${assemblyLabel} assigned to this concession`)
        setSelectedAssembly(null)
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
        {/* Searchable, not a plain dropdown — there can be dozens of MMDAs nationally, and
            `excludeAssemblyIds` keeps whatever's already picked out of the list entirely
            (rather than just disabling it), so the list visibly shrinks as assignments
            are added instead of offering the same MMDA a second time. */}
        <Combobox
          items={availableAssemblies}
          value={selectedAssembly}
          onValueChange={(val: AssemblyOption | null) => setSelectedAssembly(val)}
          itemToStringLabel={(a: AssemblyOption) => `${a.code} — ${a.name}`}
          disabled={loadingAssemblies}
        >
          <ComboboxInput
            id="assign-assembly"
            placeholder={loadingAssemblies ? 'Loading MMDAs...' : 'Search by code or name...'}
            className="text-xs"
          />
          <ComboboxContent>
            <ComboboxEmpty>No matching MMDAs.</ComboboxEmpty>
            <ComboboxList>
              {(a: AssemblyOption) => (
                <ComboboxItem key={a.id} value={a}>
                  <Landmark className="size-3.5 text-primary" />
                  {a.code} — {a.name}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        {!loadingAssemblies && availableAssemblies.length === 0 && (
          <p className="text-[11px] text-muted-foreground">
            {assemblies.length === 0
              ? 'No MMDAs configured yet. Add one under Configuration › Assemblies first.'
              : 'Every MMDA is already assigned.'}
          </p>
        )}
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="contract-end" className="text-xs font-medium">Contract End</Label>
        {/* No Contract Start field — the contract always starts the moment the assignment
            is made (stamped server-side; see service.ts's assignAssembly), never a date
            someone picks. */}
        <DatePicker
          id="contract-end"
          value={contractEnd}
          onChange={setContractEnd}
          minDate={earliestContractEnd}
          placeholder="Select end date"
        />
        <p className="text-[11px] text-muted-foreground">Contract starts today.</p>
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
