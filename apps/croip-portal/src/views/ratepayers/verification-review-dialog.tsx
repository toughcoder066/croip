'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { CheckCircle2Icon, XCircleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
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
  provider: string
  providerReference: string
}

interface VerificationReviewDialogProps {
  ratepayerId: string
  verification: PendingVerification | null
  decision: 'VERIFIED' | 'REJECTED' | null
  onClose: () => void
  onReviewed: () => void
}

/**
 * Confirm dialog for a single PENDING RatepayerVerification. This is the actual admin workflow
 * the Ratepayer detail screen exists for: an oversight official approves or rejects a citizen's
 * KYC check (e.g. Ghana Card verification) before they can transact on the platform.
 */
export function VerificationReviewDialog({
  ratepayerId,
  verification,
  decision,
  onClose,
  onReviewed
}: VerificationReviewDialogProps) {
  const [submitting, setSubmitting] = useState(false)

  const isOpen = Boolean(verification && decision)
  const isApprove = decision === 'VERIFIED'

  const handleOpenChange = (open: boolean) => {
    if (!open) onClose()
  }

  const handleSubmit = async () => {
    if (!verification || !decision) return

    setSubmitting(true)
    try {
      const res = await fetch(`/api/ratepayers/${ratepayerId}/verifications/${verification.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verificationStatus: decision })
      })
      const json = await res.json()

      if (json.success) {
        toast.success(isApprove ? 'KYC verification approved' : 'KYC verification rejected')
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
            {isApprove ? 'Approve KYC Verification' : 'Reject KYC Verification'}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {verification && (
              <>
                {verification.provider} verification, reference{' '}
                <span className="font-mono">{verification.providerReference}</span>.{' '}
              </>
            )}
            {isApprove
              ? 'Approving marks this identity check as VERIFIED for the ratepayer.'
              : 'Rejecting marks this identity check as REJECTED. The ratepayer may be asked to resubmit.'}
          </DialogDescription>
        </DialogHeader>

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
