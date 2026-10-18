import amqp from 'amqplib';
import { PrismaClient, type OutboxEvent } from '@prisma/client';
import { loadConfig } from '../config.js';

const config = loadConfig();
const prisma = new PrismaClient();
const connection = await amqp.connect(config.RABBITMQ_URL);
const channel = await connection.createConfirmChannel();
await channel.assertExchange(config.RABBITMQ_EXCHANGE, 'topic', { durable: true });
let stopping = false;

async function claimBatch(): Promise<OutboxEvent[]> {
  return prisma.$queryRaw<OutboxEvent[]>`
    UPDATE "outbox_events"
       SET "lockedAt" = NOW(), "attempts" = "attempts" + 1
     WHERE "id" IN (
       SELECT "id" FROM "outbox_events"
        WHERE "publishedAt" IS NULL
          AND "nextAttemptAt" <= NOW()
          AND ("lockedAt" IS NULL OR "lockedAt" < NOW() - INTERVAL '5 minutes')
        ORDER BY "occurredAt"
        FOR UPDATE SKIP LOCKED
        LIMIT ${config.OUTBOX_BATCH_SIZE}
     )
     RETURNING *
  `;
}

async function publish(event: OutboxEvent): Promise<void> {
  try {
    channel.publish(
      config.RABBITMQ_EXCHANGE,
      event.routingKey,
      Buffer.from(JSON.stringify(event.payload)),
      {
        persistent: true,
        contentType: 'application/json',
        messageId: event.id,
        type: event.eventType,
        timestamp: Math.floor(event.occurredAt.getTime() / 1000),
        headers: event.headers as Record<string, unknown>
      }
    );
    await channel.waitForConfirms();
    await prisma.outboxEvent.update({ where: { id: event.id }, data: { publishedAt: new Date(), lockedAt: null, lastError: null } });
  } catch (error) {
    const delaySeconds = Math.min(300, 2 ** Math.min(event.attempts, 8));
    await prisma.outboxEvent.update({
      where: { id: event.id },
      data: {
        lockedAt: null,
        lastError: error instanceof Error ? error.message.slice(0, 2000) : 'Unknown publish error',
        nextAttemptAt: new Date(Date.now() + delaySeconds * 1000)
      }
    });
  }
}

async function loop(): Promise<void> {
  while (!stopping) {
    const batch = await claimBatch();
    for (const event of batch) await publish(event);
    if (batch.length === 0) await new Promise((resolve) => setTimeout(resolve, config.OUTBOX_POLL_INTERVAL_MS));
  }
}

async function shutdown(): Promise<void> {
  stopping = true;
  await channel.close();
  await connection.close();
  await prisma.$disconnect();
}

process.once('SIGTERM', () => void shutdown());
process.once('SIGINT', () => void shutdown());

await loop();
