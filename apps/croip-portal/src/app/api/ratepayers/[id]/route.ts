import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

interface RouteProps {
  params: Promise<{ id: string }>
}

/**
 * Ratepayer detail proxy. Thin pass-through to ratepayer-service (:3030)
 * GET /v1/ratepayers/:id - full KYC profile with nested verifications and property links.
 */
export async function GET(_request: Request, { params }: RouteProps) {
  const { id } = await params

  try {
    const ratepayer = await croipApi.ratepayers.getRatepayer(id)
    return NextResponse.json({ success: true, data: ratepayer })
  } catch (error) {
    console.error(`Failed to fetch ratepayer ${id} from Ratepayer Core service:`, error)
    const message = error instanceof Error ? error.message : 'Failed to fetch ratepayer'
    const status = message.includes('404') ? 404 : 500
    return NextResponse.json({ success: false, error: message }, { status })
  }
}
