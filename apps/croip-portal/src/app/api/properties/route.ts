import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

/**
 * Property Registry list proxy.
 * Thin pass-through to property-registry-service (:3020) GET /v1/properties.
 * The browser never calls the microservice directly - see AGENTS.md ingestion rule.
 */
export async function GET() {
  try {
    const properties = await croipApi.propertyRegistry.getProperties()
    return NextResponse.json({ success: true, data: properties })
  } catch (error) {
    console.error('Failed to fetch properties from Property Registry service:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch properties' }, { status: 500 })
  }
}
