import type { FastifyPluginAsync } from 'fastify';
import { ingestionService, type CloudEventInput } from './service.js';
import { problemSchema, cloudEventSchema, ingestionReceiptSchema, batchIngestionResponseSchema } from './schemas.js';

interface BatchBody {
  events: CloudEventInput[];
}

export const ingestionRoutes: FastifyPluginAsync = async (app) => {
  const service = ingestionService(app);

  app.post<{ Body: CloudEventInput }>('/events', {
    preHandler: app.requirePermissions(['gateway:ingest']),
    schema: {
      tags: ['Gateway Ingestion'],
      summary: 'Submit a single canonical CloudEvent for durable ingestion',
      body: cloudEventSchema,
      response: {
        202: ingestionReceiptSchema,
        400: problemSchema,
        401: problemSchema,
        403: problemSchema
      }
    }
  }, async (request, reply) => {
    // TODO: single-assembly limitation, see property-registry-service.
    const receipt = await service.ingestEvent(request.body, {
      concessionId: request.auth.concessionId,
      assemblyId: request.auth.assemblyIds[0] ?? '01c23cab-b1b2-4dae-b99b-32ea574632d9',
      actorId: request.auth.subject,
      correlationId: request.id
    });
    return reply.code(202).send(receipt);
  });

  app.post<{ Body: BatchBody }>('/event-batches', {
    preHandler: app.requirePermissions(['gateway:ingest']),
    schema: {
      tags: ['Gateway Ingestion'],
      summary: 'Submit a bounded batch of canonical CloudEvents',
      body: {
        type: 'object',
        required: ['events'],
        properties: {
          events: {
            type: 'array',
            minItems: 1,
            maxItems: 100,
            items: cloudEventSchema
          }
        }
      },
      response: {
        202: batchIngestionResponseSchema,
        400: problemSchema,
        401: problemSchema,
        403: problemSchema
      }
    }
  }, async (request, reply) => {
    const results = [];
    for (const evt of request.body.events) {
      // TODO: single-assembly limitation, see property-registry-service.
      const res = await service.ingestEvent(evt, {
        concessionId: request.auth.concessionId,
        assemblyId: request.auth.assemblyIds[0] ?? '01c23cab-b1b2-4dae-b99b-32ea574632d9',
        actorId: request.auth.subject,
        correlationId: request.id
      });
      results.push(res);
    }
    return reply.code(202).send({
      batchCount: request.body.events.length,
      acceptedCount: results.length,
      results
    });
  });

  app.get<{ Params: { id: string } }>('/ingestions/:id', {
    preHandler: app.requirePermissions(['gateway:read']),
    schema: {
      tags: ['Gateway Ingestion'],
      summary: 'Check status of durable event ingestion',
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string', format: 'uuid' } }
      },
      response: {
        200: ingestionReceiptSchema,
        401: problemSchema,
        403: problemSchema,
        404: problemSchema
      }
    }
  }, async (request) => {
    // TODO: single-assembly limitation, see property-registry-service.
    return service.getIngestion(
      request.params.id,
      request.auth.concessionId,
      request.auth.assemblyIds[0] ?? '01c23cab-b1b2-4dae-b99b-32ea574632d9'
    );
  });
};
