import type { FastifyInstance } from 'fastify';
import { domainEvent } from '../../events/envelope.js';
import { appendOutboxEvent } from '../../events/outbox.js';
import { NotFoundError } from '../../lib/errors.js';
import { sha256 } from '../../lib/hash.js';

export interface CloudEventInput {
  specversion: string;
  id: string;
  source: string;
  type: string;
  time: string;
  subject?: string;
  dataschema?: string;
  datacontenttype?: string;
  data: Record<string, unknown>;
}

export interface IngestContext {
  concessionId: string;
  assemblyId: string;
  actorId: string;
  correlationId: string;
}

export function ingestionService(app: FastifyInstance) {
  return {
    async ingestEvent(event: CloudEventInput, ctx: IngestContext) {
      const payloadHash = sha256(JSON.stringify(event));

      return app.prisma.$transaction(async (tx) => {
        const existing = await tx.ingestionSubmission.findUnique({
          where: { eventId: event.id }
        });

        if (existing) {
          return {
            ingestionId: existing.id,
            status: existing.status,
            eventId: existing.eventId,
            receivedAt: existing.createdAt.toISOString(),
            statusUrl: `/v1/ingestions/${existing.id}`
          };
        }

        const submission = await tx.ingestionSubmission.create({
          data: {
            concessionId: ctx.concessionId,
            assemblyId: ctx.assemblyId,
            eventId: event.id,
            eventType: event.type,
            eventSource: event.source,
            status: 'RECEIVED',
            payloadHash,
            rawEnvelope: event as any
          }
        });

        const outboxEnvelope = domainEvent({
          eventType: 'EventIngested',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'IngestionSubmission',
          aggregateId: submission.id,
          aggregateVersion: 1,
          concessionId: ctx.concessionId,
          assemblyId: ctx.assemblyId,
          correlationId: ctx.correlationId,
          data: {
            ingestionId: submission.id,
            eventId: event.id,
            eventType: event.type,
            source: event.source,
            payload: event.data
          }
        });

        await appendOutboxEvent(tx, 'revenue.gateway.ingested.v1', outboxEnvelope);

        await tx.auditRecord.create({
          data: {
            actorId: ctx.actorId,
            actorType: 'SERVICE',
            concessionId: ctx.concessionId,
            assemblyId: ctx.assemblyId,
            action: 'event.ingest',
            resourceType: 'IngestionSubmission',
            resourceId: submission.id,
            requestId: ctx.correlationId,
            outcome: 'SUCCESS',
            metadata: { eventId: event.id, eventType: event.type }
          }
        });

        return {
          ingestionId: submission.id,
          status: submission.status,
          eventId: submission.eventId,
          receivedAt: submission.createdAt.toISOString(),
          statusUrl: `/v1/ingestions/${submission.id}`
        };
      });
    },

    async getIngestion(id: string, concessionId: string, assemblyId: string) {
      const submission = await app.prisma.ingestionSubmission.findFirst({
        where: { id, concessionId, assemblyId }
      });
      if (!submission) throw new NotFoundError('Ingestion record not found');
      return {
        ingestionId: submission.id,
        status: submission.status,
        eventId: submission.eventId,
        receivedAt: submission.createdAt.toISOString(),
        statusUrl: `/v1/ingestions/${submission.id}`
      };
    }
  };
}
