'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { ClockIcon, CheckCircle2Icon, XCircleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Spinner } from '@/components/ui/spinner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

export interface PendingDispute {
  code: string
  disputeType: string
}

export type DisputeTargetStatus = 'UNDER_REVIEW' | 'RESOLVED' | 'REJECTED'

interface DisputeStatusDialogProps {
  dispute: PendingDispute | null
  targetStatus: DisputeTargetStatus | null
  onClose: () => void
  onUpdated: () => void
}

const COPY: Record<DisputeTargetStatus, { title: string; icon: typeof ClockIcon; description: string; buttonLabel: string; variant: 'default' | 'destructive' }> = {
  UNDER_REVIEW: {
    title: 'Start Review',
    icon: ClockIcon,
    description: 'Moves this dispute from OPEN to UNDER_REVIEW — it becomes yours to investigate.',
    buttonLabel: 'Start Review',
    variant: 'default'
  },
  RESOLVED: {
    title: 'Resolve Dispute',
    icon: CheckCircle2Icon,
    description: 'Marks this dispute RESOLVED. Record the outcome below — it is shown to the ratepayer.',
    buttonLabel: 'Resolve Dispute',
    variant: 'default'
  },
  REJECTED: {
    title: 'Reject Dispute',
    icon: XCircleIcon,
    description: 'Marks this dispute REJECTED. Record the reason below — it is shown to the ratepayer.',
    buttonLabel: 'Reject Dispute',
    variant: 'destructive'
  }
}

/**
 * Forward-only status transition dialog for a dispute: OPEN -> UNDER_REVIEW -> RESOLVED|REJECTED.
 * This is the actual admin workflow the Disputes queue exists for.
 */
export function DisputeStatusDialog({ dispute, targetStatus, onClose, onUpdated }: DisputeStatusDialogProps) {
  const [resolution, setResolution] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const isOpen = Boolean(dispute && targetStatus)
  const copy = targetStatus ? COPY[targetStatus] : null
  const needsResolution = targetStatus === 'RESOLVED' || targetStatus === 'REJECTED'

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setResolution('')
      onClose()
    }
  }

  const handleSubmit = async () => {
    if (!dispute || !targetStatus) return
    if (needsResolution && !resolution.trim()) {
      toast.error('Please record the outcome before submitting')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`/api/disputes/${dispute.code}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: targetStatus, ...(needsResolution ? { resolution: resolution.trim() } : {}) })
      })
      const json = await res.json()

      if (json.success) {
        toast.success(`Dispute ${dispute.code} updated`)
        setResolution('')
        onUpdated()
      } else {
        toast.error(json.error || 'Failed to update dispute')
      }
    } catch {
      toast.error('Network error updating dispute')
    } finally {
      setSubmitting(false)
    }
  }

  if (!copy) return null
  const Icon = copy.icon

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-semibold">
            <Icon className="size-4" />
            {copy.title}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {dispute && (
              <>
                Dispute <span className="font-mono">{dispute.code}</span> &middot; {dispute.disputeType}.{' '}
              </>
            )}
            {copy.description}
          </DialogDescription>
        </DialogHeader>

        {needsResolution && (
          <div className="grid gap-1.5 py-1">
            <Label htmlFor="dispute-resolution" className="text-xs font-medium">
              {targetStatus === 'RESOLVED' ? 'Resolution' : 'Reason for rejection'}
            </Label>
            <Textarea
              id="dispute-resolution"
              value={resolution}
              onChange={e => setResolution(e.target.value)}
              placeholder={targetStatus === 'RESOLVED' ? 'e.g. Bill recalculated and corrected.' : 'e.g. No supporting evidence provided.'}
              className="text-xs"
              rows={3}
            />
          </div>
        )}

        <DialogFooter className="gap-3 sm:gap-3">
          <Button variant="outline" size="sm" onClick={() => handleOpenChange(false)} className="text-xs" disabled={submitting}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSubmit} disabled={submitting} className="text-xs" variant={copy.variant}>
            {submitting ? <Spinner className="size-3 mr-1.5" /> : null}
            {copy.buttonLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
