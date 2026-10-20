import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

interface RouteProps {
  params: Promise<{ id: string }>
}

/**
 * Update ratepayer status (ACTIVE, SUSPENDED, DEACTIVATED).
 * Passes through to ratepayer-service (:3030) PATCH /v1/ratepayers/:id/status.
 */
export async function PATCH(request: Request, { params }: RouteProps) {
  const { id } = await params

  try {
    const body = await request.json()
    const { status } = body

    if (!status || !['ACTIVE', 'SUSPENDED', 'DEACTIVATED'].includes(status)) {
      return NextResponse.json({ success: false, error: 'Valid status (ACTIVE, SUSPENDED, DEACTIVATED) is required' }, { status: 400 })
    }

    const updated = await croipApi.ratepayers.updateStatus(id, status)
    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error(`Failed to update status for ratepayer ${id}:`, error)
    const message = error instanceof Error ? error.message : 'Failed to update ratepayer status'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
