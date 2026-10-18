import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { ZITADEL_ISSUER } from '@/lib/zitadel'

export type SocialProviderId = 'google' | 'microsoft' | 'github' | 'apple'

export interface SocialConnectionItem {
  id: SocialProviderId
  name: string
  subtitle: string
  isConnected: boolean
  accountEmail?: string | null
  connectedAt?: string | null
  idpType: 'OIDC_FEDERATED'

  /** Needed to target Zitadel's RemoveMyLinkedIDP call — not meaningful otherwise. */
  idpId?: string
  linkedUserId?: string
}

const PROVIDER_LABELS: Record<SocialProviderId, { name: string; subtitle: string }> = {
  google: { name: 'Google', subtitle: 'Government Google accounts & 1-click single sign-on' },
  microsoft: {
    name: 'Microsoft 365',
    subtitle: 'Enterprise public sector directory & government Active Directory'
  },
  github: { name: 'GitHub', subtitle: 'Technical platform oversight & developer identity' },
  apple: { name: 'Apple', subtitle: 'Biometric passkey & secure enclave hardware authentication' }
}

async function getSessionAccessToken(): Promise<string | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('croip_session')

  if (!sessionCookie?.value) return null

  try {
    const session = JSON.parse(sessionCookie.value)

    return typeof session.zitadelAccessToken === 'string' ? session.zitadelAccessToken : null
  } catch {
    return null
  }
}

/**
 * Matches a Zitadel IDP link's provider name against our four known providers. Zitadel
 * names are whatever the admin typed when configuring the federated IDP in its console
 * (e.g. "Google"), so this matches loosely rather than relying on an exact ID scheme.
 */
function matchProvider(idpName: string): SocialProviderId | null {
  const lower = idpName.toLowerCase()

  if (lower.includes('google')) return 'google'
  if (lower.includes('microsoft') || lower.includes('azure') || lower.includes('365')) return 'microsoft'
  if (lower.includes('github')) return 'github'
  if (lower.includes('apple')) return 'apple'

  return null
}

/**
 * Real linked-identity status, read from Zitadel's Auth API (the current user's own
 * linked external IDPs) rather than a fake in-memory toggle.
 */
export async function GET() {
  const base: Record<SocialProviderId, SocialConnectionItem> = {
    google: { id: 'google', ...PROVIDER_LABELS.google, isConnected: false, idpType: 'OIDC_FEDERATED' },
    microsoft: { id: 'microsoft', ...PROVIDER_LABELS.microsoft, isConnected: false, idpType: 'OIDC_FEDERATED' },
    github: { id: 'github', ...PROVIDER_LABELS.github, isConnected: false, idpType: 'OIDC_FEDERATED' },
    apple: { id: 'apple', ...PROVIDER_LABELS.apple, isConnected: false, idpType: 'OIDC_FEDERATED' }
  }

  const accessToken = await getSessionAccessToken()

  if (!accessToken) {
    return NextResponse.json({ success: true, providers: Object.values(base) })
  }

  try {
    const res = await fetch(`${ZITADEL_ISSUER}/auth/v1/users/me/idps/_search`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })

    if (!res.ok) {
      console.warn('[croip-portal] Zitadel linked-IDP lookup failed:', res.status, await res.text())

      return NextResponse.json({ success: true, providers: Object.values(base) })
    }

    const data = await res.json()

    const links: Array<{
      idpId?: string
      idpName?: string
      userId?: string
      userDisplayName?: string
      changeDate?: string
    }> = data.result || []

    for (const link of links) {
      const providerId = link.idpName ? matchProvider(link.idpName) : null

      if (!providerId) continue

      base[providerId] = {
        ...base[providerId],
        isConnected: true,
        accountEmail: link.userDisplayName || null,
        connectedAt: link.changeDate || null,
        idpId: link.idpId,
        linkedUserId: link.userId
      }
    }
  } catch (err) {
    console.warn('[croip-portal] Could not reach Zitadel for linked-IDP status:', err)
  }

  return NextResponse.json({ success: true, providers: Object.values(base) })
}

/** Disconnect only — "Connect" goes through the popup-based link flow instead. */
export async function POST(request: Request) {
  const body = await request.json()

  const { provider, action, idpId, linkedUserId } = body as {
    provider?: SocialProviderId
    action?: 'disconnect'
    idpId?: string
    linkedUserId?: string
  }

  if (action !== 'disconnect') {
    return NextResponse.json({ error: 'Unsupported action' }, { status: 400 })
  }

  if (!provider || !idpId || !linkedUserId) {
    return NextResponse.json({ error: 'Missing idpId/linkedUserId for this provider' }, { status: 400 })
  }

  const accessToken = await getSessionAccessToken()

  if (!accessToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const res = await fetch(`${ZITADEL_ISSUER}/auth/v1/users/me/idps/${idpId}/${linkedUserId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${accessToken}` }
    })

    if (!res.ok) {
      console.warn('[croip-portal] Zitadel RemoveMyLinkedIDP failed:', res.status, await res.text())

      return NextResponse.json({ error: 'Failed to disconnect provider' }, { status: 502 })
    }

    return NextResponse.json({ success: true, provider })
  } catch (err) {
    console.error('[croip-portal] Zitadel RemoveMyLinkedIDP request failed:', err)

    return NextResponse.json({ error: 'Network error disconnecting provider' }, { status: 500 })
  }
}
