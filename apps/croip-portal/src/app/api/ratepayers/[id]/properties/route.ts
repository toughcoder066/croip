import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

interface RouteProps {
  params: Promise<{ id: string }>
}

/**
 * Linked properties proxy for a single ratepayer.
 * Thin pass-through to ratepayer-service (:3030) GET /v1/ratepayers/:id/properties -
 * every property-ratepayer link across any MMDA for this ratepayer.
 */
export async function GET(_request: Request, { params }: RouteProps) {
  const { id } = await params

  try {
    const properties = await croipApi.ratepayers.getRatepayerProperties(id)
    return NextResponse.json({ success: true, data: properties })
  } catch (error) {
    console.error(`Failed to fetch linked properties for ratepayer ${id}:`, error)
    return NextResponse.json({ success: false, error: 'Failed to fetch ratepayer properties' }, { status: 500 })
  }
}
