'use client'

import { useState } from 'react'
import { AlertTriangleIcon, CheckCircle2Icon, Loader2Icon, ShieldAlertIcon, Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export type PurgeTarget = 'properties' | 'concessions' | 'ratepayers'

interface PurgeConfirmDialogProps {
  target: PurgeTarget
  onSuccess: () => void
  trigger?: React.ReactNode
}

const TARGET_CONFIG = {
  properties: {
    title: 'Purge Property Registry Data',
    buttonLabel: 'Purge Properties',
    apiEndpoint: '/api/properties/purge',
    consequenceText:
      'All registered land parcels, building units, valuation lists, photo evidence, legal documents, and field verifications will be permanently erased.',
    preservationNote:
      '16 Administrative Regions and 260 MMDA boundary polygons in Shared Services remain completely intact and untouched.'
  },
  concessions: {
    title: 'Purge Concession Data',
    buttonLabel: 'Purge Concessions',
    apiEndpoint: '/api/concessions/purge',
    consequenceText:
      'All partner revenue concessionaires, assembly contract scopes, field personnel, and API credentials will be permanently deleted.',
    preservationNote:
      'The CROIP Super Administrator account (superuser@croip.com) and SUPER_ADMIN RBAC permissions remain completely intact.'
  },
  ratepayers: {
    title: 'Purge Ratepayer Directory',
    buttonLabel: 'Purge Ratepayers',
    apiEndpoint: '/api/ratepayers/purge',
    consequenceText:
      'All citizen and corporate ratepayer profiles, national ID/KYC verifications, OTP records, and property link claims will be permanently removed.',
    preservationNote:
      'Shared MMDA jurisdictions and the Central Platform administrative users remain completely intact and untouched.'
  }
} as const

export function PurgeConfirmDialog({ target, onSuccess, trigger }: PurgeConfirmDialogProps) {
  const [open, setOpen] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [purging, setPurging] = useState(false)

  const config = TARGET_CONFIG[target]
  const isConfirmed = confirmText.trim().toUpperCase() === 'PURGE'

  const handlePurge = async () => {
    if (!isConfirmed || purging) return

    setPurging(true)
    try {
      const res = await fetch(config.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      const data = await res.json()

      if (res.ok && data.success) {
        toast.success(data.message || `${config.title} completed successfully`)
        setOpen(false)
        setConfirmText('')
        onSuccess()
      } else {
        toast.error(data.error || `Failed to execute ${config.title}`)
      }
    } catch (err: any) {
      console.error(`Purge error for ${target}:`, err)
      toast.error('Network error during purge execution')
    } finally {
      setPurging(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={val => {
      if (!purging) {
        setOpen(val)
        if (!val) setConfirmText('')
      }
    }}>
      <DialogTrigger
        render={
          trigger ? (
            (trigger as any)
          ) : (
            <Button
              variant="destructive"
              size="sm"
              className="gap-1.5 text-xs h-8 bg-destructive/15 text-destructive hover:bg-destructive hover:text-destructive-foreground border border-destructive/30 transition-all font-medium"
            >
              <Trash2Icon className="size-3.5" />
              {config.buttonLabel}
            </Button>
          )
        }
      />

      <DialogContent className="sm:max-w-md border-destructive/30 shadow-2xl">
        <DialogHeader className="gap-2">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive shrink-0">
              <ShieldAlertIcon className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-foreground">
                {config.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                Destructive action restricted to platform administrators
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-1 text-xs">
          <div className="rounded-lg bg-destructive/10 border border-destructive/25 p-3 text-destructive space-y-1.5">
            <div className="flex items-start gap-2 font-semibold">
              <AlertTriangleIcon className="size-4 shrink-0 mt-0.5" />
              <span>Warning: Irreversible data deletion</span>
            </div>
            <p className="text-[11px] leading-relaxed text-destructive/90 pl-6">
              {config.consequenceText}
            </p>
          </div>

          <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/25 p-3 text-emerald-800 dark:text-emerald-300 space-y-1">
            <div className="flex items-center gap-2 font-semibold text-[11px]">
              <CheckCircle2Icon className="size-3.5 shrink-0" />
              <span>Preserved Data Safeguard</span>
            </div>
            <p className="text-[11px] leading-relaxed opacity-90 pl-5">
              {config.preservationNote}
            </p>
          </div>

          <div className="space-y-2 pt-1">
            <Label htmlFor="confirm-purge-input" className="text-xs text-muted-foreground">
              To proceed, type <span className="font-bold text-foreground">PURGE</span> in all caps below:
            </Label>
            <Input
              id="confirm-purge-input"
              value={confirmText}
              onChange={e => setConfirmText(e.target.value)}
              placeholder="PURGE"
              disabled={purging}
              className="text-xs font-mono tracking-wider uppercase border-destructive/30 focus-visible:ring-destructive/30"
              autoComplete="off"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setOpen(false)}
            disabled={purging}
            className="text-xs"
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handlePurge}
            disabled={!isConfirmed || purging}
            className="text-xs gap-1.5 font-semibold"
          >
            {purging ? (
              <>
                <Loader2Icon className="size-3.5 animate-spin" />
                Purging Data...
              </>
            ) : (
              <>
                <Trash2Icon className="size-3.5" />
                Confirm & Purge Now
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
