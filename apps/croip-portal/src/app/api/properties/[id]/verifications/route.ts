import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

interface RouteProps {
  params: Promise<{ id: string }>
}

/**
 * Field verifications proxy for a single property.
 * Thin pass-through to property-registry-service (:3020) GET /v1/properties/:id/verifications.
 */
export async function GET(_request: Request, { params }: RouteProps) {
  const { id } = await params

  try {
    const verifications = await croipApi.propertyRegistry.listVerifications(id)
    return NextResponse.json({ success: true, data: verifications })
  } catch (error) {
    console.error(`Failed to fetch verifications for property ${id}:`, error)
    return NextResponse.json({ success: false, error: 'Failed to fetch property verifications' }, { status: 500 })
  }
}
