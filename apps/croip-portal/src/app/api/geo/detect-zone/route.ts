import { NextResponse } from 'next/server'

import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

/**
 * Point-in-polygon lookup: `POST /v1/assemblies/detect-zone`.
 * Given a coordinate, returns which MMDA boundary (and its region) contains it,
 * or `{ matched: false }` when nothing drawn so far contains the point.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { latitude, longitude } = body

    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return NextResponse.json(
        { success: false, error: 'latitude and longitude (numbers) are required' },
        { status: 400 }
      )
    }

    const result = await croipApi.geo.detectZone(latitude, longitude)

    return NextResponse.json({ success: true, data: result })
  } catch (error: any) {
    console.error('Failed to detect zone via Shared Services (geo module):', error)

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to detect zone' },
      { status: 500 }
    )
  }
}
