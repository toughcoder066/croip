import type { Prisma } from '../generated/prisma-client/index.js';
import type { DomainEventEnvelope } from './envelope.js';

export async function appendOutboxEvent(
  tx: Prisma.TransactionClient,
  routingKey: string,
  event: DomainEventEnvelope
): Promise<void> {
  await tx.outboxEvent.create({
    data: {
      id: event.eventId,
      eventType: event.eventType,
      eventVersion: event.eventVersion,
      aggregateType: event.aggregateType,
      aggregateId: event.aggregateId,
      aggregateVersion: event.aggregateVersion,
      routingKey,
      payload: event as unknown as Prisma.InputJsonValue,
      headers: {
        contentType: 'application/json',
        correlationId: event.correlationId,
        causationId: event.causationId ?? null
      }
    }
  });
}
