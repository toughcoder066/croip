import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

interface RouteProps {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: RouteProps) {
  try {
    const { id } = await params
    const user = await croipApi.governance.getUser(id)
    return NextResponse.json({ success: true, data: user })
  } catch (error: any) {
    console.error('Failed to fetch user from platform governance:', error)
    const message = error.message || 'Failed to fetch user'
    const notFound = /404|not found/i.test(message)
    return NextResponse.json({ success: false, error: message }, { status: notFound ? 404 : 500 })
  }
}

export async function POST(request: Request, { params }: RouteProps) {
  try {
    const { id } = await params
    const body = await request.json().catch(() => ({}))

    if (body?.action !== 'resend-invite') {
      return NextResponse.json({ success: false, error: "Unknown action — expected { action: 'resend-invite' }" }, { status: 400 })
    }

    const updated = await croipApi.governance.resendInvite(id)
    return NextResponse.json({ success: true, data: updated })
  } catch (error: any) {
    console.error('Failed to resend invite:', error)
    return NextResponse.json({ success: false, error: error.message || 'Failed to resend invite' }, { status: 500 })
  }
}
