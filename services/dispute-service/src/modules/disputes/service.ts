import { randomUUID } from 'node:crypto';
import type { FastifyInstance } from 'fastify';
import { domainEvent } from '../../events/envelope.js';
import { appendOutboxEvent } from '../../events/outbox.js';
import { NotFoundError, BadRequestError } from '../../lib/errors.js';

const SLA_DAYS = 14;

const FORWARD_TRANSITIONS: Record<string, string[]> = {
  OPEN: ['UNDER_REVIEW'],
  UNDER_REVIEW: ['RESOLVED', 'REJECTED']
};

export interface RaiseDisputeInput {
  disputeType: 'BILLING' | 'BOUNDARY' | 'VALUATION';
  propertyId?: string;
  billId?: string;
  note: string;
  raisedByRatepayerId: string;
  concessionId: string;
  assemblyId: string;
}

export interface ListDisputesFilter {
  status?: string;
  assignedToPersonnelId?: string;
  raisedByRatepayerId?: string;
}

export interface UpdateDisputeStatusInput {
  code: string;
  status: 'UNDER_REVIEW' | 'RESOLVED' | 'REJECTED';
  resolution?: string;
  concessionId: string;
  assemblyId: string;
}

export interface AddEvidenceInput {
  code: string;
  mediaUrl: string;
  uploadedByActorType: string;
  uploadedByActorId: string;
}

export interface AddCommentInput {
  code: string;
  body: string;
  actorType: string;
  actorId: string;
}

function generateDisputeCode(): string {
  return `DSP-${randomUUID().split('-')[0]!.toUpperCase()}`;
}

export function disputeService(app: FastifyInstance) {
  return {
    async raiseDispute(input: RaiseDisputeInput) {
      return app.prisma.$transaction(async (tx) => {
        const now = new Date();
        const slaDueAt = new Date(now.getTime() + SLA_DAYS * 24 * 60 * 60 * 1000);

        const dispute = await tx.dispute.create({
          data: {
            code: generateDisputeCode(),
            disputeType: input.disputeType,
            propertyId: input.propertyId ?? null,
            billId: input.billId ?? null,
            raisedByRatepayerId: input.raisedByRatepayerId,
            status: 'OPEN',
            slaDueAt,
            comments: {
              create: {
                actorType: 'RATEPAYER',
                actorId: input.raisedByRatepayerId,
                body: input.note
              }
            }
          },
          include: { comments: true, evidence: true }
        });

        const evt = domainEvent({
          eventType: 'DisputeRaised',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'Dispute',
          aggregateId: dispute.id,
          aggregateVersion: 1,
          concessionId: input.concessionId,
          assemblyId: input.assemblyId,
          correlationId: randomUUID(),
          data: {
            disputeId: dispute.id,
            code: dispute.code,
            disputeType: dispute.disputeType,
            propertyId: dispute.propertyId,
            billId: dispute.billId,
            raisedByRatepayerId: dispute.raisedByRatepayerId
          }
        });
        await appendOutboxEvent(tx, 'revenue.dispute.raised.v1', evt);

        return dispute;
      });
    },

    async listMyDisputes(raisedByRatepayerId: string) {
      return app.prisma.dispute.findMany({
        where: { raisedByRatepayerId },
        orderBy: { createdAt: 'desc' }
      });
    },

    async getDisputeByCode(code: string) {
      const dispute = await app.prisma.dispute.findUnique({
        where: { code },
        include: {
          evidence: { orderBy: { createdAt: 'desc' } },
          comments: { orderBy: { createdAt: 'desc' } }
        }
      });
      if (!dispute) throw new NotFoundError(`Dispute '${code}' not found`);
      return dispute;
    },

    async listDisputes(filter: ListDisputesFilter) {
      return app.prisma.dispute.findMany({
        where: {
          ...(filter.status ? { status: filter.status } : {}),
          ...(filter.assignedToPersonnelId ? { assignedToPersonnelId: filter.assignedToPersonnelId } : {}),
          ...(filter.raisedByRatepayerId ? { raisedByRatepayerId: filter.raisedByRatepayerId } : {})
        },
        orderBy: [{ slaDueAt: 'asc' }, { createdAt: 'desc' }]
      });
    },

    async updateStatus(input: UpdateDisputeStatusInput) {
      const dispute = await app.prisma.dispute.findUnique({ where: { code: input.code } });
      if (!dispute) throw new NotFoundError(`Dispute '${input.code}' not found`);

      const allowedTargets = FORWARD_TRANSITIONS[dispute.status] ?? [];
      if (!allowedTargets.includes(input.status)) {
        throw new BadRequestError(
          `Cannot transition dispute '${dispute.code}' from '${dispute.status}' to '${input.status}'`
        );
      }

      return app.prisma.$transaction(async (tx) => {
        const isTerminal = input.status === 'RESOLVED' || input.status === 'REJECTED';
        const updated = await tx.dispute.update({
          where: { id: dispute.id },
          data: {
            status: input.status,
            resolution: input.resolution ?? dispute.resolution,
            resolvedAt: isTerminal ? new Date() : dispute.resolvedAt
          }
        });

        if (isTerminal) {
          const evt = domainEvent({
            eventType: 'DisputeResolved',
            eventVersion: 1,
            producer: app.serviceInfo.name,
            aggregateType: 'Dispute',
            aggregateId: updated.id,
            aggregateVersion: 2,
            concessionId: input.concessionId,
            assemblyId: input.assemblyId,
            correlationId: randomUUID(),
            data: {
              disputeId: updated.id,
              code: updated.code,
              status: updated.status,
              resolution: updated.resolution
            }
          });
          await appendOutboxEvent(tx, 'revenue.dispute.resolved.v1', evt);
        }

        return updated;
      });
    },

    async addEvidence(input: AddEvidenceInput) {
      const dispute = await app.prisma.dispute.findUnique({ where: { code: input.code } });
      if (!dispute) throw new NotFoundError(`Dispute '${input.code}' not found`);

      return app.prisma.disputeEvidence.create({
        data: {
          disputeId: dispute.id,
          mediaUrl: input.mediaUrl,
          uploadedByActorType: input.uploadedByActorType,
          uploadedByActorId: input.uploadedByActorId
        }
      });
    },

    async addComment(input: AddCommentInput) {
      const dispute = await app.prisma.dispute.findUnique({ where: { code: input.code } });
      if (!dispute) throw new NotFoundError(`Dispute '${input.code}' not found`);

      return app.prisma.disputeComment.create({
        data: {
          disputeId: dispute.id,
          actorType: input.actorType,
          actorId: input.actorId,
          body: input.body
        }
      });
    },

    async purgeDisputes() {
      return app.prisma.$transaction(async (tx) => {
        const deletedEvidence = await tx.disputeEvidence.deleteMany({});
        const deletedComments = await tx.disputeComment.deleteMany({});
        const deletedDisputes = await tx.dispute.deleteMany({});

        return {
          success: true,
          purged: {
            evidence: deletedEvidence.count,
            comments: deletedComments.count,
            disputes: deletedDisputes.count
          }
        };
      });
    }
  };
}

