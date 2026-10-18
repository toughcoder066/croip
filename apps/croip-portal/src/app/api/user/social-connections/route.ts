import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export type SocialProviderId = 'google' | 'microsoft' | 'github' | 'apple'

export interface SocialConnectionItem {
  id: SocialProviderId
  name: string
  subtitle: string
  isConnected: boolean
  accountEmail?: string | null
  connectedAt?: string | null
  idpType: 'OIDC_FEDERATED'
}

// In-memory fallback cache
const userConnectionsStore: Record<
  string,
  Record<SocialProviderId, { isConnected: boolean; email?: string; connectedAt?: string }>
> = {}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('croip_session')

    let userId = '0b18250a-a9fc-44c0-b26b-bf63b08ec310'
    let userEmail = 'superuser@croip.com'
    let savedConnections: Record<string, any> = {}

    if (sessionCookie?.value) {
      try {
        const parsed = JSON.parse(sessionCookie.value)
        if (parsed.id) userId = parsed.id
        if (parsed.email) userEmail = parsed.email
        if (parsed.socialConnections) savedConnections = parsed.socialConnections
      } catch {
        // fallback
      }
    }

    if (!userConnectionsStore[userId]) {
      userConnectionsStore[userId] = {
        google: { isConnected: false },
        microsoft: { isConnected: false },
        github: { isConnected: false },
        apple: { isConnected: false }
      }
    }

    // Merge persistent cookie state with cache
    if (Object.keys(savedConnections).length > 0) {
      userConnectionsStore[userId] = {
        ...userConnectionsStore[userId],
        ...savedConnections
      }
    }

    const current = userConnectionsStore[userId]

    const providers: SocialConnectionItem[] = [
      {
        id: 'google',
        name: 'Google',
        subtitle: 'Government Google accounts & 1-click single sign-on',
        isConnected: current.google?.isConnected ?? false,
        accountEmail: current.google?.email ?? null,
        connectedAt: current.google?.connectedAt ?? null,
        idpType: 'OIDC_FEDERATED'
      },
      {
        id: 'microsoft',
        name: 'Microsoft 365',
        subtitle: 'Enterprise public sector directory & government Active Directory',
        isConnected: current.microsoft?.isConnected ?? false,
        accountEmail: current.microsoft?.email ?? null,
        connectedAt: current.microsoft?.connectedAt ?? null,
        idpType: 'OIDC_FEDERATED'
      },
      {
        id: 'github',
        name: 'GitHub',
        subtitle: 'Technical platform oversight & developer identity',
        isConnected: current.github?.isConnected ?? false,
        accountEmail: current.github?.email ?? null,
        connectedAt: current.github?.connectedAt ?? null,
        idpType: 'OIDC_FEDERATED'
      },
      {
        id: 'apple',
        name: 'Apple',
        subtitle: 'Biometric passkey & secure enclave hardware authentication',
        isConnected: current.apple?.isConnected ?? false,
        accountEmail: current.apple?.email ?? null,
        connectedAt: current.apple?.connectedAt ?? null,
        idpType: 'OIDC_FEDERATED'
      }
    ]

    return NextResponse.json({
      success: true,
      userId,
      providers
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch social connections' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { provider, action, email } = body as {
      provider: SocialProviderId
      action: 'connect' | 'disconnect'
      email?: string
    }

    if (!provider || !['google', 'microsoft', 'github', 'apple'].includes(provider)) {
      return NextResponse.json({ error: 'Invalid provider specified' }, { status: 400 })
    }

    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('croip_session')
    let userId = '0b18250a-a9fc-44c0-b26b-bf63b08ec310'
    let userEmail = 'superuser@croip.com'
    let sessionUser: Record<string, any> = {
      id: userId,
      email: userEmail,
      fullName: 'CROIP Super Administrator'
    }

    if (sessionCookie?.value) {
      try {
        const parsed = JSON.parse(sessionCookie.value)
        sessionUser = { ...sessionUser, ...parsed }
        if (parsed.id) userId = parsed.id
        if (parsed.email) userEmail = parsed.email
      } catch {
        // fallback
      }
    }

    if (!userConnectionsStore[userId]) {
      userConnectionsStore[userId] = {
        google: { isConnected: false },
        microsoft: { isConnected: false },
        github: { isConnected: false },
        apple: { isConnected: false }
      }
    }

    // Merge cookie connections if available
    if (sessionUser.socialConnections) {
      userConnectionsStore[userId] = {
        ...userConnectionsStore[userId],
        ...sessionUser.socialConnections
      }
    }

    if (action === 'connect') {
      const defaultDomain =
        provider === 'github'
          ? 'users.noreply.github.com'
          : provider === 'google'
            ? 'gmail.com'
            : provider === 'apple'
              ? 'privaterelay.appleid.com'
              : 'croip.gov.gh'

      const assignedEmail = (email && email.trim()) || `${userEmail.split('@')[0]}@${defaultDomain}`

      userConnectionsStore[userId][provider] = {
        isConnected: true,
        email: assignedEmail,
        connectedAt: new Date().toISOString()
      }
    } else {
      userConnectionsStore[userId][provider] = {
        isConnected: false,
        email: undefined,
        connectedAt: undefined
      }
    }

    // Persist to session cookie so it stays connected across refreshes, routes, and browser restarts
    const updatedUser = {
      ...sessionUser,
      socialConnections: userConnectionsStore[userId]
    }

    cookieStore.set('croip_session', JSON.stringify(updatedUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return NextResponse.json({
      success: true,
      provider,
      status: userConnectionsStore[userId][provider]
    })
  } catch {
    return NextResponse.json({ error: 'Failed to update social connection' }, { status: 500 })
  }
}
