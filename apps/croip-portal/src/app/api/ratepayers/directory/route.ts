import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

/**
 * Ratepayer directory proxy. Thin pass-through to ratepayer-service (:3030)
 * GET /v1/ratepayers/directory - paginated, searchable ratepayer list for the CROIP portal's
 * admin "Ratepayers" screens.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  try {
    const data = await croipApi.ratepayers.getDirectory({
      search: searchParams.get('search') || undefined,
      status: searchParams.get('status') || undefined,
      assemblyId: searchParams.get('assemblyId') || undefined,
      page: searchParams.get('page') ? Number(searchParams.get('page')) : undefined,
      pageSize: searchParams.get('pageSize') ? Number(searchParams.get('pageSize')) : undefined
    })
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Failed to fetch ratepayer directory from Ratepayer Core service:', error)
    const message = error instanceof Error ? error.message : 'Failed to fetch ratepayer directory'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
