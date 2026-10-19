import type { FastifyPluginAsync } from 'fastify';
import { billingService, type IssueBillInput, type RecordPaymentInput, type CreatePaymentLinkInput, type BillDirectoryFilter, type PaymentDirectoryFilter } from './service.js';
import {
  problemSchema,
  billResponseSchema,
  billDirectoryResponseSchema,
  issueBillBodySchema,
  recordPaymentBodySchema,
  paymentResponseSchema,
  paymentDirectoryResponseSchema,
  paymentLinkBodySchema,
  paymentLinkResponseSchema
} from './schemas.js';

export const billingRoutes: FastifyPluginAsync = async (app) => {
  const service = billingService(app);

  app.post<{ Body: Omit<IssueBillInput, 'concessionId' | 'assemblyId'> }>('/bills', {
    preHandler: app.requirePermissions(['bills:issue']),
    schema: {
      tags: ['Billing & Payments'],
      summary: 'Issue a property bill for a billing period',
      body: issueBillBodySchema,
      response: { 201: billResponseSchema, 400: problemSchema, 401: problemSchema, 403: problemSchema }
    }
  }, async (request, reply) => {
    const bill = await service.issueBill({
      ...request.body,
      concessionId: request.auth.concessionId,
      assemblyId: request.auth.assemblyId,
      issuedByPersonnelId: request.auth.subject
    });
    return reply.code(201).send(bill);
  });

  app.get<{ Querystring: BillDirectoryFilter }>('/bills', {
    preHandler: app.requirePermissions(['bills:read']),
    schema: {
      tags: ['Billing & Payments'],
      summary: 'CROIP portal: paginated, searchable bill directory (oversight view across all ratepayers)',
      querystring: {
        type: 'object',
        properties: {
          search: { type: 'string' },
          paymentStatus: { type: 'string', enum: ['UNPAID', 'PARTIALLY_PAID', 'PAID'] },
          ratepayerId: { type: 'string', format: 'uuid' },
          propertyId: { type: 'string', format: 'uuid' },
          page: { type: 'integer', minimum: 1, default: 1 },
          pageSize: { type: 'integer', minimum: 1, maximum: 100, default: 20 }
        }
      },
      response: { 200: billDirectoryResponseSchema, 401: problemSchema, 403: problemSchema }
    }
  }, async (request) => {
    return service.listDirectory(request.query ?? {});
  });

  app.get<{ Params: { billNumber: string } }>('/bills/:billNumber', {
    preHandler: app.requirePermissions(['bills:read']),
    schema: {
      tags: ['Billing & Payments'],
      summary: 'Retrieve a bill and its payment history',
      params: { type: 'object', required: ['billNumber'], properties: { billNumber: { type: 'string' } } },
      response: { 200: billResponseSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request) => {
    return service.getBillByNumber(request.params.billNumber);
  });

  app.post<{ Params: { billNumber: string }; Body: Omit<RecordPaymentInput, 'billNumber' | 'assemblyId'> }>('/bills/:billNumber/payments', {
    preHandler: app.requirePermissions(['payments:receive']),
    schema: {
      tags: ['Billing & Payments'],
      summary: 'Record a full or partial payment against a bill (supports paying for another ratepayer)',
      params: { type: 'object', required: ['billNumber'], properties: { billNumber: { type: 'string' } } },
      body: recordPaymentBodySchema,
      response: { 200: paymentResponseSchema, 201: paymentResponseSchema, 400: problemSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request, reply) => {
    const { payment, created } = await service.recordPayment({
      ...request.body,
      billNumber: request.params.billNumber,
      assemblyId: request.auth.assemblyId
    });
    return reply.code(created ? 201 : 200).send(payment);
  });

  app.post<{ Body: CreatePaymentLinkInput }>('/payment-links', {
    preHandler: app.requirePermissions(['payments:receive']),
    schema: {
      tags: ['Billing & Payments'],
      summary: 'Create a fixed-amount payment link for third-party gateway checkout',
      body: paymentLinkBodySchema,
      response: { 201: paymentLinkResponseSchema, 400: problemSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request, reply) => {
    const link = await service.createPaymentLink(request.body);
    return reply.code(201).send(link);
  });

  app.get<{ Querystring: PaymentDirectoryFilter }>('/payments', {
    preHandler: app.requirePermissions(['payments:receive']),
    schema: {
      tags: ['Billing & Payments'],
      summary: 'CROIP portal: paginated, searchable payment ledger across all bills and ratepayers',
      querystring: {
        type: 'object',
        properties: {
          search: { type: 'string' },
          status: { type: 'string' },
          paidByRatepayerId: { type: 'string', format: 'uuid' },
          page: { type: 'integer', minimum: 1, default: 1 },
          pageSize: { type: 'integer', minimum: 1, maximum: 100, default: 20 }
        }
      },
      response: { 200: paymentDirectoryResponseSchema, 401: problemSchema, 403: problemSchema }
    }
  }, async (request) => {
    return service.listPaymentsDirectory(request.query ?? {});
  });

  app.get('/me/bills', {
    preHandler: app.requirePermissions(['bills:read']),
    schema: {
      tags: ['Billing & Payments'],
      summary: "List the caller's own bills, including bills they have paid on behalf of another ratepayer",
      response: { 200: { type: 'array', items: billResponseSchema }, 401: problemSchema, 403: problemSchema }
    }
  }, async (request) => {
    return service.listMyBills(request.auth.subject);
  });
};
