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
