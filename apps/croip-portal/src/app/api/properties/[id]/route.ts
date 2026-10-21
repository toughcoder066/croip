import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

interface RouteProps {
  params: Promise<{ id: string }>
}

/**
 * Property detail proxy. Thin pass-through to property-registry-service (:3020)
 * GET /v1/properties/:id - includes units, documents, and current valuations.
 */
export async function GET(_request: Request, { params }: RouteProps) {
  const { id } = await params

  try {
    const property = await croipApi.propertyRegistry.getProperty(id)
    return NextResponse.json({ success: true, data: property })
  } catch (error) {
    console.error(`Failed to fetch property ${id} from Property Registry service:`, error)
    const message = error instanceof Error ? error.message : 'Failed to fetch property'
    const status = message.includes('404') ? 404 : 500
    return NextResponse.json({ success: false, error: message }, { status })
  }
}

export async function PATCH(request: Request, { params }: RouteProps) {
  const { id } = await params

  try {
    const authHeader = request.headers.get('authorization')
    const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined
    const body = await request.json()
    const updated = await croipApi.propertyRegistry.updateProperty(id, body, { accessToken })
    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error(`Failed to update property ${id} in Property Registry service:`, error)
    const message = error instanceof Error ? error.message : 'Failed to update property'
    const status = message.includes('404') ? 404 : (message.includes('403') ? 403 : 400)
    return NextResponse.json({ success: false, error: message }, { status })
  }
}

export async function DELETE(_request: Request, { params }: RouteProps) {
  const { id } = await params

  try {
    const result = await croipApi.propertyRegistry.deleteProperty(id)
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error(`Failed to delete property ${id} from Property Registry service:`, error)
    const message = error instanceof Error ? error.message : 'Failed to delete property'
    const status = message.includes('paid bills') || message.includes('400') ? 400 : (message.includes('404') ? 404 : 500)
    return NextResponse.json({ success: false, error: message }, { status })
  }
}
