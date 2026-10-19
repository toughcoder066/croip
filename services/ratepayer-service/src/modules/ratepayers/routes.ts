import type { FastifyPluginAsync } from 'fastify';
import { ratepayerService, type RegisterRatepayerInput, type ClaimPropertyInput, type DirectoryFilter } from './service.js';
import {
  problemSchema,
  ratepayerResponseSchema,
  registerRatepayerBodySchema,
  claimPropertyBodySchema,
  directoryResponseSchema,
  reviewVerificationBodySchema,
  verificationResponseSchema
} from './schemas.js';

export const ratepayerRoutes: FastifyPluginAsync = async (app) => {
  const service = ratepayerService(app);

  app.post<{ Body: Omit<RegisterRatepayerInput, 'actorId'> }>('/ratepayers', {
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: 'Register citizen/corporate ratepayer profile for Web Portal or Mobile App',
      body: registerRatepayerBodySchema,
      response: { 201: ratepayerResponseSchema, 400: problemSchema }
    }
  }, async (request, reply) => {
    const created = await service.registerRatepayer({
      ...request.body,
      actorId: request.id
    });
    return reply.code(201).send(created);
  });

  app.get<{ Params: { id: string } }>('/ratepayers/:id', {
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: 'Get ratepayer KYC profile, verification status, and linked properties',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      // additionalProperties:true is required here: a bare { type: 'object' } with no declared
      // properties tells fast-json-stringify there is nothing to serialize, and it emits {}
      // regardless of what the handler actually returns.
      response: { 200: { type: 'object', additionalProperties: true }, 404: problemSchema }
    }
  }, async (request) => {
    return service.getRatepayer(request.params.id);
  });

  app.post<{ Body: ClaimPropertyInput }>('/ratepayers/claims', {
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: 'Claim ownership or tenancy of a property unit in the Unified Ratepayer Portal',
      body: claimPropertyBodySchema,
      response: { 201: { type: 'object', additionalProperties: true } }
    }
  }, async (request, reply) => {
    const claim = await service.claimProperty(request.body);
    return reply.code(201).send(claim);
  });

  app.post<{ Params: { code: string }; Body: ClaimPropertyInput }>('/properties/:code/claims', {
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: 'Ratepayer claims ownership of a concession-registered property by attaching ownership proof',
      params: { type: 'object', required: ['code'], properties: { code: { type: 'string' } } },
      body: claimPropertyBodySchema,
      response: { 201: { type: 'object', additionalProperties: true } }
    }
  }, async (request, reply) => {
    const claim = await service.claimProperty({
      ...request.body,
      propertyId: request.body?.propertyId || request.params.code
    });
    return reply.code(201).send(claim);
  });

  app.get<{ Params: { id: string } }>('/ratepayers/:id/properties', {
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: 'List all properties linked to this ratepayer across any MMDA in Ghana',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      response: { 200: { type: 'array', items: { type: 'object', additionalProperties: true } } }
    }
  }, async (request) => {
    return service.getMyProperties(request.params.id);
  });

  app.get('/ratepayers', {
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: 'Get ratepayer summary metrics',
      response: { 200: { type: 'object', additionalProperties: true } }
    }
  }, async () => {
    const [totalRatepayers, totalClaims, totalVerifications] = await Promise.all([
      app.prisma.ratepayer.count(),
      app.prisma.propertyRatepayerLink.count(),
      app.prisma.ratepayerVerification.count()
    ]);
    return { totalRatepayers, totalClaims, totalVerifications };
  });

  app.get<{ Querystring: DirectoryFilter }>('/ratepayers/directory', {
    preHandler: app.requirePermissions(['ratepayers:read']),
    schema: {
      tags: ['Ratepayer Admin'],
      summary: 'CROIP portal: paginated, searchable ratepayer directory',
      querystring: {
        type: 'object',
        properties: {
          search: { type: 'string' },
          status: { type: 'string', enum: ['ACTIVE', 'SUSPENDED', 'DEACTIVATED'] },
          assemblyId: { type: 'string', format: 'uuid' },
          page: { type: 'integer', minimum: 1, default: 1 },
          pageSize: { type: 'integer', minimum: 1, maximum: 100, default: 20 }
        }
      },
      response: { 200: directoryResponseSchema, 401: problemSchema, 403: problemSchema }
    }
  }, async (request) => {
    return service.listDirectory(request.query ?? {});
  });

  app.patch<{ Params: { id: string; verificationId: string }; Body: { verificationStatus: 'VERIFIED' | 'REJECTED' } }>(
    '/ratepayers/:id/verifications/:verificationId',
    {
      preHandler: app.requirePermissions(['ratepayers:manage']),
      schema: {
        tags: ['Ratepayer Admin'],
        summary: 'CROIP portal: oversight official approves or rejects a ratepayer KYC verification',
        params: {
          type: 'object',
          required: ['id', 'verificationId'],
          properties: { id: { type: 'string', format: 'uuid' }, verificationId: { type: 'string', format: 'uuid' } }
        },
        body: reviewVerificationBodySchema,
        response: { 200: verificationResponseSchema, 400: problemSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema }
      }
    },
    async (request) => {
      return service.reviewVerification({
        ratepayerId: request.params.id,
        verificationId: request.params.verificationId,
        verificationStatus: request.body.verificationStatus
      });
    }
  );
};
