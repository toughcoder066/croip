import type { FastifyPluginAsync } from 'fastify';
import { reconciliationService, type RunReconciliationInput, type ResolveExceptionInput } from './service.js';
import { problemSchema, runReconciliationInputSchema, runReconciliationResponseSchema, exceptionItemSchema, actionExceptionBodySchema } from './schemas.js';

interface ActionBody { action: 'APPROVE' | 'OVERRIDE' | 'DISPUTE'; notes: string }

export const reconciliationRoutes: FastifyPluginAsync = async (app) => {
  const service = reconciliationService(app);

  app.post<{ Body: RunReconciliationInput }>('/reconciliation/run', {
    preHandler: app.requirePermissions(['reconciliation:run']),
    schema: {
      tags: ['Oversight & Reconciliation'],
      summary: 'Initiate 3-way financial reconciliation run for a reporting period',
      body: runReconciliationInputSchema,
      response: {
        201: runReconciliationResponseSchema,
        400: problemSchema,
        401: problemSchema,
        403: problemSchema
      }
    }
  }, async (request, reply) => {
    const run = await service.triggerRun(
      request.body,
      request.auth.concessionId,
      request.auth.subject
    );
    return reply.code(201).send(run);
  });

  app.get('/reconciliation/runs', {
    preHandler: app.requirePermissions(['reconciliation:read']),
    schema: {
      tags: ['Oversight & Reconciliation'],
      summary: 'List historical reconciliation runs for this tenant',
      response: {
        200: { type: 'array', items: runReconciliationResponseSchema },
        401: problemSchema,
        403: problemSchema
      }
    }
  }, async (request) => {
    return service.listRuns(request.auth.concessionId);
  });

  app.get('/exceptions', {
    preHandler: app.requirePermissions(['exceptions:manage']),
    schema: {
      tags: ['Oversight & Reconciliation'],
      summary: 'Query open reconciliation variance exceptions',
      response: {
        200: { type: 'array', items: exceptionItemSchema },
        401: problemSchema,
        403: problemSchema
      }
    }
  }, async (request) => {
    return service.listExceptions(request.auth.concessionId);
  });

  app.post<{ Params: { id: string }; Body: ActionBody }>('/exceptions/:id/action', {
    preHandler: app.requirePermissions(['exceptions:manage']),
    schema: {
      tags: ['Oversight & Reconciliation'],
      summary: 'Execute maker-checker resolution action on an open exception',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      body: actionExceptionBodySchema,
      response: {
        200: exceptionItemSchema,
        400: problemSchema,
        401: problemSchema,
        403: problemSchema,
        404: problemSchema
      }
    }
  }, async (request) => {
    return service.actOnException({
      exceptionId: request.params.id,
      action: request.body.action,
      notes: request.body.notes,
      actorId: request.auth.subject
    }, request.auth.concessionId);
  });

  app.get('/oversight/metrics', {
    preHandler: app.requirePermissions(['oversight:read']),
    schema: {
      tags: ['Oversight & Reconciliation'],
      summary: 'National collection efficiency and consolidated financial KPIs',
      response: {
        200: { type: 'object', additionalProperties: true },
        401: problemSchema,
        403: problemSchema
      }
    }
  }, async () => {
    return service.getNationalMetrics();
  });
};
