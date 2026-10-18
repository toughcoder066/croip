import { randomUUID } from 'node:crypto';

export interface DomainEventEnvelope<T = unknown> {
  eventId: string;
  eventType: string;
  eventVersion: number;
  producer: string;
  aggregateType: string;
  aggregateId: string;
  aggregateVersion: number;
  concessionId: string;
  assemblyId: string;
  correlationId: string;
  causationId?: string;
  occurredAt: string;
  data: T;
}

export function domainEvent<T>(input: Omit<DomainEventEnvelope<T>, 'eventId' | 'occurredAt'>): DomainEventEnvelope<T> {
  return { ...input, eventId: randomUUID(), occurredAt: new Date().toISOString() };
}
