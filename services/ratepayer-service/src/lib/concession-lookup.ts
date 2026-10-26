import type { FastifyInstance } from 'fastify';

const CACHE_TTL_MS = 60 * 1000;

const cache = new Map<string, { name: string | null; fetchedAt: number }>();

// Ratepayers must never see any CROIP-branded name in an email, OTP message, or anywhere
// else — every outbound communication is white-labeled as the concession they actually
// deal with (see notification-dispatcher.ts). Self-registration already has the
// concession's name in hand from the by-code lookup at registration time; login and
// password-reset only ever have a stored concessionId, so they resolve it here instead,
// against platform-governance-service's public by-id lookup. Returns null (never throws)
// on any failure — the caller falls back to a neutral, non-CROIP label rather than letting
// a lookup hiccup block someone from signing in.
export async function resolveConcessionName(app: FastifyInstance, concessionId: string | null | undefined): Promise<string | null> {
  if (!concessionId) return null;

  const cached = cache.get(concessionId);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) return cached.name;

  try {
    const response = await fetch(`${app.config.PLATFORM_GOVERNANCE_URL}/v1/concessions/by-id/${encodeURIComponent(concessionId)}`);
    const name = response.ok ? ((await response.json()) as { name?: string }).name ?? null : null;
    cache.set(concessionId, { name, fetchedAt: Date.now() });
    return name;
  } catch (error) {
    app.log.warn({ err: error, concessionId }, 'failed to resolve concession name for email white-labeling');
    return null;
  }
}
