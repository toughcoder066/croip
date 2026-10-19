import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

/**
 * Reports the real signed-in session (set by the Zitadel OIDC callback) — no fabricated
 * fallback user. Callers already guard on `authenticated && user` before reading fields.
 */
export async function GET() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('croip_session')

  if (!sessionCookie?.value) {
    return NextResponse.json({ authenticated: false, user: null })
  }

  try {
    const session = JSON.parse(sessionCookie.value)

    // The token session ID stays server-side only — the browser never needs it directly.
    delete session.tokenSessionId

    return NextResponse.json({ authenticated: true, user: session })
  } catch {
    return NextResponse.json({ authenticated: false, user: null })
  }
}
