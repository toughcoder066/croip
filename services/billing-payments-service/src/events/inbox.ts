import { Prisma, type PrismaClient } from '../generated/prisma-client/index.js';
import type { DomainEventEnvelope } from './envelope.js';

export async function processOnce(
  prisma: PrismaClient,
  consumerId: string,
  event: DomainEventEnvelope,
  handler: (tx: Prisma.TransactionClient, event: DomainEventEnvelope) => Promise<Prisma.InputJsonValue | void>
): Promise<'processed' | 'duplicate'> {
  try {
    await prisma.$transaction(async (tx) => {
      await tx.inboxMessage.create({
        data: { consumerId, messageId: event.eventId, eventType: event.eventType }
      });
      const result = await handler(tx, event);
      await tx.inboxMessage.update({
        where: { consumerId_messageId: { consumerId, messageId: event.eventId } },
        data: { processedAt: new Date(), ...(result === undefined ? {} : { result }) }
      });
    });
    return 'processed';
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') return 'duplicate';
    throw error;
  }
}
