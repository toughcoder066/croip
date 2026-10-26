import { NextResponse } from 'next/server'

import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

interface RouteProps {
  params: Promise<{ id: string }>
}

/** Never includes secrets — those are shown once, at provisioning time, below. */
export async function GET(_request: Request, { params }: RouteProps) {
  try {
    const { id } = await params
    const clients = await croipApi.governance.getApiClients(id)

    return NextResponse.json({ success: true, data: clients })
  } catch (error: any) {
    console.error('Failed to fetch API clients:', error)

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch API clients' },
      { status: 500 }
    )
  }
}

/**
 * Rotates (default) or revokes a concession's machine-to-machine API client.
 *
 * A concession can only ever have one ACTIVE credential — onboarding provisions the
 * first one automatically, so every call here afterward is a rotate-away-the-old-one or
 * a bare revoke, never an additive "provision another". `clientSecret` in a rotate
 * response is the unhashed secret and is returned by the governance service exactly
 * once — it is never stored or retrievable again. The caller (the one-time-reveal
 * dialog) is responsible for showing it and never persisting it anywhere beyond the
 * user's clipboard.
 */
export async function POST(request: Request, { params }: RouteProps) {
  try {
    const { id } = await params
    const body = await request.json().catch(() => ({}))
    const action = body?.action ?? 'rotate'

    if (action === 'revoke') {
      const revoked = await croipApi.governance.revokeApiClient(id)

      return NextResponse.json({ success: true, data: revoked })
    }

    if (action !== 'rotate') {
      return NextResponse.json({ success: false, error: "Unknown action — expected { action: 'rotate' } or { action: 'revoke' }" }, { status: 400 })
    }

    const credentials = await croipApi.governance.rotateApiClient(id)

    return NextResponse.json({ success: true, data: credentials }, { status: 201 })
  } catch (error: any) {
    console.error('Failed to rotate/revoke API client for concession:', error)

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to rotate/revoke API client' },
      { status: 500 }
    )
  }
}
