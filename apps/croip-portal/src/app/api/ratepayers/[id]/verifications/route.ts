import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

interface RouteProps {
  params: Promise<{ id: string }>
}

/**
 * Submit or dummy-verify KYC for a ratepayer.
 * Thin pass-through to ratepayer-service (:3030) POST /v1/ratepayers/:id/verifications.
 */
export async function POST(request: Request, { params }: RouteProps) {
  const { id } = await params

  try {
    let body: any = {}
    try {
      body = await request.json()
    } catch {
      // Allow empty body for default dummy verification
      body = {}
    }

    const verification = await croipApi.ratepayers.verifyKyc(id, body)
    return NextResponse.json({ success: true, data: verification }, { status: 201 })
  } catch (error) {
    console.error(`Failed to verify KYC for ratepayer ${id}:`, error)
    const message = error instanceof Error ? error.message : 'Failed to verify KYC'
    return NextResponse.json({ success: false, error: message }, { status: 400 })
  }
}
