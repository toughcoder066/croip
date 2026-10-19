import type { FastifyPluginAsync } from 'fastify';
import { propertyService, type CreatePropertyInput, type UploadPremisesDocumentInput, type SubmitVerificationInput, type ReviewVerificationInput } from './service.js';
import { problemSchema, propertyResponseSchema, createPropertyBodySchema, createUnitBodySchema, uploadPremisesDocumentBodySchema, submitVerificationBodySchema, reviewVerificationBodySchema, verificationResponseSchema } from './schemas.js';

export const propertyRoutes: FastifyPluginAsync = async (app) => {
  const service = propertyService(app);

  app.post<{ Body: Omit<CreatePropertyInput, 'concessionId' | 'actorId'> & { assemblyId?: string } }>('/properties', {
    preHandler: app.authenticateStaffOrRatepayer(['properties:manage']),
    schema: {
      tags: ['Property Registry'],
      summary: 'Register landed property parcel into national cadastre — staff/concession action, or ratepayer self-service with a valid ratepayer session',
      body: createPropertyBodySchema,
      response: {
        201: propertyResponseSchema,
        400: problemSchema,
        401: problemSchema,
        403: problemSchema,
        409: problemSchema,
        503: problemSchema
      }
    }
  }, async (request, reply) => {
    const isRatepayer = request.auth.actorType === 'RATEPAYER';
    const created = await service.createProperty({
      ...request.body,
      // A ratepayer can only ever register a property as themselves — the body's own
      // createdByRatepayerId/registrationSource are ignored for this actor type so one
      // ratepayer can't claim to be registering on another's behalf.
      ...(isRatepayer ? { createdByRatepayerId: request.auth.subject, registrationSource: 'RATEPAYER' as const } : {}),
      concessionId: request.auth.concessionId,
      assemblyId: (isRatepayer && request.body.assemblyId) || request.auth.assemblyId,
      actorId: request.auth.subject
    });
    return reply.code(201).send(created);
  });

  app.get('/properties', {
    preHandler: app.requirePermissions(['properties:read']),
    schema: {
      tags: ['Property Registry'],
      summary: 'Search / list properties within caller assembly context',
      response: { 200: { type: 'array', items: propertyResponseSchema }, 401: problemSchema, 403: problemSchema }
    }
  }, async (request) => {
    return service.listProperties(request.auth.assemblyId);
  });

  app.get<{ Params: { id: string } }>('/properties/:id', {
    preHandler: app.requirePermissions(['properties:read']),
    schema: {
      tags: ['Property Registry'],
      summary: 'Retrieve property parcel details, units, and valuation roll status',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      response: { 200: { type: 'object', additionalProperties: true }, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request) => {
    return service.getProperty(request.params.id, request.auth.assemblyId);
  });

  app.post<{ Params: { id: string }; Body: { unitIdentifier: string; unitType?: string; floorLevel?: number } }>('/properties/:id/units', {
    preHandler: app.requirePermissions(['properties:manage']),
    schema: {
      tags: ['Property Registry'],
      summary: 'Declare sectional sub-unit within property (apartment, shop, suite)',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      body: createUnitBodySchema,
      response: { 201: { type: 'object', additionalProperties: true }, 400: problemSchema, 401: problemSchema, 403: problemSchema }
    }
  }, async (request, reply) => {
    const unit = await service.addUnit(
      request.params.id,
      request.body.unitIdentifier,
      request.body.unitType ?? 'WHOLE_BUILDING',
      request.body.floorLevel ?? 0,
      request.auth.assemblyId
    );
    return reply.code(201).send(unit);
  });

  app.post<{ Params: { code: string }; Body: Omit<UploadPremisesDocumentInput, 'propertyCode' | 'concessionId' | 'assemblyId' | 'actorId'> }>('/properties/:code/documents', {
    preHandler: app.requirePermissions(['properties:manage']),
    schema: {
      tags: ['Property Registry'],
      summary: 'Concession staff uploads ownership verification documents for a ratepayer while on field premises',
      params: { type: 'object', required: ['code'], properties: { code: { type: 'string' } } },
      body: uploadPremisesDocumentBodySchema,
      response: { 201: { type: 'object', additionalProperties: true }, 400: problemSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request, reply) => {
    const doc = await service.uploadPremisesDocument({
      ...request.body,
      propertyCode: request.params.code,
      concessionId: request.auth.concessionId,
      assemblyId: request.auth.assemblyId,
      actorId: request.auth.subject
    });
    return reply.code(201).send(doc);
  });

  app.get<{ Params: { code: string } }>('/properties/:code/documents', {
    preHandler: app.requirePermissions(['properties:read']),
    schema: {
      tags: ['Property Registry'],
      summary: 'List all ownership and verification documents attached to a property',
      params: { type: 'object', required: ['code'], properties: { code: { type: 'string' } } },
      response: { 200: { type: 'array', items: { type: 'object', additionalProperties: true } }, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request) => {
    return service.getPropertyDocuments(request.params.code, request.auth.assemblyId);
  });

  app.post<{ Params: { id: string }; Body: Omit<SubmitVerificationInput, 'propertyId' | 'concessionId' | 'assemblyId'> }>('/properties/:id/verifications', {
    preHandler: app.requirePermissions(['properties:verify']),
    schema: {
      tags: ['Property Registry'],
      summary: 'Concessionaire agent submits a field verification of a property',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      body: submitVerificationBodySchema,
      response: { 201: verificationResponseSchema, 400: problemSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request, reply) => {
    const verification = await service.submitVerification({
      ...request.body,
      propertyId: request.params.id,
      concessionId: request.auth.concessionId,
      assemblyId: request.auth.assemblyId
    });
    return reply.code(201).send(verification);
  });

  app.get<{ Params: { id: string } }>('/properties/:id/verifications', {
    preHandler: app.requirePermissions(['properties:read']),
    schema: {
      tags: ['Property Registry'],
      summary: 'List field verifications submitted for a property',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      response: { 200: { type: 'array', items: verificationResponseSchema }, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request) => {
    return service.listVerifications(request.params.id, request.auth.assemblyId);
  });

  app.patch<{ Params: { id: string }; Body: Omit<ReviewVerificationInput, 'verificationId' | 'concessionId' | 'assemblyId'> }>('/verifications/:id/review', {
    preHandler: app.requirePermissions(['properties:verify:review']),
    schema: {
      tags: ['Property Registry'],
      summary: 'Concessionaire officer approves or rejects a field verification',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      body: reviewVerificationBodySchema,
      response: { 200: verificationResponseSchema, 400: problemSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request) => {
    return service.reviewVerification({
      ...request.body,
      verificationId: request.params.id,
      concessionId: request.auth.concessionId,
      assemblyId: request.auth.assemblyId
    });
  });
};
