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
 * Provisions a new machine-to-machine API client for a concession.
 *
 * `clientSecret` in the response is the unhashed secret and is returned by the
 * governance service exactly once — it is never stored or retrievable again. The
 * caller (the one-time-reveal dialog) is responsible for showing it and never
 * persisting it anywhere beyond the user's clipboard.
 */
export async function POST(_request: Request, { params }: RouteProps) {
  try {
    const { id } = await params
    const credentials = await croipApi.governance.provisionApiClient(id)

    return NextResponse.json({ success: true, data: credentials }, { status: 201 })
  } catch (error: any) {
    console.error('Failed to provision API client for concession:', error)

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to provision API client' },
      { status: 500 }
    )
  }
}
