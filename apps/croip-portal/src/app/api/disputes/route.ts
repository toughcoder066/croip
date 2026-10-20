import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

/**
 * Dispute review-queue proxy. Thin pass-through to dispute-service (:3008)
 * GET /v1/disputes - the queue of billing/boundary/valuation disputes raised by ratepayers.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  try {
    const data = await croipApi.disputes.getQueue({
      status: searchParams.get('status') || undefined,
      assignedToPersonnelId: searchParams.get('assignedToPersonnelId') || undefined,
      raisedByRatepayerId: searchParams.get('raisedByRatepayerId') || undefined
    })
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Failed to fetch dispute queue from Dispute service:', error)
    const message = error instanceof Error ? error.message : 'Failed to fetch dispute queue'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
