'use client'

import { useState } from 'react'

import { Building2Icon, CheckIcon, LandmarkIcon, KeyRoundIcon, ArrowRightIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

import { AssignAssemblyForm } from './assign-assembly-form'
import { ProvisionApiClientDialog } from './provision-api-client-dialog'

type WizardStep = 1 | 2 | 3

interface CreatedConcession {
  id: string
  code: string
  name: string
  contactEmail: string
  status: string
  createdAt: string
}

interface CreateConcessionWizardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete?: () => void
}

const STEPS: { step: WizardStep; label: string; icon: typeof Building2Icon }[] = [
  { step: 1, label: 'Concessionaire', icon: Building2Icon },
  { step: 2, label: 'Assign MMDA', icon: LandmarkIcon },
  { step: 3, label: 'API Client', icon: KeyRoundIcon }
]

export function CreateConcessionWizard({ open, onOpenChange, onComplete }: CreateConcessionWizardProps) {
  const [step, setStep] = useState<WizardStep>(1)
  const [created, setCreated] = useState<CreatedConcession | null>(null)

  // Step 1 form state
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [submittingStep1, setSubmittingStep1] = useState(false)

  const [assignedCount, setAssignedCount] = useState(0)
  const [provisioned, setProvisioned] = useState(false)

  const resetAndClose = () => {
    setStep(1)
    setCreated(null)
    setCode('')
    setName('')
    setContactEmail('')
    setAssignedCount(0)
    setProvisioned(false)
    onOpenChange(false)
  }

  const handleCreateConcession = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!code.trim() || !name.trim() || !contactEmail.trim()) {
      toast.error('Code, name, and contact email are required')

      return
    }

    setSubmittingStep1(true)

    try {
      const res = await fetch('/api/concessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim(), name: name.trim(), contactEmail: contactEmail.trim() })
      })

      const data = await res.json()

      if (data.success) {
        toast.success(`Concession ${data.data.code} onboarded`)
        setCreated(data.data)
        setStep(2)
        onComplete?.()
      } else {
        toast.error(data.error || 'Failed to onboard concession')
      }
    } catch {
      toast.error('Network error onboarding concession')
    } finally {
      setSubmittingStep1(false)
    }
  }

  const handleFinish = () => {
    toast.success('Concession onboarding complete')
    onComplete?.()
    resetAndClose()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={next => {
        if (!next) {
          resetAndClose()
        } else {
          onOpenChange(next)
        }
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">Onboard New Concession</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Register a partner revenue concessionaire, assign its first MMDA, and issue backend credentials.
          </DialogDescription>
        </DialogHeader>

        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {STEPS.map(({ step: s, label, icon: Icon }, idx) => {
            const isActive = step === s
            const isDone = step > s || (s === 1 && created)

            return (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={`flex items-center gap-1.5 text-[11px] font-medium ${
                    isActive ? 'text-primary' : isDone ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'
                  }`}
                >
                  <span
                    className={`flex size-6 items-center justify-center rounded-full border text-[10px] ${
                      isActive
                        ? 'border-primary bg-primary/10'
                        : isDone
                        ? 'border-emerald-500/40 bg-emerald-500/10'
                        : 'border-border bg-muted/40'
                    }`}
                  >
                    {isDone ? <CheckIcon className="size-3" /> : <Icon className="size-3" />}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {idx < STEPS.length - 1 && <div className="h-px flex-1 bg-border" />}
              </div>
            )
          })}
        </div>

        {/* Step 1: Basic info */}
        {step === 1 && (
          <form onSubmit={handleCreateConcession} className="flex flex-col gap-3.5">
            <div className="grid gap-1.5">
              <Label htmlFor="wizard-code" className="text-xs font-medium">Concession Code</Label>
              <Input
                id="wizard-code"
                placeholder="e.g. REVTECH"
                value={code}
                onChange={e => setCode(e.target.value.toUpperCase())}
                className="font-mono text-xs uppercase"
                required
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="wizard-name" className="text-xs font-medium">Company Name</Label>
              <Input
                id="wizard-name"
                placeholder="e.g. RevTech Solutions Ltd"
                value={name}
                onChange={e => setName(e.target.value)}
                className="text-xs"
                required
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="wizard-email" className="text-xs font-medium">Contact Email</Label>
              <Input
                id="wizard-email"
                type="email"
                placeholder="e.g. ops@revtech.com"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                className="text-xs"
                required
              />
            </div>
            <DialogFooter className="gap-3 sm:gap-3 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={resetAndClose} className="text-xs" disabled={submittingStep1}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={submittingStep1} className="text-xs">
                {submittingStep1 ? <Spinner className="size-3 mr-1.5" /> : null}
                Create & Continue
                <ArrowRightIcon className="size-3.5 ml-1.5" />
              </Button>
            </DialogFooter>
          </form>
        )}

        {/* Step 2: Assign MMDA */}
        {step === 2 && created && (
          <div className="flex flex-col gap-3.5">
            <p className="text-xs text-muted-foreground">
              Assign the first MMDA territory to <span className="font-semibold text-foreground">{created.name}</span>.
              You can assign more MMDAs later from the concession&apos;s detail page.
            </p>
            <AssignAssemblyForm
              concessionId={created.id}
              submitLabel="Assign & Continue"
              onAssigned={() => {
                setAssignedCount(c => c + 1)
                setStep(3)
              }}
            />
            <DialogFooter className="gap-3 sm:gap-3">
              <Button type="button" variant="outline" size="sm" className="text-xs" onClick={() => setStep(3)}>
                Skip for now
                <ArrowRightIcon className="size-3.5 ml-1.5" />
              </Button>
            </DialogFooter>
          </div>
        )}

        {/* Step 3: Provision API client */}
        {step === 3 && created && (
          <div className="flex flex-col gap-4">
            <p className="text-xs text-muted-foreground">
              Optionally issue the first machine-to-machine API client for{' '}
              <span className="font-semibold text-foreground">{created.name}</span>&apos;s backend integration.
              {assignedCount > 0 && ' MMDA assignment complete.'}
            </p>
            <div className="flex items-center gap-3">
              <ProvisionApiClientDialog
                concessionId={created.id}
                buttonLabel="Issue First API Client"
                onProvisioned={() => setProvisioned(true)}
              />
              {provisioned && (
                <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
                  <CheckIcon className="size-3.5" />
                  Client issued
                </span>
              )}
            </div>
            <DialogFooter className="gap-3 sm:gap-3">
              <Button type="button" size="sm" className="text-xs" onClick={handleFinish}>
                <CheckIcon className="size-3.5 mr-1.5" />
                Finish Onboarding
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
