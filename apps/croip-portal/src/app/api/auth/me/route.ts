import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { touchTokenSession } from '@/lib/token-store'

export const dynamic = 'force-dynamic'

/**
 * Reports the real signed-in session (set by the Zitadel OIDC callback) — no fabricated
 * fallback user. Callers already guard on `authenticated && user` before reading fields.
 *
 * Also enforces the inactivity timeout: the cookie alone only proves a login happened
 * at some point in the last 7 days, so this checks the server-side token session too —
 * if it's gone idle (or the underlying tokens were revoked/rejected on refresh), this
 * reports logged-out and clears the cookie, rather than letting the UI believe the
 * officer is still signed in while every real API call would 401.
 */
export async function GET() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('croip_session')

  if (!sessionCookie?.value) {
    return NextResponse.json({ authenticated: false, user: null })
  }

  try {
    const session = JSON.parse(sessionCookie.value)
    const tokens = await touchTokenSession(session.tokenSessionId)

    if (!tokens) {
      cookieStore.delete('croip_session')
      return NextResponse.json({ authenticated: false, user: null })
    }

    // The token session ID stays server-side only — the browser never needs it directly.
    delete session.tokenSessionId

    return NextResponse.json({ authenticated: true, user: session })
  } catch {
    return NextResponse.json({ authenticated: false, user: null })
  }
}
