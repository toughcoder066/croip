import { NextResponse } from 'next/server'

import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

interface RouteProps {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: RouteProps) {
  try {
    const { id } = await params
    const concession = await croipApi.governance.getConcession(id)

    return NextResponse.json({ success: true, data: concession })
  } catch (error: any) {
    console.error('Failed to fetch concession from platform governance:', error)

    const notFound = /404|not found/i.test(error.message || '')

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch concession from platform governance service' },
      { status: notFound ? 404 : 500 }
    )
  }
}

export async function POST(request: Request, { params }: RouteProps) {
  try {
    const { id } = await params
    const body = await request.json().catch(() => ({}))

    if (body?.action !== 'deactivate') {
      return NextResponse.json({ success: false, error: "Unknown action — expected { action: 'deactivate' }" }, { status: 400 })
    }

    const concession = await croipApi.governance.deactivateConcession(id)

    return NextResponse.json({ success: true, data: concession })
  } catch (error: any) {
    console.error('Failed to deactivate concession:', error)

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to deactivate concession' },
      { status: 500 }
    )
  }
}
