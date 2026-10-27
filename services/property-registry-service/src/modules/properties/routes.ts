import type { FastifyPluginAsync } from 'fastify';
import { propertyService, type CreatePropertyInput, type UploadPremisesDocumentInput, type SubmitVerificationInput, type ReviewVerificationInput, type UpdatePropertyInput } from './service.js';
import { withIdempotency } from '../../lib/idempotency.js';
import {
  problemSchema,
  propertyResponseSchema,
  createSinglePropertyBodySchema,
  createBatchPropertiesBodySchema,
  batchPropertiesResponseSchema,
  createUnitBodySchema,
  uploadPremisesDocumentBodySchema,
  submitVerificationBodySchema,
  reviewVerificationBodySchema,
  verificationResponseSchema,
  updatePropertyBodySchema
} from './schemas.js';

export const propertyRoutes: FastifyPluginAsync = async (app) => {
  const service = propertyService(app);

  // idempotencyKey (optional) is what makes this safe for a concession's field agent to
  // sync from offline — the agent's app generates it once, locally, when the property is
  // first captured, and resends the same key on every sync retry; a replayed request
  // returns the original response instead of creating a second property. See
  // lib/idempotency.ts for the full mechanism, including why it's race-safe.
  app.post<{ Body: Omit<CreatePropertyInput, 'concessionId' | 'actorId' | 'actorType'> & { idempotencyKey?: string } }>('/properties', {
    preHandler: app.authenticateConcession(['properties:manage']),
    schema: {
      tags: ['Property Registry'],
      summary: 'Register landed property parcel into national cadastre — concession action, restricted to assigned MMDA. Ratepayers cannot register their own properties; see ratepayer-service for claiming an unclaimed one.',
      body: createSinglePropertyBodySchema,
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
    const { idempotencyKey, ...body } = request.body;
    const concessionId = request.auth.concessionId;
    const register = async () => ({
      status: 201,
      body: await service.createProperty({
        ...body,
        concessionId,
        allowedAssemblyIds: request.auth.assemblyIds,
        actorId: request.auth.subject,
        actorType: request.auth.actorType
      })
    });

    const result = idempotencyKey
      ? await withIdempotency(app, { concessionId, idempotencyKey, requestBody: body }, register)
      : await register();
    return reply.code(result.status).send(result.body);
  });

  app.post<{ Body: { properties: Array<Omit<CreatePropertyInput, 'concessionId' | 'actorId' | 'actorType' | 'staffRef'>>; idempotencyKey?: string; staffRef: string } }>('/properties/batch', {
    preHandler: app.authenticateConcession(['properties:manage']),
    schema: {
      tags: ['Property Registry'],
      summary: 'Concession registers a batch of landed properties within their assigned MMDA territory',
      body: createBatchPropertiesBodySchema,
      response: {
        201: batchPropertiesResponseSchema,
        400: problemSchema,
        401: problemSchema,
        403: problemSchema,
        409: problemSchema,
        503: problemSchema
      }
    }
  }, async (request, reply) => {
    const { idempotencyKey, ...body } = request.body;
    const concessionId = request.auth.concessionId;
    const register = async () => {
      const createdList = await service.createBatchProperties({
        properties: body.properties,
        concessionId,
        allowedAssemblyIds: request.auth.assemblyIds,
        actorId: request.auth.subject,
        actorType: request.auth.actorType,
        staffRef: body.staffRef
      });
      return { status: 201, body: { success: true, count: createdList.length, properties: createdList } };
    };

    const result = idempotencyKey
      ? await withIdempotency(app, { concessionId, idempotencyKey, requestBody: body }, register)
      : await register();
    return reply.code(result.status).send(result.body);
  });

  app.get<{ Querystring: { assemblyId?: string } }>('/properties', {
    preHandler: app.requirePermissions(['properties:read']),
    schema: {
      tags: ['Property Registry'],
      summary: 'Search / list properties platform-wide, optionally filtered to one MMDA',
      querystring: { type: 'object', properties: { assemblyId: { type: 'string', format: 'uuid' } } },
      response: { 200: { type: 'array', items: propertyResponseSchema }, 401: problemSchema, 403: problemSchema }
    }
  }, async (request) => {
    return service.listProperties(request.query?.assemblyId);
  });

  app.get<{ Params: { id: string } }>('/properties/:id', {
    preHandler: app.authenticateConcession(['properties:read']),
    schema: {
      tags: ['Property Registry'],
      summary: 'Retrieve property parcel details, units, and valuation roll status',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      response: { 200: { type: 'object', additionalProperties: true }, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request) => {
    return service.getProperty(request.params.id);
  });

  app.patch<{ Params: { id: string }; Body: UpdatePropertyInput }>('/properties/:id', {
    preHandler: app.authenticateConcession(['properties:manage']),
    schema: {
      tags: ['Property Registry'],
      summary: 'Update property details. If actual property characteristics (use, floors, boundaries, area, structure) are changed, marks property UNASSESSED, unverified, and decouples active valuations.',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string' } } },
      body: updatePropertyBodySchema,
      response: {
        200: { type: 'object', additionalProperties: true },
        400: problemSchema,
        401: problemSchema,
        403: problemSchema,
        404: problemSchema
      }
    }
  }, async (request) => {
    return service.updateProperty(request.params.id, request.body, {
      subject: request.auth.subject,
      actorType: request.auth.actorType,
      concessionId: request.auth.concessionId,
      assemblyIds: request.auth.assemblyIds
    });
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
      request.auth.assemblyIds
    );
    return reply.code(201).send(unit);
  });

  app.post<{ Params: { code: string }; Body: Omit<UploadPremisesDocumentInput, 'propertyCode' | 'concessionId' | 'assemblyIds' | 'actorId'> }>('/properties/:code/documents', {
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
      assemblyIds: request.auth.assemblyIds,
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
    return service.getPropertyDocuments(request.params.code, request.auth.assemblyIds);
  });

  app.post<{ Params: { id: string }; Body: Omit<SubmitVerificationInput, 'propertyId' | 'concessionId' | 'assemblyIds'> }>('/properties/:id/verifications', {
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
      assemblyIds: request.auth.assemblyIds
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
    return service.listVerifications(request.params.id, request.auth.assemblyIds);
  });

  app.patch<{ Params: { id: string }; Body: Omit<ReviewVerificationInput, 'verificationId' | 'concessionId' | 'assemblyIds'> }>('/verifications/:id/review', {
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
      assemblyIds: request.auth.assemblyIds
    });
  });

  app.delete<{ Params: { id: string } }>('/properties/:id', {
    // Was missing a preHandler entirely — every other mutation on this resource requires
    // authenticateConcession(['properties:manage']) (a concession's own token, or CROIP
    // staff administratively), but deletion had no auth check at all, meaning an
    // unauthenticated caller could delete any property. Matched to the sibling endpoints.
    preHandler: app.authenticateConcession(['properties:manage']),
    schema: {
      tags: ['Property Registry'],
      summary: 'Delete individual property parcel and sever all ratepayer links (rejected if property has paid bills)',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      response: { 200: { type: 'object', additionalProperties: true }, 400: problemSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request) => {
    return service.deleteProperty(request.params.id, request.auth.subject, request.auth.actorType);
  });

  app.post('/properties/purge', {
    preHandler: app.requirePermissions(['properties:manage']),
    schema: {
      tags: ['Property Registry'],
      summary: 'Admin purge all registered property records, units, valuations, and verifications',
      response: { 200: { type: 'object', additionalProperties: true }, 401: problemSchema, 403: problemSchema }
    }
  }, async (request) => {
    return service.purgeProperties(request.auth.subject);
  });
};
