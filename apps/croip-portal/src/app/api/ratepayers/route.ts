import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

/**
 * Ratepayer registration endpoint.
 * CROIP administrators are prohibited from adding ratepayers — citizens and corporate
 * ratepayers must register themselves via citizen self-service.
 */
export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: 'CROIP administrators cannot add ratepayers. Ratepayers must register themselves via citizen self-service.'
    },
    { status: 403 }
  )
}


/**
 * Ratepayer directory proxy.
 * Calls ratepayer-service (:3030) GET /v1/ratepayers/directory
 */
export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const search = url.searchParams.get('search') || undefined
    const status = url.searchParams.get('status') || undefined
    const assemblyId = url.searchParams.get('assemblyId') || undefined
    const page = url.searchParams.get('page') ? Number(url.searchParams.get('page')) : undefined
    const pageSize = url.searchParams.get('pageSize') ? Number(url.searchParams.get('pageSize')) : undefined

    const directory = await croipApi.ratepayers.getDirectory({ search, status, assemblyId, page, pageSize })
    return NextResponse.json({ success: true, data: directory })
  } catch (error) {
    console.error('Failed to fetch ratepayer directory:', error)
    const message = error instanceof Error ? error.message : 'Failed to fetch directory'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
