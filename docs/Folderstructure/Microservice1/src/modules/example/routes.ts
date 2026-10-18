import type { FastifyPluginAsync } from 'fastify';
import { exampleService } from './service.js';
import { problemSchema, resourceResponseSchema } from './schemas.js';

interface CreateBody { name: string }
interface IdParams { id: string }

export const exampleRoutes: FastifyPluginAsync = async (app) => {
  const service = exampleService(app);

  app.post<{ Body: CreateBody }>('/', {
    preHandler: app.requirePermissions(['example:write']),
    schema: {
      tags: ['Example'],
      summary: 'Create an example resource',
      body: {
        type: 'object', additionalProperties: false, required: ['name'],
        properties: { name: { type: 'string', minLength: 1, maxLength: 200 } }
      },
      response: { 201: resourceResponseSchema, 400: problemSchema, 401: problemSchema, 403: problemSchema }
    }
  }, async (request, reply) => {
    const created = await service.create({
      name: request.body.name,
      concessionId: request.auth.concessionId,
      assemblyId: request.auth.assemblyId,
      actorId: request.auth.subject,
      correlationId: request.id
    });
    return reply.code(201).send(created);
  });

  app.get<{ Params: IdParams }>('/:id', {
    preHandler: app.requirePermissions(['example:read']),
    schema: {
      tags: ['Example'],
      summary: 'Get an example resource within the caller context',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      response: { 200: resourceResponseSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request) => service.get(request.params.id, request.auth.concessionId, request.auth.assemblyId));
};
