import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

interface RouteProps {
  params: Promise<{ id: string; propertyId: string }>
}

/**
 * Sever the link between a ratepayer and an individual property.
 * Thin pass-through to ratepayer-service (:3030) DELETE /v1/ratepayers/:id/properties/:propertyId.
 */
export async function DELETE(_request: Request, { params }: RouteProps) {
  const { id, propertyId } = await params

  try {
    const result = await croipApi.ratepayers.severPropertyLink(id, propertyId)
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error(`Failed to sever property link (${propertyId}) for ratepayer ${id}:`, error)
    const message = error instanceof Error ? error.message : 'Failed to sever property link'
    const status = message.includes('404') ? 404 : 400
    return NextResponse.json({ success: false, error: message }, { status })
  }
}
