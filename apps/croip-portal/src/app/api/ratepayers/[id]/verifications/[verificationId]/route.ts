import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

interface RouteProps {
  params: Promise<{ id: string; verificationId: string }>
}

/**
 * KYC verification review proxy. Thin pass-through to ratepayer-service (:3030)
 * PATCH /v1/ratepayers/:id/verifications/:verificationId - an oversight official approves
 * or rejects a ratepayer's PENDING identity verification record (e.g. Ghana Card check).
 */
export async function PATCH(request: Request, { params }: RouteProps) {
  const { id, verificationId } = await params

  try {
    const body = await request.json()
    const { verificationStatus } = body

    if (verificationStatus !== 'VERIFIED' && verificationStatus !== 'REJECTED') {
      return NextResponse.json(
        { success: false, error: 'verificationStatus must be VERIFIED or REJECTED' },
        { status: 400 }
      )
    }

    const reviewed = await croipApi.ratepayers.reviewVerification(id, verificationId, { verificationStatus })
    return NextResponse.json({ success: true, data: reviewed })
  } catch (error) {
    console.error(`Failed to review verification ${verificationId} for ratepayer ${id}:`, error)
    const message = error instanceof Error ? error.message : 'Failed to review verification'
    const status = message.includes('409') ? 409 : message.includes('404') ? 404 : 500
    return NextResponse.json({ success: false, error: message }, { status })
  }
}
