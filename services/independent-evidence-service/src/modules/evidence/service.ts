import type { FastifyInstance } from 'fastify';
import { domainEvent } from '../../events/envelope.js';
import { appendOutboxEvent } from '../../events/outbox.js';
import { NotFoundError } from '../../lib/errors.js';

export interface ProviderEvidenceInput {
  providerId: string;
  providerRef: string;
  channel: string;
  currency?: string;
  grossMinor: number;
  feeMinor?: number;
  netMinor: number;
  paymentTime: string;
  declaredOutcome?: string;
  accountRef?: string;
  rawFeed: Record<string, unknown>;
}

export interface ControlTotalInput {
  authorityCode: string;
  periodStart: string;
  periodEnd: string;
  transactionCount: number;
  totalAmountMinor: number;
  manifestRef: string;
}

export function evidenceService(app: FastifyInstance) {
  return {
    async ingestProviderEvidence(input: ProviderEvidenceInput, actorId: string, correlationId: string) {
      return app.prisma.$transaction(async (tx) => {
        const existing = await tx.providerEvidence.findUnique({
          where: { providerId_providerRef: { providerId: input.providerId, providerRef: input.providerRef } }
        });

        if (existing) {
          return {
            id: existing.id,
            providerId: existing.providerId,
            providerRef: existing.providerRef,
            channel: existing.channel,
            grossMinor: Number(existing.grossMinor),
            declaredOutcome: existing.declaredOutcome,
            createdAt: existing.createdAt.toISOString()
          };
        }

        const evidence = await tx.providerEvidence.create({
          data: {
            providerId: input.providerId,
            providerRef: input.providerRef,
            channel: input.channel,
            currency: input.currency ?? 'GHS',
            grossMinor: BigInt(input.grossMinor),
            feeMinor: BigInt(input.feeMinor ?? 0),
            netMinor: BigInt(input.netMinor),
            paymentTime: new Date(input.paymentTime),
            declaredOutcome: input.declaredOutcome ?? 'CONFIRMED',
            accountRef: input.accountRef ?? null,
            rawFeed: input.rawFeed as any
          }
        });

        const outboxEnvelope = domainEvent({
          eventType: 'ProviderEvidenceIngested',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'ProviderEvidence',
          aggregateId: evidence.id,
          aggregateVersion: 1,
          concessionId: '00000000-0000-0000-0000-000000000000',
          assemblyId: '00000000-0000-0000-0000-000000000000',
          correlationId,
          data: {
            evidenceId: evidence.id,
            providerId: evidence.providerId,
            providerRef: evidence.providerRef,
            grossMinor: Number(evidence.grossMinor),
            netMinor: Number(evidence.netMinor),
            outcome: evidence.declaredOutcome
          }
        });

        await appendOutboxEvent(tx, 'revenue.evidence.received.v1', outboxEnvelope);

        return {
          id: evidence.id,
          providerId: evidence.providerId,
          providerRef: evidence.providerRef,
          channel: evidence.channel,
          grossMinor: Number(evidence.grossMinor),
          declaredOutcome: evidence.declaredOutcome,
          createdAt: evidence.createdAt.toISOString()
        };
      });
    },

    async getEvidence(id: string) {
      const evidence = await app.prisma.providerEvidence.findUnique({ where: { id } });
      if (!evidence) throw new NotFoundError('Provider evidence not found');
      return {
        id: evidence.id,
        providerId: evidence.providerId,
        providerRef: evidence.providerRef,
        channel: evidence.channel,
        currency: evidence.currency,
        grossMinor: Number(evidence.grossMinor),
        feeMinor: Number(evidence.feeMinor),
        netMinor: Number(evidence.netMinor),
        paymentTime: evidence.paymentTime.toISOString(),
        declaredOutcome: evidence.declaredOutcome,
        accountRef: evidence.accountRef,
        createdAt: evidence.createdAt.toISOString()
      };
    },

    async submitControlTotal(input: ControlTotalInput, concessionId: string, correlationId: string) {
      return app.prisma.$transaction(async (tx) => {
        const total = await tx.controlTotalSubmission.create({
          data: {
            concessionId,
            authorityCode: input.authorityCode,
            periodStart: new Date(input.periodStart),
            periodEnd: new Date(input.periodEnd),
            transactionCount: input.transactionCount,
            totalAmountMinor: BigInt(input.totalAmountMinor),
            manifestRef: input.manifestRef,
            status: 'SUBMITTED'
          }
        });

        return {
          id: total.id,
          concessionId: total.concessionId,
          authorityCode: total.authorityCode,
          periodStart: total.periodStart.toISOString(),
          periodEnd: total.periodEnd.toISOString(),
          transactionCount: total.transactionCount,
          totalAmountMinor: Number(total.totalAmountMinor),
          manifestRef: total.manifestRef,
          status: total.status,
          createdAt: total.createdAt.toISOString()
        };
      });
    }
  };
}
