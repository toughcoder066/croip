import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

interface RouteProps {
  params: Promise<{ code: string }>
}

export async function PATCH(request: Request, { params }: RouteProps) {
  try {
    const { code } = await params
    const body = await request.json()
    const { status, resolution } = body

    if (!status) {
      return NextResponse.json({ success: false, error: 'status is required' }, { status: 400 })
    }

    const updated = await croipApi.disputes.updateStatus(code, { status, resolution })
    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error('Failed to update dispute status:', error)
    const message = error instanceof Error ? error.message : 'Failed to update dispute status'
    const status = /400/.test(message) ? 400 : /409/.test(message) ? 409 : /404/.test(message) ? 404 : 500
    return NextResponse.json({ success: false, error: message }, { status })
  }
}
