import type { FastifyPluginAsync } from 'fastify';
import { propertyService, type CreatePropertyInput, type UploadPremisesDocumentInput, type SubmitVerificationInput, type ReviewVerificationInput, type UpdatePropertyInput } from './service.js';
import {
  problemSchema,
  propertyResponseSchema,
  createPropertyBodySchema,
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

  app.post<{ Body: Omit<CreatePropertyInput, 'concessionId' | 'actorId' | 'actorType'> & { assemblyId?: string } }>('/properties', {
    preHandler: app.authenticateStaffOrRatepayer(['properties:manage']),
    schema: {
      tags: ['Property Registry'],
      summary: 'Register landed property parcel into national cadastre — concession action (restricted to assigned MMDA) or ratepayer self-service with bearer token',
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
      ...(isRatepayer ? { createdByRatepayerId: request.auth.subject, registrationSource: 'RATEPAYER' as const } : { registrationSource: 'CONCESSION' as const }),
      concessionId: request.auth.concessionId,
      assemblyId: request.body.assemblyId || request.auth.assemblyId,
      actorId: request.auth.subject,
      actorType: request.auth.actorType
    });

    if (isRatepayer) {
      // Best-effort: the property is already correctly attributed in this service's own
      // database (createdByRatepayerId above) regardless of whether this call succeeds —
      // this just propagates the link to ratepayer-service's own relationship table so
      // the ratepayer sees it under "my properties". Forwards the same ratepayer bearer
      // token the caller used for this request, so ratepayer-service's authenticateRatepayer
      // resolves the ratepayer id itself rather than trusting a body field.
      try {
        const rawOwnership = request.body.ownershipType?.trim().toUpperCase();
        const normalizedOwnership = (rawOwnership === 'PART' || rawOwnership === 'PARTIAL' || rawOwnership === 'CO_OWNER') ? 'PART' : 'FULL';
        const ownershipPercentage = request.body.ownershipPercentage ?? (normalizedOwnership === 'FULL' ? 100.0 : 50.0);

        const response = await fetch(`${app.config.RATEPAYER_SERVICE_URL}/v1/ratepayers/me/properties/link`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(request.headers.authorization ? { Authorization: request.headers.authorization } : {})
          },
          body: JSON.stringify({
            propertyId: created.id,
            unitId: created.defaultUnitId,
            ownershipType: normalizedOwnership,
            ownershipPercentage
          }),
          signal: AbortSignal.timeout(5000)
        });
        if (!response.ok) {
          request.log.error({ status: response.status, body: await response.text() }, 'Failed to link self-registered property to ratepayer profile');
        }
      } catch (err) {
        request.log.error({ err }, 'Failed to reach ratepayer-service to link self-registered property');
      }
    }

    return reply.code(201).send(created);
  });

  app.post<{ Body: { properties: Array<Omit<CreatePropertyInput, 'concessionId' | 'actorId' | 'actorType'>> } }>('/properties/batch', {
    preHandler: app.authenticateStaffOrRatepayer(['properties:manage']),
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
    if (request.auth.actorType === 'RATEPAYER') {
      throw app.httpErrors.forbidden('Batch property registration is only available to concessionaires. Ratepayers can register individual properties.');
    }

    const createdList = await service.createBatchProperties({
      properties: request.body.properties,
      concessionId: request.auth.concessionId,
      actorId: request.auth.subject,
      actorType: request.auth.actorType
    });

    return reply.code(201).send({
      success: true,
      count: createdList.length,
      properties: createdList
    });
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
    preHandler: app.authenticateStaffOrRatepayer(['properties:read']),
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
    preHandler: app.authenticateStaffOrRatepayer(['properties:manage']),
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
      assemblyId: request.auth.assemblyId
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

  app.delete<{ Params: { id: string } }>('/properties/:id', {
    schema: {
      tags: ['Property Registry'],
      summary: 'Delete individual property parcel and sever all ratepayer links (rejected if property has paid bills)',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      response: { 200: { type: 'object', additionalProperties: true }, 400: problemSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request) => {
    return service.deleteProperty(request.params.id, request.auth?.subject ?? 'portal-admin');
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
