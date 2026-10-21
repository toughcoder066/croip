import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { touchTokenSession } from '@/lib/token-store'

export const dynamic = 'force-dynamic'

/**
 * Reports the real signed-in session (set by Zitadel authentication) — no fabricated
 * fallback user. Callers guard on `authenticated && user` before reading fields.
 *
 * Enforces the inactivity timeout: checks the server-side token session — if it has gone
 * idle (or the underlying tokens were revoked/rejected on refresh), this reports
 * logged-out and clears the cookie.
 */
export async function GET() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('croip_session')

  if (!sessionCookie?.value) {
    return NextResponse.json({ authenticated: false, user: null })
  }

  try {
    let raw = sessionCookie.value
    if (raw.startsWith('%')) {
      try {
        raw = decodeURIComponent(raw)
      } catch {}
    }
    const session = JSON.parse(raw)
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
