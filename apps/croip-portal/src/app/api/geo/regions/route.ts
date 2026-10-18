import { NextResponse } from 'next/server'

import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

/**
 * Proxy to Shared Services' GIS boundary module: `GET/POST /v1/regions`.
 * This is a SEPARATE dataset from the legacy flat `/v1/reference-data?category=region`
 * configuration endpoint — regions here carry an optional `polygonGeoJson` boundary.
 */
export async function GET() {
  try {
    const regions = await croipApi.geo.listRegions()

    return NextResponse.json({ success: true, data: regions })
  } catch (error: any) {
    console.error('Failed to fetch regions from Shared Services (geo module):', error)

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch regions' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { code, name, polygonGeoJson } = body

    if (!code || !name) {
      return NextResponse.json({ success: false, error: 'Code and name are required' }, { status: 400 })
    }

    const region = await croipApi.geo.createRegion({ code, name, polygonGeoJson })

    return NextResponse.json({ success: true, data: region }, { status: 201 })
  } catch (error: any) {
    console.error('Failed to create region in Shared Services (geo module):', error)

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create region' },
      { status: 500 }
    )
  }
}
