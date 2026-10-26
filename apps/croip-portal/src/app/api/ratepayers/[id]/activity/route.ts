import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

interface RouteProps {
  params: Promise<{ id: string }>
}

/**
 * Account activity log proxy for a single ratepayer.
 * Thin pass-through to ratepayer-service (:3030) GET /v1/ratepayers/:id/activity -
 * every real action taken on this ratepayer's account, most recent first.
 */
export async function GET(_request: Request, { params }: RouteProps) {
  const { id } = await params

  try {
    const activity = await croipApi.ratepayers.getActivity(id)
    return NextResponse.json({ success: true, data: activity })
  } catch (error) {
    console.error(`Failed to fetch account activity for ratepayer ${id}:`, error)
    return NextResponse.json({ success: false, error: 'Failed to fetch ratepayer activity' }, { status: 500 })
  }
}
