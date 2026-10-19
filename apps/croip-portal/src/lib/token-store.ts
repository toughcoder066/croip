import { randomUUID } from 'node:crypto'

/**
 * Real Zitadel access/ID tokens — especially the access token, once it carries the
 * user's full project-role claim set — easily run past 4-6KB. Browsers silently refuse
 * to set any single cookie above ~4096 bytes, so they can never live in the
 * `croip_session` cookie directly (that cookie also carries the lightweight profile
 * fields consumers read on every page, which must stay small and readable without a
 * store lookup). Instead, only a short session ID goes in the cookie; the actual
 * tokens live here, server-side, keyed by that ID.
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
  expiresAt: number
}

const store = new Map<string, StoredTokens>()

export function createTokenSession(accessToken: string, idToken: string, expiresInSeconds: number): string {
  const sessionId = randomUUID()

  store.set(sessionId, {
    accessToken,
    idToken,
    expiresAt: Date.now() + expiresInSeconds * 1000
  })

  return sessionId
}

export function getTokenSession(sessionId: string | undefined | null): StoredTokens | null {
  if (!sessionId) return null

  const entry = store.get(sessionId)

  if (!entry) return null

  if (Date.now() > entry.expiresAt) {
    store.delete(sessionId)

    return null
  }

  return entry
}

export function deleteTokenSession(sessionId: string | undefined | null): void {
  if (sessionId) store.delete(sessionId)
}
