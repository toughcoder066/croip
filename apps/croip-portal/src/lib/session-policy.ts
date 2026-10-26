/**
 * Shared between `proxy.ts` (Edge runtime — can't import `token-store.ts`, which pulls in
 * `node:crypto`) and `token-store.ts` (Node runtime), so the two enforcement points can
 * never disagree on how long "idle" means. Kept here, not duplicated, on purpose: they did
 * disagree once already — see the comment on IDLE_TIMEOUT_MS's use in proxy.ts.
 */
export const IDLE_TIMEOUT_MS = 5 * 60 * 1000
