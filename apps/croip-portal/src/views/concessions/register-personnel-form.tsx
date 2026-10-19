'use client'

import { useState } from 'react'

import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'

interface RegisterPersonnelFormProps {
  concessionId: string
  onRegistered?: () => void
  onCancel?: () => void
  submitLabel?: string
}

export function RegisterPersonnelForm({
  concessionId,
  onRegistered,
  onCancel,
  submitLabel = 'Register Personnel'
}: RegisterPersonnelFormProps) {
  const [externalStaffRef, setExternalStaffRef] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!externalStaffRef.trim() || !fullName.trim() || !phone.trim()) {
      toast.error('Staff reference, full name, and phone are required')

      return
    }

    setSubmitting(true)

    try {
      const res = await fetch(`/api/concessions/${concessionId}/personnel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          externalStaffRef: externalStaffRef.trim(),
          fullName: fullName.trim(),
          phone: phone.trim()
        })
      })

      const data = await res.json()

      if (data.success) {
        toast.success(`${fullName.trim()} registered as field personnel`)
        setExternalStaffRef('')
        setFullName('')
        setPhone('')
        onRegistered?.()
      } else {
        toast.error(data.error || 'Failed to register personnel')
      }
    } catch {
      toast.error('Network error registering personnel')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
      <div className="grid gap-1.5">
        <Label htmlFor="personnel-staff-ref" className="text-xs font-medium">External Staff Reference</Label>
        <Input
          id="personnel-staff-ref"
          placeholder="e.g. EMP-00123"
          value={externalStaffRef}
          onChange={e => setExternalStaffRef(e.target.value)}
          className="text-xs"
          required
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="personnel-full-name" className="text-xs font-medium">Full Name</Label>
        <Input
          id="personnel-full-name"
          placeholder="e.g. Kwame Asante"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          className="text-xs"
          required
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="personnel-phone" className="text-xs font-medium">Phone</Label>
        <Input
          id="personnel-phone"
          placeholder="e.g. +233244000000"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="text-xs"
          required
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-1">
        {onCancel && (
          <Button type="button" variant="outline" size="sm" onClick={onCancel} className="text-xs" disabled={submitting}>
            Cancel
          </Button>
        )}
        <Button type="submit" size="sm" disabled={submitting} className="text-xs">
          {submitting ? <Spinner className="size-3 mr-1.5" /> : null}
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
