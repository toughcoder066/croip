import type { FastifyPluginAsync } from 'fastify';
import { assuranceService } from './service.js';
import { problemSchema, auditRecordSchema, verifyResponseSchema, traceResponseSchema } from './schemas.js';

export const assuranceRoutes: FastifyPluginAsync = async (app) => {
  const service = assuranceService(app);

  app.get('/audit/records', {
    preHandler: app.requirePermissions(['audit:read']),
    schema: {
      tags: ['Audit & Assurance'],
      summary: 'Query tamper-evident audit logs with cryptographic hash signatures',
      response: {
        200: { type: 'array', items: auditRecordSchema },
        401: problemSchema,
        403: problemSchema
      }
    }
  }, async (request) => {
    return service.queryAuditRecords(request.auth.concessionId);
  });

  app.post<{ Body: { batchId: string } }>('/assurance/verify', {
    preHandler: app.requirePermissions(['assurance:verify']),
    schema: {
      tags: ['Audit & Assurance'],
      summary: 'Cryptographically verify an immutable event archive manifest',
      body: { type: 'object', required: ['batchId'], properties: { batchId: { type: 'string' } } },
      response: {
        200: verifyResponseSchema,
        400: problemSchema,
        401: problemSchema,
        403: problemSchema,
        404: problemSchema
      }
    }
  }, async (request) => {
    return service.verifyIntegrity(request.body.batchId);
  });

  app.get<{ Params: { targetId: string } }>('/assurance/trace/:targetId', {
    preHandler: app.requirePermissions(['audit:read']),
    schema: {
      tags: ['Audit & Assurance'],
      summary: 'End-to-end auditor trace: follow national figure through applied events to independent evidence',
      params: { type: 'object', required: ['targetId'], properties: { targetId: { type: 'string' } } },
      response: {
        200: traceResponseSchema,
        401: problemSchema,
        403: problemSchema,
        404: problemSchema
      }
    }
  }, async (request) => {
    return service.traceTarget(request.params.targetId);
  });
};
