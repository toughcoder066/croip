import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

/**
 * Register batch of landed properties proxy.
 * Thin pass-through to property-registry-service (:3020) POST /v1/properties/batch.
 * Allowed for partner concessionaires within their assigned MMDA territory.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const properties = Array.isArray(body) ? body : body.properties
    if (!Array.isArray(properties) || properties.length === 0) {
      return NextResponse.json(
        { success: false, error: 'A non-empty properties array is required for batch registration' },
        { status: 400 }
      )
    }

    const authHeader = request.headers.get('authorization')
    const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined

    const result = await croipApi.propertyRegistry.createPropertiesBatch(properties, { accessToken })
    return NextResponse.json({ success: true, data: result }, { status: 201 })
  } catch (error: any) {
    console.error('Failed to create batch properties in Property Registry service:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create batch properties' },
      { status: 400 }
    )
  }
}
