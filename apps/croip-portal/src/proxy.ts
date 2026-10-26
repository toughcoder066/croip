import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { IDLE_TIMEOUT_MS } from '@/lib/session-policy'

const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7 // 7 days — a ceiling, not the real session length; see below.
}

/**
 * Parses the cookie's own `lastActivityAt` and reports whether it's stale — this is the
 * actual idle-timeout enforcement point. It used to live only in token-store.ts's
 * touchTokenSession(), which is lazy: it's only called from inside fetchCroipService, so a
 * page that doesn't happen to fetch anything from a backend service never triggered it,
 * and the cookie's own 7-day maxAge kept the browser presenting a "logged in" cookie far
 * past the 5 minutes anyone actually intended. Enforcing it here, on every matched
 * request, closes that gap — this now the source of truth for "is this session still
 * alive"; token-store.ts's own idle check becomes a secondary backstop for direct API
 * calls that happen to race a request already in flight.
 */
function parseSession(cookieValue: string | undefined): { lastActivityAt?: number; [key: string]: unknown } | null {
  if (!cookieValue) return null
  try {
    let raw = cookieValue
    if (raw.startsWith('%')) raw = decodeURIComponent(raw)
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow static files, internal next files, and public routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/api/auth/oauth') ||
    pathname === '/api/auth/login' ||
    pathname === '/api/auth/logout' ||
    pathname === '/api/auth/me' ||
    pathname.startsWith('/api/uploads')
  ) {
    return NextResponse.next()
  }

  const sessionCookie = request.cookies.get('croip_session')
  const session = parseSession(sessionCookie?.value)

  // A cookie written before this check existed has no lastActivityAt — treat that as
  // "just became active now" (starts the clock) rather than an instant logout, so
  // enabling this doesn't abruptly kick someone who was in the middle of a session
  // through no fault of their own inactivity.
  const lastActivityAt = typeof session?.lastActivityAt === 'number' ? session.lastActivityAt : Date.now()
  const isIdleExpired = Date.now() - lastActivityAt > IDLE_TIMEOUT_MS
  const hasSession = Boolean(session) && !isIdleExpired

  // Login page handling
  if (pathname === '/login') {
    const reason = request.nextUrl.searchParams.get('reason')
    // If the officer already has an active session and isn't arriving with a kick/logout reason, go to dashboard
    if (!reason && hasSession) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // Protected API routes: return 401 JSON so client-side fetch handles the redirect
  if (pathname.startsWith('/api')) {
    if (!hasSession) {
      const response = NextResponse.json(
        { error: 'Unauthorized', authenticated: false, message: 'Session expired or removed due to inactivity.' },
        { status: 401 }
      )
      if (session) response.cookies.delete('croip_session')
      return response
    }
    const response = NextResponse.next()
    response.cookies.set('croip_session', JSON.stringify({ ...session, lastActivityAt: Date.now() }), SESSION_COOKIE_OPTIONS)
    return response
  }

  // Protected Page routes: redirect immediately to /login
  if (!hasSession) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('reason', 'session_expired')
    loginUrl.searchParams.set('returnTo', pathname + request.nextUrl.search)
    const response = NextResponse.redirect(loginUrl)
    if (session) response.cookies.delete('croip_session')
    return response
  }

  const response = NextResponse.next()
  response.cookies.set('croip_session', JSON.stringify({ ...session, lastActivityAt: Date.now() }), SESSION_COOKIE_OPTIONS)
  return response
}

export default proxy

export const config = {
  matcher: [
    /*
     * Match all request paths except static files and images
     */
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ]
}
