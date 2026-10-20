import { randomUUID } from 'node:crypto';
import type { FastifyInstance } from 'fastify';
import { Prisma } from '../../generated/prisma-client/index.js';
import { domainEvent } from '../../events/envelope.js';
import { appendOutboxEvent } from '../../events/outbox.js';
import { NotFoundError, BadRequestError } from '../../lib/errors.js';

export interface IssueBillInput {
  propertyId: string;
  ratepayerId: string;
  billingPeriod: string;
  amountDue: number;
  dueDate: string;
  billType?: string;
  externalBillRef: string;
  concessionId: string;
  assemblyId: string;
  /** The concession billing officer issuing this bill — the authenticated caller. */
  issuedByPersonnelId?: string;
}

export interface RecordPaymentInput {
  billNumber: string;
  amount: number;
  paidByRatepayerId?: string;
  externalPaymentRef: string;
  clientEventId: string;
  paidAt: string;
  assemblyId: string;
}

export interface BillDirectoryFilter {
  search?: string;
  paymentStatus?: string;
  ratepayerId?: string;
  propertyId?: string;
  page?: number;
  pageSize?: number;
}

export interface PaymentDirectoryFilter {
  search?: string;
  status?: string;
  paidByRatepayerId?: string;
  page?: number;
  pageSize?: number;
}

export interface CreatePaymentLinkInput {
  billId: string;
  amountFixed: number;
  expiresAt: string;
  gatewayLinkRef: string;
}

function generateBillNumber(): string {
  return `BILL-${randomUUID().split('-')[0]!.toUpperCase()}`;
}

export function billingService(app: FastifyInstance) {
  return {
    async issueBill(input: IssueBillInput) {
      return app.prisma.$transaction(async (tx) => {
        let bill;
        let attempts = 0;
        // billNumber is generated, not caller-supplied; retry on the extremely unlikely collision.
        for (;;) {
          try {
            bill = await tx.propertyBill.create({
              data: {
                billNumber: generateBillNumber(),
                propertyId: input.propertyId,
                ratepayerId: input.ratepayerId,
                concessionId: input.concessionId,
                issuedByPersonnelId: input.issuedByPersonnelId ?? null,
                billingPeriod: input.billingPeriod,
                billType: input.billType ?? 'ASSESSED',
                amountDue: new Prisma.Decimal(input.amountDue),
                amountPaid: new Prisma.Decimal(0),
                paymentStatus: 'UNPAID',
                dueDate: new Date(input.dueDate),
                externalBillRef: input.externalBillRef
              }
            });
            break;
          } catch (error) {
            attempts += 1;
            const isUniqueViolation = error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002';
            if (!isUniqueViolation || attempts >= 3) throw error;
          }
        }

        const evt = domainEvent({
          eventType: 'BillIssued',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'PropertyBill',
          aggregateId: bill.id,
          aggregateVersion: 1,
          concessionId: input.concessionId,
          assemblyId: input.assemblyId,
          correlationId: randomUUID(),
          data: {
            billId: bill.id,
            billNumber: bill.billNumber,
            propertyId: bill.propertyId,
            ratepayerId: bill.ratepayerId,
            amountDue: bill.amountDue.toString(),
            dueDate: bill.dueDate.toISOString()
          }
        });
        await appendOutboxEvent(tx, 'revenue.billing.bill_issued.v1', evt);

        return bill;
      });
    },

    // Admin/oversight bill directory for the CROIP portal — distinct from /me/bills
    // (a ratepayer's own bills) and from GET /bills/:billNumber (a single lookup).
    async listDirectory(filter: BillDirectoryFilter) {
      const page = Math.max(filter.page ?? 1, 1);
      const pageSize = Math.min(Math.max(filter.pageSize ?? 20, 1), 100);
      const where: Record<string, unknown> = {};
      if (filter.paymentStatus) where.paymentStatus = filter.paymentStatus;
      if (filter.ratepayerId) where.ratepayerId = filter.ratepayerId;
      if (filter.propertyId) where.propertyId = filter.propertyId;
      if (filter.search) {
        where.OR = [
          { billNumber: { contains: filter.search, mode: 'insensitive' } },
          { externalBillRef: { contains: filter.search, mode: 'insensitive' } }
        ];
      }

      const [total, items] = await Promise.all([
        app.prisma.propertyBill.count({ where }),
        app.prisma.propertyBill.findMany({
          where,
          include: { payments: true },
          orderBy: { issuedAt: 'desc' },
          skip: (page - 1) * pageSize,
          take: pageSize
        })
      ]);

      return { items, total, page, pageSize, totalPages: Math.max(Math.ceil(total / pageSize), 1) };
    },

    async getBillByNumber(billNumber: string) {
      const bill = await app.prisma.propertyBill.findUnique({
        where: { billNumber },
        include: { payments: { orderBy: { receivedAt: 'desc' } } }
      });
      if (!bill) throw new NotFoundError(`Bill '${billNumber}' not found`);
      return bill;
    },

    async recordPayment(input: RecordPaymentInput) {
      const existing = await app.prisma.billPayment.findUnique({ where: { clientEventId: input.clientEventId } });
      if (existing) return { payment: existing, created: false };

      const result = await app.prisma.$transaction(async (tx) => {
        const bill = await tx.propertyBill.findUnique({ where: { billNumber: input.billNumber } });
        if (!bill) throw new NotFoundError(`Bill '${input.billNumber}' not found`);

        const amount = new Prisma.Decimal(input.amount);
        if (amount.lte(0)) throw new BadRequestError('Payment amount must be greater than zero');

        const remaining = bill.amountDue.minus(bill.amountPaid);
        if (amount.gt(remaining)) {
          throw new BadRequestError(
            `Payment of ${amount.toString()} exceeds the outstanding balance of ${remaining.toString()} on bill '${bill.billNumber}'`
          );
        }

        const balanceAtPayment = remaining.minus(amount);
        const newAmountPaid = bill.amountPaid.plus(amount);
        const newPaymentStatus = balanceAtPayment.isZero() ? 'PAID' : 'PARTIALLY_PAID';

        const payment = await tx.billPayment.create({
          data: {
            billId: bill.id,
            paidByRatepayerId: input.paidByRatepayerId ?? null,
            clientEventId: input.clientEventId,
            externalPaymentRef: input.externalPaymentRef,
            paymentType: 'PAYMENT',
            amount,
            balanceAtPayment,
            status: 'CONFIRMED',
            paidAt: new Date(input.paidAt)
          }
        });

        await tx.propertyBill.update({
          where: { id: bill.id },
          data: { amountPaid: newAmountPaid, paymentStatus: newPaymentStatus }
        });

        const evt = domainEvent({
          eventType: 'PaymentReceived',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'BillPayment',
          aggregateId: payment.id,
          aggregateVersion: 1,
          concessionId: bill.concessionId,
          assemblyId: input.assemblyId,
          correlationId: randomUUID(),
          data: {
            paymentId: payment.id,
            billId: bill.id,
            billNumber: bill.billNumber,
            amount: amount.toString(),
            paidByRatepayerId: input.paidByRatepayerId ?? bill.ratepayerId,
            billRatepayerId: bill.ratepayerId,
            paymentStatus: newPaymentStatus
          }
        });
        await appendOutboxEvent(tx, 'revenue.billing.payment_received.v1', evt);

        return payment;
      });

      return { payment: result, created: true };
    },

    // Admin/oversight payment ledger for the CROIP portal — every payment across every
    // ratepayer and bill, each carrying enough of its parent bill (billNumber, currency,
    // ratepayer/property ids) to be useful without a second lookup.
    async listPaymentsDirectory(filter: PaymentDirectoryFilter) {
      const page = Math.max(filter.page ?? 1, 1);
      const pageSize = Math.min(Math.max(filter.pageSize ?? 20, 1), 100);
      const where: Record<string, unknown> = {};
      if (filter.status) where.status = filter.status;
      if (filter.paidByRatepayerId) where.paidByRatepayerId = filter.paidByRatepayerId;
      if (filter.search) {
        where.OR = [
          { externalPaymentRef: { contains: filter.search, mode: 'insensitive' } },
          { bill: { billNumber: { contains: filter.search, mode: 'insensitive' } } }
        ];
      }

      const [total, items] = await Promise.all([
        app.prisma.billPayment.count({ where }),
        app.prisma.billPayment.findMany({
          where,
          include: { bill: { select: { id: true, billNumber: true, ratepayerId: true, propertyId: true, currency: true } } },
          orderBy: { paidAt: 'desc' },
          skip: (page - 1) * pageSize,
          take: pageSize
        })
      ]);

      return { items, total, page, pageSize, totalPages: Math.max(Math.ceil(total / pageSize), 1) };
    },

    async createPaymentLink(input: CreatePaymentLinkInput) {
      const bill = await app.prisma.propertyBill.findUnique({ where: { id: input.billId } });
      if (!bill) throw new NotFoundError('Bill not found');

      return app.prisma.paymentLink.create({
        data: {
          billId: input.billId,
          amountFixed: new Prisma.Decimal(input.amountFixed),
          status: 'ACTIVE',
          expiresAt: new Date(input.expiresAt),
          gatewayLinkRef: input.gatewayLinkRef
        }
      });
    },

    async listMyBills(ratepayerId: string) {
      const [ownBills, paidForBills] = await Promise.all([
        app.prisma.propertyBill.findMany({
          where: { ratepayerId },
          include: { payments: true },
          orderBy: { issuedAt: 'desc' }
        }),
        app.prisma.propertyBill.findMany({
          where: { payments: { some: { paidByRatepayerId: ratepayerId } } },
          include: { payments: true },
          orderBy: { issuedAt: 'desc' }
        })
      ]);

      const byId = new Map<string, (typeof ownBills)[number]>();
      for (const bill of [...ownBills, ...paidForBills]) byId.set(bill.id, bill);
      return [...byId.values()];
    },

    async checkPropertyPaidBills(propertyId: string) {
      const bills = await app.prisma.propertyBill.findMany({
        where: { propertyId },
        include: { payments: true }
      });

      const paidBills = bills.filter(b =>
        Number(b.amountPaid) > 0 ||
        b.payments.length > 0 ||
        b.paymentStatus === 'PAID' ||
        b.paymentStatus === 'PARTIALLY_PAID'
      );

      const totalPaid = paidBills.reduce((acc, b) => acc + Number(b.amountPaid), 0);

      return {
        propertyId,
        hasPaidBills: paidBills.length > 0,
        paidBillsCount: paidBills.length,
        totalBillsCount: bills.length,
        totalAmountPaid: totalPaid.toFixed(2)
      };
    },

    async purgeBills() {
      return app.prisma.$transaction(async (tx) => {
        const deletedPayments = await tx.billPayment.deleteMany({});
        const deletedLinks = await tx.paymentLink.deleteMany({});
        const deletedBills = await tx.propertyBill.deleteMany({});

        return {
          success: true,
          purged: {
            payments: deletedPayments.count,
            paymentLinks: deletedLinks.count,
            bills: deletedBills.count
          }
        };
      });
    }
  };
}

