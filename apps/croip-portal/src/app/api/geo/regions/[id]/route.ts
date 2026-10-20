import { NextResponse } from 'next/server'

import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

interface RouteProps {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: RouteProps) {
  try {
    const { id } = await params
    const region = await croipApi.geo.getRegion(id)

    return NextResponse.json({ success: true, data: region })
  } catch (error: any) {
    console.error('Failed to get region from Shared Services:', error)

    const notFound = /404|not found/i.test(error.message || '')

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to get region' },
      { status: notFound ? 404 : 500 }
    )
  }
}

export async function PATCH(request: Request, { params }: RouteProps) {
  try {
    const { id } = await params
    const body = await request.json()
    const { code, name, polygonGeoJson } = body

    const updated = await croipApi.geo.updateRegion(id, { code, name, polygonGeoJson })

    return NextResponse.json({ success: true, data: updated })
  } catch (error: any) {
    console.error('Failed to update region in Shared Services:', error)

    const notFound = /404|not found/i.test(error.message || '')

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update region' },
      { status: notFound ? 404 : 500 }
    )
  }
}
