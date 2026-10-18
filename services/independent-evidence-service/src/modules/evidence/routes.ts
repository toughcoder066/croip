import type { FastifyPluginAsync } from 'fastify';
import { evidenceService, type ProviderEvidenceInput, type ControlTotalInput } from './service.js';
import { problemSchema, providerEvidenceInputSchema, providerEvidenceResponseSchema, controlTotalInputSchema, controlTotalResponseSchema } from './schemas.js';

export const evidenceRoutes: FastifyPluginAsync = async (app) => {
  const service = evidenceService(app);

  app.post<{ Body: ProviderEvidenceInput }>('/provider-evidence', {
    preHandler: app.requirePermissions(['evidence:submit']),
    schema: {
      tags: ['Independent Evidence'],
      summary: 'Ingest authenticated independent financial feed item (PSP, MoMo, Bank)',
      body: providerEvidenceInputSchema,
      response: {
        201: providerEvidenceResponseSchema,
        400: problemSchema,
        401: problemSchema,
        403: problemSchema
      }
    }
  }, async (request, reply) => {
    const created = await service.ingestProviderEvidence(
      request.body,
      request.auth.subject,
      request.id
    );
    return reply.code(201).send(created);
  });

  app.get<{ Params: { id: string } }>('/provider-evidence/:id', {
    preHandler: app.requirePermissions(['evidence:read']),
    schema: {
      tags: ['Independent Evidence'],
      summary: 'Retrieve an independent evidence record',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      response: {
        200: providerEvidenceResponseSchema,
        401: problemSchema,
        403: problemSchema,
        404: problemSchema
      }
    }
  }, async (request) => {
    return service.getEvidence(request.params.id);
  });

  app.post<{ Body: ControlTotalInput }>('/control-totals', {
    preHandler: app.requirePermissions(['control-totals:submit']),
    schema: {
      tags: ['Independent Evidence'],
      summary: 'Submit batch control totals for independent financial reconciliation',
      body: controlTotalInputSchema,
      response: {
        201: controlTotalResponseSchema,
        400: problemSchema,
        401: problemSchema,
        403: problemSchema
      }
    }
  }, async (request, reply) => {
    const created = await service.submitControlTotal(
      request.body,
      request.auth.concessionId,
      request.id
    );
    return reply.code(201).send(created);
  });
};
