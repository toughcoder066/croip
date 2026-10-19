import type { FastifyPluginAsync } from 'fastify';
import { processingService } from './service.js';
import { problemSchema, quarantineItemSchema, resolveQuarantineBodySchema, operationalViewSchema } from './schemas.js';

interface ResolveBody { resolutionNotes: string }
interface IdParams { id: string }
interface ViewParams { aggregateType: string; aggregateId: string }

export const processingRoutes: FastifyPluginAsync = async (app) => {
  const service = processingService(app);

  app.get('/quarantine', {
    preHandler: app.requirePermissions(['quarantine:manage']),
    schema: {
      tags: ['Event Processing'],
      summary: 'List quarantined events pending investigation',
      response: {
        200: { type: 'array', items: quarantineItemSchema },
        401: problemSchema,
        403: problemSchema
      }
    }
  }, async (request) => {
    return service.listQuarantine(request.auth.concessionId, request.auth.assemblyId);
  });

  app.get<{ Params: IdParams }>('/quarantine/:id', {
    preHandler: app.requirePermissions(['quarantine:manage']),
    schema: {
      tags: ['Event Processing'],
      summary: 'Get details of a quarantined event',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      response: {
        200: quarantineItemSchema,
        401: problemSchema,
        403: problemSchema,
        404: problemSchema
      }
    }
  }, async (request) => {
    return service.getQuarantine(request.params.id, request.auth.concessionId, request.auth.assemblyId);
  });

  app.post<{ Params: IdParams; Body: ResolveBody }>('/quarantine/:id/resolve', {
    preHandler: app.requirePermissions(['quarantine:manage']),
    schema: {
      tags: ['Event Processing'],
      summary: 'Resolve a quarantined event with investigation notes',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      body: resolveQuarantineBodySchema,
      response: {
        200: quarantineItemSchema,
        400: problemSchema,
        401: problemSchema,
        403: problemSchema,
        404: problemSchema
      }
    }
  }, async (request) => {
    return service.resolveQuarantine({
      quarantineId: request.params.id,
      resolutionNotes: request.body.resolutionNotes,
      actorId: request.auth.subject
    }, request.auth.concessionId, request.auth.assemblyId);
  });

  app.get<{ Params: ViewParams }>('/operational-view/:aggregateType/:aggregateId', {
    preHandler: app.requirePermissions(['events:process']),
    schema: {
      tags: ['Event Processing'],
      summary: 'Retrieve current operational projection of an aggregate',
      params: {
        type: 'object',
        required: ['aggregateType', 'aggregateId'],
        properties: { aggregateType: { type: 'string' }, aggregateId: { type: 'string' } }
      },
      response: {
        200: operationalViewSchema,
        401: problemSchema,
        403: problemSchema,
        404: problemSchema
      }
    }
  }, async (request) => {
    return service.getOperationalView(
      request.params.aggregateType,
      request.params.aggregateId,
      request.auth.concessionId,
      request.auth.assemblyId
    );
  });
};
