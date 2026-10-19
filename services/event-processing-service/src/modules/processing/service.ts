import type { FastifyInstance } from 'fastify';
import { NotFoundError } from '../../lib/errors.js';

export interface ResolveQuarantineInput {
  quarantineId: string;
  resolutionNotes: string;
  actorId: string;
}

export function processingService(app: FastifyInstance) {
  return {
    async listQuarantine(concessionId: string, assemblyId: string) {
      return app.prisma.eventQuarantine.findMany({
        where: { concessionId, assemblyId },
        orderBy: { createdAt: 'desc' },
        take: 100
      });
    },

    async getQuarantine(id: string, concessionId: string, assemblyId: string) {
      const record = await app.prisma.eventQuarantine.findFirst({
        where: { id, concessionId, assemblyId }
      });
      if (!record) throw new NotFoundError('Quarantine record not found');
      return record;
    },

    async resolveQuarantine(input: ResolveQuarantineInput, concessionId: string, assemblyId: string) {
      return app.prisma.$transaction(async (tx) => {
        const item = await tx.eventQuarantine.findFirst({
          where: { id: input.quarantineId, concessionId, assemblyId }
        });
        if (!item) throw new NotFoundError('Quarantine record not found');

        const updated = await tx.eventQuarantine.update({
          where: { id: input.quarantineId },
          data: {
            status: 'RESOLVED',
            resolvedBy: input.actorId,
            resolutionNotes: input.resolutionNotes,
            resolvedAt: new Date()
          }
        });

        await tx.auditRecord.create({
          data: {
            actorId: input.actorId,
            actorType: 'USER',
            concessionId,
            assemblyId,
            action: 'quarantine.resolve',
            resourceType: 'EventQuarantine',
            resourceId: item.id,
            requestId: crypto.randomUUID(),
            outcome: 'SUCCESS',
            metadata: { eventId: item.eventId, resolutionNotes: input.resolutionNotes }
          }
        });

        return updated;
      });
    },

    async getOperationalView(aggregateType: string, aggregateId: string, concessionId: string, assemblyId: string) {
      const view = await app.prisma.operationalProjection.findFirst({
        where: { aggregateType, aggregateId, concessionId, assemblyId }
      });
      if (!view) throw new NotFoundError('Operational projection not found');
      return view;
    }
  };
}
