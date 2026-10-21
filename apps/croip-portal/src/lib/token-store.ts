import { randomUUID } from 'node:crypto'

import { ZITADEL_CLIENT_ID, ZITADEL_ISSUER } from './zitadel'

/**
 * Real Zitadel access/ID tokens — especially the access token, once it carries the
 * user's full project-role claim set — easily run past 4-6KB. Browsers silently refuse
 * to set any single cookie above ~4096 bytes, so they can never live in the
 * `croip_session` cookie directly (that cookie also carries the lightweight profile
 * fields consumers read on every page, which must stay small and readable without a
 * store lookup). Instead, only a short session ID goes in the cookie; the actual
 * tokens live here, server-side, keyed by that ID.
 *
 * Sessions end on INACTIVITY, not on the access token's own short lifetime: every call
 * to touchTokenSession() (i.e. every real API call made through croip-api.ts) silently
 * renews the access token via the stored refresh token when it's close to expiring, and
 * bumps lastActivityAt. If nothing touches the session for IDLE_TIMEOUT_MS, the next
 * touch evicts it instead of refreshing — an idle officer is logged out even though
 * their browser cookie is technically still present.
 *
 * In-memory only — correct for this single-process dev server, but means sessions
 * don't survive a server restart (the cookie's sessionId stops resolving; treated the
 * same as "not logged in", not a crash) and wouldn't work un-modified behind multiple
 * server instances. A real deployment would swap this for Redis or a database table
 * keyed the same way.
 */
interface StoredTokens {
  accessToken: string
  idToken: string
  refreshToken: string | null
  expiresAt: number
  lastActivityAt: number
}

const IDLE_TIMEOUT_MS = 5 * 60 * 1000
const REFRESH_BUFFER_MS = 60 * 1000

const globalForTokens = globalThis as unknown as {
  tokenStore?: Map<string, StoredTokens>
}

const store = globalForTokens.tokenStore ?? new Map<string, StoredTokens>()

if (process.env.NODE_ENV !== 'production') {
  globalForTokens.tokenStore = store
}

export function createTokenSession(
  accessToken: string,
  idToken: string,
  expiresInSeconds: number,
  refreshToken: string | null = null
): string {
  const sessionId = randomUUID()
  const now = Date.now()

  store.set(sessionId, {
    accessToken,
    idToken,
    refreshToken,
    expiresAt: now + expiresInSeconds * 1000,
    lastActivityAt: now
  })

  return sessionId
}

async function refreshAccessToken(refreshToken: string): Promise<{
  accessToken: string
  idToken: string | null
  refreshToken: string | null
  expiresInSeconds: number
}> {
  const res = await fetch(`${ZITADEL_ISSUER}/oauth/v2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: ZITADEL_CLIENT_ID
    })
  })

  if (!res.ok) {
    throw new Error(`Zitadel refresh_token grant failed: ${res.status} ${await res.text()}`)
  }

  const data = (await res.json()) as { access_token: string; id_token?: string; refresh_token?: string; expires_in: number }

  return {
    accessToken: data.access_token,
    idToken: data.id_token ?? null,
    refreshToken: data.refresh_token ?? null,
    expiresInSeconds: data.expires_in
  }
}

/**
 * The one function everything that's about to make a real API call should use. Returns
 * null for "treat this as logged out" — either nothing's stored for this id, the
 * session has been idle past the timeout, or the refresh token itself was rejected
 * (expired/revoked). Otherwise silently refreshes a near-expiry access token and bumps
 * lastActivityAt, so an actively-used session never hits a dead token.
 */
export async function touchTokenSession(sessionId: string | undefined | null): Promise<StoredTokens | null> {
  if (!sessionId) return null

  const entry = store.get(sessionId)
  if (!entry) return null

  const now = Date.now()

  if (now - entry.lastActivityAt > IDLE_TIMEOUT_MS) {
    store.delete(sessionId)
    return null
  }

  if (now > entry.expiresAt - REFRESH_BUFFER_MS) {
    if (!entry.refreshToken) {
      store.delete(sessionId)
      return null
    }
    try {
      const refreshed = await refreshAccessToken(entry.refreshToken)
      entry.accessToken = refreshed.accessToken
      entry.idToken = refreshed.idToken ?? entry.idToken
      entry.refreshToken = refreshed.refreshToken ?? entry.refreshToken
      entry.expiresAt = now + refreshed.expiresInSeconds * 1000
    } catch {
      store.delete(sessionId)
      return null
    }
  }

  entry.lastActivityAt = now
  return entry
}

/** Reads the stored ID token without affecting idle/refresh state — only for the
 * RP-initiated logout URL, where the session is being torn down either way. */
export function peekIdToken(sessionId: string | undefined | null): string | null {
  if (!sessionId) return null
  return store.get(sessionId)?.idToken ?? null
}

export function deleteTokenSession(sessionId: string | undefined | null): void {
  if (sessionId) store.delete(sessionId)
}
