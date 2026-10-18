import { NextResponse } from 'next/server'

import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

/**
 * Proxy to Shared Services' GIS boundary module: `GET/POST /v1/assemblies`.
 * This is a SEPARATE dataset from the legacy flat `/v1/reference-data?category=assembly`
 * configuration endpoint (see /configuration/assemblies) — assemblies here carry an
 * optional `polygonGeoJson` boundary and are scoped to a region by `regionId`.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const regionId = searchParams.get('regionId') || undefined

    const assemblies = await croipApi.geo.listAssemblies(regionId)

    return NextResponse.json({ success: true, data: assemblies })
  } catch (error: any) {
    console.error('Failed to fetch assemblies from Shared Services (geo module):', error)

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch assemblies' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { regionId, code, name, category, polygonGeoJson } = body

    if (!regionId || !code || !name) {
      return NextResponse.json(
        { success: false, error: 'regionId, code, and name are required' },
        { status: 400 }
      )
    }

    const assembly = await croipApi.geo.createAssembly({ regionId, code, name, category, polygonGeoJson })

    return NextResponse.json({ success: true, data: assembly }, { status: 201 })
  } catch (error: any) {
    console.error('Failed to create assembly in Shared Services (geo module):', error)

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create assembly' },
      { status: 500 }
    )
  }
}
