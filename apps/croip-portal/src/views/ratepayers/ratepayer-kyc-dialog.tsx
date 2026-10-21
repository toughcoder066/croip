'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import {
  CreditCardIcon,
  BookOpenIcon,
  CarIcon,
  ShieldCheckIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  ArchiveIcon
} from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'

export type AllowedKycProvider = 'GHANA_CARD' | 'PASSPORT' | 'DRIVERS_LICENSE'

interface ProviderOption {
  id: AllowedKycProvider
  name: string
  issuer: string
  formatExample: string
  icon: typeof CreditCardIcon
}

const PROVIDERS: ProviderOption[] = [
  {
    id: 'GHANA_CARD',
    name: 'Ghana Card',
    issuer: 'National Identification Authority (NIA)',
    formatExample: 'GHA-XXXXXXXXX-X',
    icon: CreditCardIcon
  },
  {
    id: 'PASSPORT',
    name: 'Ghanaian Passport',
    issuer: 'Ministry of Foreign Affairs & Regional Integration',
    formatExample: 'GXXXXXXXX',
    icon: BookOpenIcon
  },
  {
    id: 'DRIVERS_LICENSE',
    name: "Driver's License",
    issuer: 'Driver & Vehicle Licensing Authority (DVLA)',
    formatExample: 'DL-XXXXXXXX-X',
    icon: CarIcon
  }
]

interface RatepayerKycDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  ratepayerId: string
  ratepayerName: string
  currentActiveProvider?: string | null
  currentActiveReference?: string | null
  onSuccess: () => void
}

export function RatepayerKycDialog({
  open,
  onOpenChange,
  ratepayerId,
  ratepayerName,
  currentActiveProvider,
  currentActiveReference,
  onSuccess
}: RatepayerKycDialogProps) {
  const [selectedProvider, setSelectedProvider] = useState<AllowedKycProvider>(() => {
    if (currentActiveProvider === 'PASSPORT') return 'PASSPORT'
    if (currentActiveProvider === 'DRIVERS_LICENSE') return 'DRIVERS_LICENSE'
    return 'GHANA_CARD'
  })
  const [customReference, setCustomReference] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const payload: { provider: AllowedKycProvider; providerReference?: string; autoVerify: boolean } = {
        provider: selectedProvider,
        autoVerify: true
      }
      if (customReference.trim()) {
        payload.providerReference = customReference.trim()
      }

      const res = await fetch(`/api/ratepayers/${ratepayerId}/verifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()
      if (data.success) {
        toast.success(
          `KYC verification succeeded (${data.data?.providerReference || selectedProvider}). Previous verifications archived.`
        )
        setCustomReference('')
        onOpenChange(false)
        onSuccess()
      } else {
        toast.error(data.error || 'Failed to verify KYC')
      }
    } catch (err) {
      console.error('Failed to submit KYC verification:', err)
      toast.error('An unexpected error occurred while verifying KYC')
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedOption = PROVIDERS.find(p => p.id === selectedProvider)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-semibold">
            <ShieldCheckIcon className="size-4 text-primary" />
            Citizen Identity Verification (KYC)
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Verify citizen identity for <strong className="text-foreground">{ratepayerName}</strong> using one of the 3 statutory identification documents.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-1">
          {/* Active provider alert if already verified */}
          {currentActiveProvider && (
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/50 border border-border text-xs">
              <ArchiveIcon className="size-4 text-muted-foreground shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-semibold text-foreground">Current Active Verification</span>
                <p className="text-[11px] text-muted-foreground">
                  Currently verified as <Badge variant="secondary" className="font-mono text-[10px] mx-1">{currentActiveProvider}</Badge>
                  {currentActiveReference && ` (${currentActiveReference})`}.
                  Switching provider will archive this record for statutory audit compliance.
                </p>
              </div>
            </div>
          )}

          {/* Provider Selection (Strict 3 Providers) */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Select Identity Provider (Exactly 1 Active)
            </Label>
            <div className="grid grid-cols-1 gap-2">
              {PROVIDERS.map(p => {
                const Icon = p.icon
                const isSelected = selectedProvider === p.id
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProvider(p.id)}
                    className={`cursor-pointer rounded-lg border p-3 flex items-start gap-3 transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-border/60 hover:border-border hover:bg-muted/40'
                    }`}
                  >
                    <div
                      className={`size-8 rounded-md flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <Icon className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-foreground">{p.name}</span>
                        {isSelected && (
                          <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
                            Selected
                          </Badge>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground">{p.issuer}</p>
                      <p className="text-[10px] text-muted-foreground/80 font-mono mt-0.5">
                        Sample format: {p.formatExample}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Document Reference Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="id-ref" className="text-xs font-medium">
                ID Reference / Document Number
              </Label>
              <span className="text-[10px] text-muted-foreground">Leave empty to auto-generate</span>
            </div>
            <Input
              id="id-ref"
              placeholder={`e.g. ${selectedOption?.formatExample || 'GHA-XXXXXXXXX-X'}`}
              value={customReference}
              onChange={e => setCustomReference(e.target.value)}
              className="text-xs h-9 font-mono"
            />
            <p className="text-[11px] text-muted-foreground">
              If left blank, the KYC engine will generate a standard valid dummy reference conforming to official NIA/DVLA standards.
            </p>
          </div>

          {/* Audit Trail Archiving Notice */}
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-[11px]">
              <AlertTriangleIcon className="size-3.5" />
              Statutory Single Provider & Audit Rule:
            </div>
            <p className="text-[11px] leading-relaxed">
              Ghanaian municipal governance requires exactly one active identity provider per ratepayer. Changing identity documents will <strong>archive previous verifications</strong> to retain an immutable audit trail in Postgres.
            </p>
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="gap-1.5"
            >
              {isSubmitting ? (
                <>
                  <Spinner className="size-3.5" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle2Icon className="size-3.5" />
                  Verify & Apply Identity
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
