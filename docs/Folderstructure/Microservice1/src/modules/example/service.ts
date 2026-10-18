import type { FastifyInstance } from 'fastify';
import { domainEvent } from '../../events/envelope.js';
import { appendOutboxEvent } from '../../events/outbox.js';
import { NotFoundError } from '../../lib/errors.js';

interface CreateInput {
  name: string;
  concessionId: string;
  assemblyId: string;
  actorId: string;
  correlationId: string;
}

export function exampleService(app: FastifyInstance) {
  return {
    async create(input: CreateInput) {
      return app.prisma.$transaction(async (tx) => {
        const resource = await tx.exampleResource.create({
          data: {
            concessionId: input.concessionId,
            assemblyId: input.assemblyId,
            name: input.name,
            createdBy: input.actorId,
            updatedBy: input.actorId
          }
        });
        const event = domainEvent({
          eventType: 'ExampleResourceCreated',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'ExampleResource',
          aggregateId: resource.id,
          aggregateVersion: resource.version,
          concessionId: resource.concessionId,
          assemblyId: resource.assemblyId,
          correlationId: input.correlationId,
          data: { id: resource.id, name: resource.name, status: resource.status }
        });
        await appendOutboxEvent(tx, 'example.resource.created.v1', event);
        await tx.auditRecord.create({
          data: {
            actorId: input.actorId,
            actorType: 'USER',
            concessionId: input.concessionId,
            assemblyId: input.assemblyId,
            action: 'example-resource.create',
            resourceType: 'ExampleResource',
            resourceId: resource.id,
            requestId: input.correlationId,
            outcome: 'SUCCESS',
            metadata: {}
          }
        });
        return resource;
      });
    },

    async get(id: string, concessionId: string, assemblyId: string) {
      const resource = await app.prisma.exampleResource.findFirst({ where: { id, concessionId, assemblyId } });
      if (!resource) throw new NotFoundError();
      return resource;
    }
  };
}

declare module 'fastify' {
  interface FastifyInstance { serviceInfo: { name: string } }
}
