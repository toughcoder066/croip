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

/**
 * Register landed property parcel proxy.
 * Thin pass-through to property-registry-service (:3020) POST /v1/properties.
 * Forwards Bearer token from Ratepayer session or Zitadel staff session.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const authHeader = request.headers.get('authorization')
    const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined

    const property = await croipApi.propertyRegistry.createProperty(body, { accessToken })
    return NextResponse.json({ success: true, data: property }, { status: 201 })
  } catch (error: any) {
    console.error('Failed to register property in Property Registry service:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to register property' },
      { status: 400 }
    )
  }
}
