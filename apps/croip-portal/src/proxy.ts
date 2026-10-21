import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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
  const hasSession = Boolean(sessionCookie?.value)

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
      return NextResponse.json(
        { error: 'Unauthorized', authenticated: false, message: 'Session expired or removed due to inactivity.' },
        { status: 401 }
      )
    }
    return NextResponse.next()
  }

  // Protected Page routes: redirect immediately to /login
  if (!hasSession) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('reason', 'session_expired')
    loginUrl.searchParams.set('returnTo', pathname + request.nextUrl.search)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
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
