import { NextResponse } from 'next/server'

import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

interface RouteProps {
  params: Promise<{ id: string }>
}

/**
 * Draw or replace an MMDA's boundary polygon: `PATCH /v1/assemblies/:id/boundary`.
 */
export async function PATCH(request: Request, { params }: RouteProps) {
  try {
    const { id } = await params
    const body = await request.json()
    const { polygonGeoJson } = body

    if (!polygonGeoJson || typeof polygonGeoJson !== 'object') {
      return NextResponse.json({ success: false, error: 'polygonGeoJson is required' }, { status: 400 })
    }

    const assembly = await croipApi.geo.updateAssemblyBoundary(id, polygonGeoJson)

    return NextResponse.json({ success: true, data: assembly })
  } catch (error: any) {
    console.error('Failed to update assembly boundary in Shared Services (geo module):', error)

    const notFound = /404|not found/i.test(error.message || '')

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update assembly boundary' },
      { status: notFound ? 404 : 500 }
    )
  }
}
