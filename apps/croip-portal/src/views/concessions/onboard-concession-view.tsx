'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'
import {
  Building2Icon,
  CheckIcon,
  LandmarkIcon,
  KeyRoundIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
  FileTextIcon,
  ReceiptIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CopyIcon,
  ShieldAlertIcon,
  MailCheckIcon,
  MailWarningIcon,
  XIcon,
  Calendar1Icon
} from 'lucide-react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group'

import { AssignAssemblyForm, type PendingAssignment } from './assign-assembly-form'

type WizardStep = 1 | 2 | 3

interface IssuedApiClient {
  id: string
  concessionId: string
  clientId: string
  clientSecret: string
  status: string
  issuedVia: string
  expiresAt: string
  emailDelivered: boolean
}

interface CreatedConcession {
  id: string
  code: string
  name: string
  contactEmail: string
  status: string
  createdAt: string
  apiClient?: IssuedApiClient
}

// Every concessionaire onboarded here is a Ghanaian entity — the dial code is fixed, not
// a field, so the contact phone input only ever collects the local number.
const GHANA_DIAL_CODE = '+233'

// A Ghanaian mobile number is 9 digits in international form (+233XXXXXXXXX) — locally
// that's usually written with a leading trunk 0 (e.g. 024 123 4567, 10 digits), which
// this accepts and strips, but a bare 9-digit number (no leading 0) is also valid. Any
// other length is rejected outright rather than silently truncated or padded.
const GHANA_PHONE_REGEX = /^0?\d{9}$/

function isValidGhanaPhone(localDigits: string): boolean {
  return GHANA_PHONE_REGEX.test(localDigits)
}

function toE164(localDigits: string): string {
  if (!isValidGhanaPhone(localDigits)) return ''

  return `${GHANA_DIAL_CODE}${localDigits.replace(/^0/, '')}`
}

const STEPS: { step: WizardStep; label: string; description: string; icon: typeof Building2Icon }[] = [
  { step: 1, label: 'Concessionaire', description: 'Company name & contact', icon: Building2Icon },
  { step: 2, label: 'Assign MMDA', description: 'One or more territories', icon: LandmarkIcon },
  { step: 3, label: 'API Client', description: 'Credentials & secret', icon: KeyRoundIcon }
]

/**
 * A full page, not a dialog — onboarding a concession involves enough steps (and a
 * one-time secret reveal at the end) that a modal was cramped and easy to dismiss by
 * accident. Lives at /concessions/onboard; see that route's page.tsx.
 */
export function OnboardConcessionView() {
  const router = useRouter()

  const [step, setStep] = useState<WizardStep>(1)
  const [created, setCreated] = useState<CreatedConcession | null>(null)

  // Step 1 form state — nothing is sent to the backend here. The concession is only
  // actually created once the final submit fires in step 2, after MMDAs (if any) have
  // been picked, so nothing exists half-created if the officer leaves this page partway
  // through.
  const [name, setName] = useState('')
  const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState('')
  const [tin, setTin] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactEmail, setContactEmail] = useState('')

  // Step 2 — MMDAs picked so far, held locally until the final submit. Each is a plain
  // object, not yet assigned to anything, since the concession itself doesn't exist yet.
  const [pendingAssemblies, setPendingAssemblies] = useState<PendingAssignment[]>([])
  const [submitting, setSubmitting] = useState(false)

  const [confirmedCopied, setConfirmedCopied] = useState(false)

  const handleContinueToAssignMmda = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !businessRegistrationNumber.trim() || !tin.trim() || !contactName.trim() || !contactPhone.trim() || !contactEmail.trim()) {
      toast.error('All fields are required')

      return
    }

    if (!isValidGhanaPhone(contactPhone)) {
      toast.error('Enter a valid phone number — 9 digits, e.g. 24 123 4567')

      return
    }

    setStep(2)
  }

  const handleAddAssembly = (assignment: PendingAssignment) => {
    if (pendingAssemblies.some(a => a.assemblyId === assignment.assemblyId)) {
      toast.error(`${assignment.assemblyLabel} is already in the list`)

      return
    }

    setPendingAssemblies(prev => [...prev, assignment])
  }

  const removePendingAssembly = (assemblyId: string) => {
    setPendingAssemblies(prev => prev.filter(a => a.assemblyId !== assemblyId))
  }

  // The one real submit on this whole page — creates the concession (auto-generating its
  // code and issuing its first API client server-side), then assigns every MMDA picked in
  // step 2 to the concession that now exists.
  const handleCreateConcession = async () => {
    setSubmitting(true)

    try {
      const res = await fetch('/api/concessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          businessRegistrationNumber: businessRegistrationNumber.trim(),
          tin: tin.trim(),
          contactName: contactName.trim(),
          contactPhone: toE164(contactPhone.trim()),
          contactEmail: contactEmail.trim()
        })
      })

      const data = await res.json()

      if (!data.success) {
        toast.error(data.error || 'Failed to onboard concession')

        return
      }

      const concession: CreatedConcession = data.data

      const failures: string[] = []

      for (const assignment of pendingAssemblies) {
        const assignRes = await fetch(`/api/concessions/${concession.id}/assemblies`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            assemblyId: assignment.assemblyId,
            contractEnd: assignment.contractEnd
          })
        })

        const assignData = await assignRes.json()

        if (!assignData.success) {
          failures.push(`${assignment.assemblyLabel} (${assignData.error || 'failed'})`)
        }
      }

      if (failures.length > 0) {
        toast.error(`${concession.code} onboarded, but some MMDAs could not be assigned: ${failures.join('; ')}`)
      } else {
        toast.success(
          pendingAssemblies.length > 0
            ? `${concession.code} onboarded with ${pendingAssemblies.length} MMDA(s) assigned`
            : `${concession.code} onboarded`
        )
      }

      setCreated(concession)
      setStep(3)
    } catch {
      toast.error('Network error onboarding concession')
    } finally {
      setSubmitting(false)
    }
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard`)
  }

  const handleFinish = () => {
    toast.success('Concession onboarding complete')
    router.push('/concessions')
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-border/40">
        <Button size="icon" variant="ghost" className="size-8" onClick={() => router.push('/concessions')}>
          <ArrowLeftIcon className="size-4" />
        </Button>
        <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Building2Icon className="size-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Onboard New Concession</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Register a partner revenue concessionaire, assign its MMDA(s), and issue backend credentials.
          </p>
        </div>
      </div>

      {/* Stepper */}
      <div className="grid gap-3 sm:grid-cols-3">
        {STEPS.map(({ step: s, label, description, icon: Icon }) => {
          const isActive = step === s
          const isDone = step > s

          return (
            <div
              key={s}
              className={cn(
                'flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors',
                isActive ? 'border-primary/40 bg-primary/5' : isDone ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-border/60'
              )}
            >
              <span
                className={cn(
                  'flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold',
                  isActive
                    ? 'border-primary bg-primary text-primary-foreground'
                    : isDone
                    ? 'border-emerald-500 bg-emerald-500 text-white'
                    : 'border-border bg-muted/60 text-muted-foreground'
                )}
              >
                {isDone ? <CheckIcon className="size-4" /> : <Icon className="size-4" />}
              </span>
              <div className="min-w-0">
                <p className={cn('text-sm font-semibold', isActive ? 'text-primary' : 'text-foreground')}>{label}</p>
                <p className="text-[11px] text-muted-foreground truncate">{description}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main step content */}
        <Card className="lg:col-span-2">
          <CardContent className="pt-6">
            {/* Step 1: Basic info — local only, nothing is created yet */}
            {step === 1 && (
              <form onSubmit={handleContinueToAssignMmda} className="flex flex-col gap-6">
                <div className="flex flex-col gap-3.5">
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">Company Details</h2>
                    <p className="text-xs text-muted-foreground">The registered legal entity this concession ties back to.</p>
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="wizard-name" className="text-xs font-medium">Company Name</Label>
                    <InputGroup>
                      <InputGroupAddon align="inline-start">
                        <Building2Icon className="size-4 text-muted-foreground" />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="wizard-name"
                        placeholder="e.g. RevTech Solutions Ltd"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="text-sm"
                        required
                      />
                    </InputGroup>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-1.5">
                      <Label htmlFor="wizard-reg-number" className="text-xs font-medium">Business Registration Number</Label>
                      <InputGroup>
                        <InputGroupAddon align="inline-start">
                          <FileTextIcon className="size-4 text-muted-foreground" />
                        </InputGroupAddon>
                        <InputGroupInput
                          id="wizard-reg-number"
                          placeholder="Registrar General's Dept. number"
                          value={businessRegistrationNumber}
                          onChange={e => setBusinessRegistrationNumber(e.target.value)}
                          className="text-sm"
                          required
                        />
                      </InputGroup>
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="wizard-tin" className="text-xs font-medium">TIN</Label>
                      <InputGroup>
                        <InputGroupAddon align="inline-start">
                          <ReceiptIcon className="size-4 text-muted-foreground" />
                        </InputGroupAddon>
                        <InputGroupInput
                          id="wizard-tin"
                          placeholder="GRA Tax Identification Number"
                          value={tin}
                          onChange={e => setTin(e.target.value)}
                          className="text-sm"
                          required
                        />
                      </InputGroup>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3.5 border-t border-border/40 pt-5">
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">Primary Contact</h2>
                    <p className="text-xs text-muted-foreground">A named, accountable person — not a shared inbox.</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-1.5">
                      <Label htmlFor="wizard-contact-name" className="text-xs font-medium">Contact Name</Label>
                      <InputGroup>
                        <InputGroupAddon align="inline-start">
                          <UserIcon className="size-4 text-muted-foreground" />
                        </InputGroupAddon>
                        <InputGroupInput
                          id="wizard-contact-name"
                          placeholder="e.g. Ama Boateng"
                          value={contactName}
                          onChange={e => setContactName(e.target.value)}
                          className="text-sm"
                          required
                        />
                      </InputGroup>
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="wizard-contact-phone" className="text-xs font-medium">Contact Phone</Label>
                      {/* Dial code is fixed, not typed — every concessionaire onboarded here
                          is Ghanaian, so this only ever collects the local number. */}
                      <InputGroup>
                        <InputGroupAddon align="inline-start">
                          <PhoneIcon className="size-4 text-muted-foreground" />
                          <InputGroupText className="font-medium text-foreground">{GHANA_DIAL_CODE}</InputGroupText>
                        </InputGroupAddon>
                        <InputGroupInput
                          id="wizard-contact-phone"
                          type="tel"
                          inputMode="numeric"
                          placeholder="24 123 4567"
                          value={contactPhone}
                          onChange={e => setContactPhone(e.target.value.replace(/\D/g, ''))}
                          maxLength={10}
                          aria-invalid={contactPhone.length > 0 && !isValidGhanaPhone(contactPhone)}
                          className="text-sm"
                          required
                        />
                      </InputGroup>
                      {contactPhone.length > 0 && !isValidGhanaPhone(contactPhone) && (
                        <p className="text-[11px] text-destructive">9 digits after the dial code, e.g. 24 123 4567</p>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="wizard-email" className="text-xs font-medium">Contact Email</Label>
                    <InputGroup>
                      <InputGroupAddon align="inline-start">
                        <MailIcon className="size-4 text-muted-foreground" />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="wizard-email"
                        type="email"
                        placeholder="e.g. ops@revtech.com"
                        value={contactEmail}
                        onChange={e => setContactEmail(e.target.value)}
                        className="text-sm"
                        required
                      />
                    </InputGroup>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  Nothing is saved yet — the record is only created after MMDAs are assigned on the next step.
                  A concession code is generated automatically.
                </p>

                <div className="flex items-center justify-end gap-3 border-t border-border/40 pt-4">
                  <Button type="button" variant="outline" size="sm" onClick={() => router.push('/concessions')} className="text-xs">
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" className="text-xs">
                    Continue
                    <ArrowRightIcon className="size-3.5 ml-1.5" />
                  </Button>
                </div>
              </form>
            )}

            {/* Step 2: Assign MMDA(s) — still entirely local. The concession itself, and
                every MMDA assignment, are only actually created when "Create Concession"
                is pressed below. */}
            {step === 2 && (
              <div className="flex flex-col gap-5">
                <p className="text-xs text-muted-foreground">
                  Assign one or more MMDA territories to <span className="font-semibold text-foreground">{name}</span>.
                  You can also assign MMDAs later from the concession&apos;s detail page.
                </p>

                <AssignAssemblyForm
                  mode="local"
                  onAdd={handleAddAssembly}
                  excludeAssemblyIds={pendingAssemblies.map(a => a.assemblyId)}
                />

                <div className="flex items-center justify-end gap-3 border-t border-border/40 pt-4">
                  <Button type="button" variant="outline" size="sm" className="text-xs" onClick={() => setStep(1)} disabled={submitting}>
                    <ArrowLeftIcon className="size-3.5 mr-1.5" />
                    Back
                  </Button>
                  <Button type="button" size="sm" className="text-xs" onClick={handleCreateConcession} disabled={submitting}>
                    {submitting ? <Spinner className="size-3 mr-1.5" /> : null}
                    Create Concession
                    <ArrowRightIcon className="size-3.5 ml-1.5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: First API client, already issued during onboarding */}
            {step === 3 && created && (
              <div className="flex flex-col gap-5">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{created.name}</span> is onboarded
                  {pendingAssemblies.length > 0 ? ` with ${pendingAssemblies.length} MMDA(s) assigned` : ''}, and its first
                  machine-to-machine API client was issued automatically.
                </p>

                {created.apiClient ? (
                  <>
                    <Alert variant="destructive" className="my-1">
                      <ShieldAlertIcon />
                      <AlertTitle className="text-xs font-semibold">Copy this secret now — you won&apos;t see it again</AlertTitle>
                      <AlertDescription className="text-[11px]">
                        The client secret is shown here exactly once and is never stored in retrievable form.
                        If it is lost, the only recourse is to rotate it from the concession&apos;s detail page.
                      </AlertDescription>
                    </Alert>

                    <div className="grid gap-3.5 text-xs">
                      <div className="grid gap-1.5">
                        <Label className="text-xs font-medium">Client ID</Label>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 rounded-md border bg-muted/40 px-3 py-2 font-mono text-[11px] break-all">
                            {created.apiClient.clientId}
                          </code>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="size-8 shrink-0"
                            onClick={() => copyToClipboard(created.apiClient!.clientId, 'Client ID')}
                            title="Copy Client ID"
                          >
                            <CopyIcon className="size-3.5" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid gap-1.5">
                        <Label className="text-xs font-medium">Client Secret</Label>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 font-mono text-[11px] break-all">
                            {created.apiClient.clientSecret}
                          </code>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="size-8 shrink-0"
                            onClick={() => copyToClipboard(created.apiClient!.clientSecret, 'Client secret')}
                            title="Copy Client Secret"
                          >
                            <CopyIcon className="size-3.5" />
                          </Button>
                        </div>
                      </div>

                      <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        {created.apiClient.emailDelivered ? (
                          <>
                            <MailCheckIcon className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                            Also sent to {created.contactEmail}
                          </>
                        ) : (
                          <>
                            <MailWarningIcon className="size-3.5 text-amber-600 dark:text-amber-400" />
                            Email delivery failed — copy the secret now. It cannot be re-sent; only rotating from the concession&apos;s detail page issues a new one.
                          </>
                        )}
                      </p>
                    </div>

                    <label className="flex items-start gap-2.5 rounded-md border bg-muted/20 p-3 cursor-pointer">
                      <Checkbox
                        checked={confirmedCopied}
                        onCheckedChange={checked => setConfirmedCopied(checked === true)}
                      />
                      <span className="text-[11px] text-foreground">
                        I have copied this client secret somewhere secure. I understand it cannot be retrieved again.
                      </span>
                    </label>
                  </>
                ) : (
                  <p className="text-[11px] text-destructive">
                    No API client was returned for this concession — issue one from its detail page.
                  </p>
                )}

                <div className="flex items-center justify-end gap-3 border-t border-border/40 pt-4">
                  <Button
                    type="button"
                    size="sm"
                    className="text-xs"
                    disabled={Boolean(created.apiClient) && !confirmedCopied}
                    onClick={handleFinish}
                  >
                    <CheckIcon className="size-3.5 mr-1.5" />
                    Finish Onboarding
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Live summary — fills the rest of the page's width with real context instead of
            leaving it empty, and doubles as where pending MMDAs get removed from before
            the concession is actually created. */}
        <Card className="lg:col-span-1 self-start lg:sticky lg:top-6">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Summary</CardTitle>
            <CardDescription className="text-xs">What will be created</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-xs">
            <div className="flex items-start gap-2.5">
              <Building2Icon className="size-4 mt-0.5 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] text-muted-foreground">Company</p>
                <p className={cn('font-medium truncate', name ? 'text-foreground' : 'text-muted-foreground italic')}>
                  {name || 'Not entered yet'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <FileTextIcon className="size-4 mt-0.5 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <p className="text-[11px] text-muted-foreground">Reg. No.</p>
                  <p className={cn('font-medium truncate', businessRegistrationNumber ? 'text-foreground' : 'text-muted-foreground italic')}>
                    {businessRegistrationNumber || '—'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ReceiptIcon className="size-4 mt-0.5 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <p className="text-[11px] text-muted-foreground">TIN</p>
                  <p className={cn('font-medium truncate', tin ? 'text-foreground' : 'text-muted-foreground italic')}>
                    {tin || '—'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <UserIcon className="size-4 mt-0.5 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] text-muted-foreground">Primary Contact</p>
                <p className={cn('font-medium truncate', contactName ? 'text-foreground' : 'text-muted-foreground italic')}>
                  {contactName || 'Not entered yet'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <PhoneIcon className="size-4 mt-0.5 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <p className="text-[11px] text-muted-foreground">Phone</p>
                  <p className={cn('font-medium truncate', contactPhone ? 'text-foreground' : 'text-muted-foreground italic')}>
                    {contactPhone ? toE164(contactPhone) || `${GHANA_DIAL_CODE} ${contactPhone} (incomplete)` : '—'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MailIcon className="size-4 mt-0.5 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <p className="text-[11px] text-muted-foreground">Email</p>
                  <p className={cn('font-medium truncate', contactEmail ? 'text-foreground' : 'text-muted-foreground italic')}>
                    {contactEmail || '—'}
                  </p>
                </div>
              </div>
            </div>

            {created && (
              <div className="flex items-start gap-2.5">
                <KeyRoundIcon className="size-4 mt-0.5 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <p className="text-[11px] text-muted-foreground">Concession Code</p>
                  <p className="font-mono font-medium text-foreground">{created.code}</p>
                </div>
              </div>
            )}

            <div className="border-t border-border/40 pt-3.5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-medium text-muted-foreground">MMDAs</p>
                <Badge variant="outline" className="text-[10px] font-medium">{pendingAssemblies.length}</Badge>
              </div>

              {pendingAssemblies.length === 0 ? (
                <p className="text-[11px] text-muted-foreground italic">None added yet</p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {pendingAssemblies.map(a => (
                    <li key={a.assemblyId} className="flex items-start justify-between gap-2 rounded-md border bg-muted/20 p-2">
                      <div className="flex items-start gap-1.5 min-w-0">
                        <LandmarkIcon className="size-3.5 mt-0.5 text-primary shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate">{a.assemblyLabel}</p>
                          <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <Calendar1Icon className="size-3" />
                            {a.contractStart} &rarr; {a.contractEnd}
                          </p>
                        </div>
                      </div>
                      {step === 2 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-5 shrink-0"
                          onClick={() => removePendingAssembly(a.assemblyId)}
                          title="Remove"
                        >
                          <XIcon className="size-3" />
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
