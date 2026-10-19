import type { FastifyInstance } from 'fastify';
import { NotFoundError } from '../../lib/errors.js';

export interface SendMessageInput {
  recipientRef: string;
  channel: 'SMS' | 'EMAIL' | 'PUSH';
  templateVersion: string;
  idempotencyKey: string;
}

export function sharedService(app: FastifyInstance) {
  return {
    async getReferenceData(category?: string) {
      const where = category ? { category } : {};
      return app.prisma.referenceDataItem.findMany({
        where,
        orderBy: [{ category: 'asc' }, { code: 'asc' }]
      });
    },

    async listConcessions() {
      return app.prisma.concessionScope.findMany({
        where: { status: 'ACTIVE' },
        orderBy: { authorityCode: 'asc' }
      });
    },

    async requestMessage(input: SendMessageInput, concessionId: string, assemblyId: string) {
      return app.prisma.$transaction(async (tx) => {
        const existing = await tx.notificationMessage.findUnique({
          where: { concessionId_idempotencyKey: { concessionId, idempotencyKey: input.idempotencyKey } }
        });
        if (existing) return existing;

        return tx.notificationMessage.create({
          data: {
            concessionId,
            assemblyId,
            recipientRef: input.recipientRef,
            channel: input.channel,
            templateVersion: input.templateVersion,
            idempotencyKey: input.idempotencyKey,
            status: 'ACCEPTED'
          }
        });
      });
    },

    async getMessage(id: string, concessionId: string) {
      const msg = await app.prisma.notificationMessage.findFirst({
        where: { id, concessionId }
      });
      if (!msg) throw new NotFoundError('Message notification not found');
      return msg;
    },

    async verifyReceipt(receiptNumber: string) {
      const receipt = await app.prisma.receiptVerification.findUnique({
        where: { receiptNumber }
      });
      if (!receipt) throw new NotFoundError('Receipt verification failed: unknown receipt');
      return {
        receiptNumber: receipt.receiptNumber,
        billNumber: receipt.billNumber,
        amountPaidMinor: Number(receipt.amountPaidMinor),
        currency: receipt.currency,
        paidAt: receipt.paidAt.toISOString(),
        status: receipt.status,
        verified: receipt.status === 'VALID'
      };
    }
  };
}
