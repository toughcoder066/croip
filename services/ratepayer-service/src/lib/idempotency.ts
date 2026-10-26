import crypto from 'node:crypto';
import type { FastifyInstance } from 'fastify';
import { ConflictError } from './errors.js';

// How long a completed registration's cached response stays replayable — long enough to
// cover a realistic "field agent was offline for a few days, then syncs" window, without
// keeping every idempotency record around forever.
const IDEMPOTENCY_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export interface IdempotentResult<T> {
  status: number;
  body: T;
  replayed: boolean;
}

/**
 * Makes a mutating call safe to retry under a flaky or offline-then-reconnecting
 * connection — the exact situation a concession's field agent is in when they register a
 * ratepayer with no signal and the request has to sync (and possibly re-sync, if the first
 * sync attempt's response never made it back) once connectivity returns. The caller
 * supplies a key it generated once, locally, at the moment the ratepayer was originally
 * captured offline — never regenerated per sync attempt, or this provides no protection.
 *
 * Race-safe for two concurrent retries of the same key (e.g. the agent's app re-sending
 * before the first attempt's response arrives): the INSERT itself is the concurrency
 * guard — Postgres's unique constraint on (concessionId, idempotencyKey) means only one
 * concurrent caller can ever win it and go on to run `handler`; everyone else sees it
 * already exists and either replays the finished response or is told to retry shortly.
 */
export async function withIdempotency<T>(
  app: FastifyInstance,
  input: { concessionId: string; idempotencyKey: string; requestBody: unknown },
  handler: () => Promise<{ status: number; body: T }>
): Promise<IdempotentResult<T>> {
  const requestHash = crypto.createHash('sha256').update(JSON.stringify(input.requestBody)).digest('hex');
  const where = { concessionId_idempotencyKey: { concessionId: input.concessionId, idempotencyKey: input.idempotencyKey } };

  try {
    // Claim the key before doing anything else — this row existing at all (regardless of
    // whether responseStatus is filled in yet) is what stops a second, concurrent caller
    // from also running `handler`.
    await app.prisma.idempotencyRecord.create({
      data: {
        concessionId: input.concessionId,
        idempotencyKey: input.idempotencyKey,
        requestHash,
        expiresAt: new Date(Date.now() + IDEMPOTENCY_TTL_MS)
      }
    });
  } catch (error: any) {
    if (error.code !== 'P2002') throw error;

    const existing = await app.prisma.idempotencyRecord.findUnique({ where });
    if (!existing) throw error;
    if (existing.requestHash !== requestHash) {
      throw new ConflictError('This idempotency key was already used for a different request — generate a new one for a genuinely new registration');
    }
    if (existing.responseStatus === null) {
      throw new ConflictError('A request with this idempotency key is still being processed — retry shortly');
    }
    return { status: existing.responseStatus, body: existing.responseBody as T, replayed: true };
  }

  // We won the race — we're the one actually performing the operation. If it throws,
  // release the claim so a genuine retry (not a duplicate) can still go through instead of
  // being stuck behind a placeholder that will never complete.
  let result: { status: number; body: T };
  try {
    result = await handler();
  } catch (error) {
    await app.prisma.idempotencyRecord.delete({ where }).catch(() => {});
    throw error;
  }

  await app.prisma.idempotencyRecord.update({
    where,
    data: { responseStatus: result.status, responseBody: result.body as any }
  });

  return { ...result, replayed: false };
}
