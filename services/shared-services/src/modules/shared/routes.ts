import type { FastifyPluginAsync } from 'fastify';
import { sharedService, type SendMessageInput } from './service.js';
import { problemSchema, referenceDataResponseSchema, messageRequestInputSchema, messageResponseSchema, receiptVerificationResponseSchema } from './schemas.js';

export const sharedRoutes: FastifyPluginAsync = async (app) => {
  const service = sharedService(app);

  app.get<{ Querystring: { category?: string } }>('/reference-data', {
    preHandler: app.requirePermissions(['reference:read']),
    schema: {
      tags: ['Shared Services'],
      summary: 'Retrieve canonical reference data (authorities, revenue codes, jurisdictions)',
      querystring: { type: 'object', properties: { category: { type: 'string' } } },
      response: {
        401: problemSchema,
        403: problemSchema
      }
    }
  }, async (request) => {
    return service.getReferenceData(request.query?.category);
  });

  app.post<{ Body: { category: string; code: string; name: string; metadata?: any } }>('/reference-data', {
    schema: {
      tags: ['Shared Services'],
      summary: 'Create or update canonical reference data item'
    }
  }, async (request, reply) => {
    const item = await app.prisma.referenceDataItem.upsert({
      where: {
        category_code_version: {
          category: request.body.category,
          code: request.body.code,
          version: 1
        }
      },
      update: {
        name: request.body.name,
        metadata: request.body.metadata ?? {}
      },
      create: {
        category: request.body.category,
        code: request.body.code,
        name: request.body.name,
        version: 1,
        metadata: request.body.metadata ?? {}
      }
    });
    return reply.code(201).send(item);
  });

  app.delete<{ Params: { id: string } }>('/reference-data/:id', {
    schema: {
      tags: ['Shared Services'],
      summary: 'Delete canonical reference data item',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } }
    }
  }, async (request, reply) => {
    await app.prisma.referenceDataItem.delete({ where: { id: request.params.id } });
    return reply.code(204).send();
  });

  app.get('/concessions', {
    preHandler: app.requirePermissions(['concession:read']),
    schema: {
      tags: ['Shared Services'],
      summary: 'Retrieve active concession scopes and boundaries',
      response: {
        200: { type: 'array', items: { type: 'object', additionalProperties: true } },
        401: problemSchema,
        403: problemSchema
      }
    }
  }, async () => {
    return service.listConcessions();
  });

  app.post<{ Body: SendMessageInput }>('/messages', {
    preHandler: app.requirePermissions(['message:send']),
    schema: {
      tags: ['Shared Services'],
      summary: 'Submit a shared notification request with idempotency',
      body: messageRequestInputSchema,
      response: {
        202: messageResponseSchema,
        400: problemSchema,
        401: problemSchema,
        403: problemSchema
      }
    }
  }, async (request, reply) => {
    const created = await service.requestMessage(
      request.body,
      request.auth.concessionId,
      // Attribution only, not a scoping check — a concession can have more than one
      // assigned MMDA, so this just records the first as "the" assembly on the message.
      request.auth.assemblyIds[0] ?? '01c23cab-b1b2-4dae-b99b-32ea574632d9'
    );
    return reply.code(202).send(created);
  });

  app.get<{ Params: { id: string } }>('/messages/:id', {
    preHandler: app.requirePermissions(['message:send']),
    schema: {
      tags: ['Shared Services'],
      summary: 'Get delivery status of a notification message',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      response: {
        200: messageResponseSchema,
        401: problemSchema,
        403: problemSchema,
        404: problemSchema
      }
    }
  }, async (request) => {
    return service.getMessage(request.params.id, request.auth.concessionId);
  });

  app.get<{ Params: { id: string } }>('/receipts/:id/verification', {
    schema: {
      tags: ['Shared Services'],
      summary: 'Public verification of digital payment receipt authenticity',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string' } } },
      response: {
        200: receiptVerificationResponseSchema,
        404: problemSchema
      }
    }
  }, async (request) => {
    return service.verifyReceipt(request.params.id);
  });
};
