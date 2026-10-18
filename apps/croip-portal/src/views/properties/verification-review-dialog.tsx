'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { CheckCircle2Icon, XCircleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
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

export interface PendingVerification {
  id: string
  outcome: string
  verifiedByPersonnelId: string
  capturedAt: string
}

interface VerificationReviewDialogProps {
  verification: PendingVerification | null
  decision: 'APPROVED' | 'REJECTED' | null
  reviewerId: string
  onClose: () => void
  onReviewed: () => void
}

/**
 * Review dialog for a single PENDING PropertyVerification. This is the actual admin workflow
 * the Property screens exist for: an oversight official approves or rejects a concessionaire
 * agent's field verification. Approval flips the property's cached verificationStatus to
 * VERIFIED server-side (see property-registry-service reviewVerification).
 */
export function VerificationReviewDialog({
  verification,
  decision,
  reviewerId,
  onClose,
  onReviewed
}: VerificationReviewDialogProps) {
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const isOpen = Boolean(verification && decision)
  const isApprove = decision === 'APPROVED'

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setNotes('')
      onClose()
    }
  }

  const handleSubmit = async () => {
    if (!verification || !decision) return

    if (!reviewerId) {
      toast.error('Could not determine the reviewing officer. Please reload and try again.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`/api/verifications/${verification.id}/review`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewStatus: decision,
          reviewedByPersonnelId: reviewerId,
          reviewNotes: notes.trim() || undefined
        })
      })
      const json = await res.json()

      if (json.success) {
        toast.success(
          isApprove
            ? 'Verification approved — property marked VERIFIED'
            : 'Verification rejected'
        )
        setNotes('')
        onReviewed()
      } else {
        toast.error(json.error || 'Failed to submit review')
      }
    } catch {
      toast.error('Network error submitting review')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-semibold">
            {isApprove ? (
              <CheckCircle2Icon className="size-4 text-emerald-600" />
            ) : (
              <XCircleIcon className="size-4 text-rose-600" />
            )}
            {isApprove ? 'Approve Field Verification' : 'Reject Field Verification'}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {isApprove
              ? 'Approving will mark this property as VERIFIED in the national cadastre.'
              : 'Rejecting keeps the property verification status unchanged. The concession may be asked to resubmit.'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3.5 py-2 text-xs">
          <div className="grid gap-1.5">
            <Label htmlFor="review-notes" className="text-xs font-medium">
              Review Notes {isApprove ? '(optional)' : '(recommended)'}
            </Label>
            <Textarea
              id="review-notes"
              placeholder={
                isApprove
                  ? 'e.g. GPS coordinates and structure match field capture.'
                  : 'e.g. Captured snapshot does not match registered polygon; request re-verification.'
              }
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="text-xs min-h-24"
            />
          </div>
        </div>

        <DialogFooter className="gap-3 sm:gap-3">
          <Button variant="outline" size="sm" onClick={() => handleOpenChange(false)} className="text-xs" disabled={submitting}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={submitting}
            className="text-xs"
            variant={isApprove ? 'default' : 'destructive'}
          >
            {submitting ? <Spinner className="size-3 mr-1.5" /> : null}
            {isApprove ? 'Approve Verification' : 'Reject Verification'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
