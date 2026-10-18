import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

interface RouteProps {
  params: Promise<{ id: string }>
}

/**
 * Review proxy for a field verification.
 * Thin pass-through to property-registry-service (:3020) PATCH /v1/verifications/:id/review.
 * On APPROVED this flips the owning property's cached verificationStatus to VERIFIED.
 */
export async function PATCH(request: Request, { params }: RouteProps) {
  const { id } = await params

  try {
    const body = await request.json()
    const { reviewStatus, reviewedByPersonnelId, reviewNotes } = body

    if (!reviewStatus || !reviewedByPersonnelId) {
      return NextResponse.json(
        { success: false, error: 'reviewStatus and reviewedByPersonnelId are required' },
        { status: 400 }
      )
    }

    const reviewed = await croipApi.propertyRegistry.reviewVerification(id, {
      reviewStatus,
      reviewedByPersonnelId,
      reviewNotes
    })

    return NextResponse.json({ success: true, data: reviewed })
  } catch (error) {
    console.error(`Failed to review verification ${id}:`, error)
    const message = error instanceof Error ? error.message : 'Failed to review verification'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
