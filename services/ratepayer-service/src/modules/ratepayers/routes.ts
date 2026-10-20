import type { FastifyPluginAsync } from 'fastify';
import {
  ratepayerService,
  type RegisterRatepayerInput,
  type ClaimPropertyInput,
  type DirectoryFilter,
  type LoginInput,
  type VerifyOtpInput,
  type UpdateProfileInput,
  type LinkOwnPropertyInput
} from './service.js';
import {
  problemSchema,
  ratepayerResponseSchema,
  registerRatepayerBodySchema,
  claimPropertyBodySchema,
  directoryResponseSchema,
  reviewVerificationBodySchema,
  verificationResponseSchema,
  loginBodySchema,
  otpRequiredResponseSchema,
  verifyOtpBodySchema,
  authTokenResponseSchema,
  updateProfileBodySchema,
  linkOwnPropertyBodySchema,
  createVerificationBodySchema
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

  app.post<{ Body: LoginInput }>('/auth/login', {
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: 'Step 1 of login: check phone/email + password, send an OTP to the registered phone',
      body: loginBodySchema,
      response: { 200: otpRequiredResponseSchema, 401: problemSchema }
    }
  }, async (request) => {
    return service.login(request.body);
  });

  app.post<{ Body: VerifyOtpInput }>('/auth/verify-otp', {
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: 'Step 2 of login: confirm the OTP and receive a ratepayer session token',
      body: verifyOtpBodySchema,
      response: { 200: authTokenResponseSchema, 401: problemSchema }
    }
  }, async (request) => {
    return service.verifyOtp(request.body);
  });

  app.patch<{ Body: UpdateProfileInput }>('/ratepayers/me', {
    preHandler: app.authenticateRatepayer,
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: 'Complete or update the signed-in ratepayer\'s own profile',
      body: updateProfileBodySchema,
      response: { 200: ratepayerResponseSchema, 401: problemSchema }
    }
  }, async (request) => {
    return service.updateProfile(request.ratepayerAuth.sub, request.body);
  });

  app.post<{ Body: LinkOwnPropertyInput }>('/ratepayers/me/properties/link', {
    preHandler: app.authenticateRatepayer,
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: 'Internal: called by property-registry-service right after a ratepayer self-registers a property, to link it to their own profile',
      body: linkOwnPropertyBodySchema,
      response: { 201: { type: 'object', additionalProperties: true }, 401: problemSchema, 404: problemSchema }
    }
  }, async (request, reply) => {
    const link = await service.linkOwnProperty(request.ratepayerAuth.sub, request.body);
    return reply.code(201).send(link);
  });

  app.get('/ratepayers/me', {
    preHandler: app.authenticateRatepayer,
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: 'Get the signed-in ratepayer\'s own profile',
      response: { 200: { type: 'object', additionalProperties: true }, 401: problemSchema }
    }
  }, async (request) => {
    return service.getRatepayer(request.ratepayerAuth.sub);
  });

  app.post<{ Body: { provider?: string; providerReference?: string; autoVerify?: boolean } }>(
    '/ratepayers/me/verifications',
    {
      preHandler: app.authenticateRatepayer,
      schema: {
        tags: ['Ratepayer Self-Service'],
        summary: 'Submit or dummy-verify KYC for own authenticated ratepayer profile (GHANA_CARD, PASSPORT, DRIVERS_LICENSE; archives previous)',
        body: createVerificationBodySchema,
        response: { 201: verificationResponseSchema, 400: problemSchema, 401: problemSchema }
      }
    },
    async (request, reply) => {
      const verification = await service.verifyKyc(request.ratepayerAuth.sub, request.body ?? {});
      return reply.code(201).send(verification);
    }
  );

  app.get<{ Params: { id: string } }>('/ratepayers/:id', {
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: 'Get ratepayer KYC profile, verification status, and linked properties',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string' } } },
      // additionalProperties:true is required here: a bare { type: 'object' } with no declared
      // properties tells fast-json-stringify there is nothing to serialize, and it emits {}
      // regardless of what the handler actually returns.
      response: { 200: { type: 'object', additionalProperties: true }, 404: problemSchema }
    }
  }, async (request) => {
    return service.getRatepayer(request.params.id);
  });

  app.patch<{ Params: { id: string }; Body: UpdateProfileInput }>('/ratepayers/:id', {
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: 'Update ratepayer profile, address, and pinpoint location by ID or Code',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string' } } },
      body: updateProfileBodySchema,
      response: { 200: { type: 'object', additionalProperties: true }, 404: problemSchema }
    }
  }, async (request) => {
    return service.updateProfile(request.params.id, request.body);
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

  app.post<{ Params: { id: string }; Body: { provider?: string; providerReference?: string; autoVerify?: boolean } }>(
    '/ratepayers/:id/verifications',
    {
      schema: {
        tags: ['Ratepayer Self-Service', 'Ratepayer Admin'],
        summary: 'Submit or dummy-verify KYC for a ratepayer',
        params: {
          type: 'object',
          required: ['id'],
          properties: { id: { type: 'string', format: 'uuid' } }
        },
        body: createVerificationBodySchema,
        response: { 201: verificationResponseSchema, 400: problemSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema }
      }
    },
    async (request, reply) => {
      const verification = await service.verifyKyc(request.params.id, request.body ?? {});
      return reply.code(201).send(verification);
    }
  );

  app.delete<{ Params: { id: string } }>(
    '/ratepayers/:id',
    {
      schema: {
        tags: ['Ratepayer Admin'],
        summary: 'Delete individual ratepayer profile (rejected if linked properties exist)',
        params: {
          type: 'object',
          required: ['id'],
          properties: { id: { type: 'string', format: 'uuid' } }
        },
        response: { 200: { type: 'object', additionalProperties: true }, 400: problemSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema }
      }
    },
    async (request) => {
      return service.deleteRatepayer(request.params.id);
    }
  );

  app.delete<{ Params: { id: string; propertyId: string } }>(
    '/ratepayers/:id/properties/:propertyId',
    {
      schema: {
        tags: ['Ratepayer Admin'],
        summary: 'Sever link between a ratepayer and an individual property',
        params: {
          type: 'object',
          required: ['id', 'propertyId'],
          properties: { id: { type: 'string', format: 'uuid' }, propertyId: { type: 'string', format: 'uuid' } }
        },
        response: { 200: { type: 'object', additionalProperties: true }, 401: problemSchema, 403: problemSchema, 404: problemSchema }
      }
    },
    async (request) => {
      return service.severPropertyLink(request.params.id, request.params.propertyId);
    }
  );

  app.delete<{ Params: { propertyId: string } }>(
    '/properties/:propertyId/links',
    {
      schema: {
        tags: ['Ratepayer Admin'],
        summary: 'Internal/admin: sever all ratepayer links for a property (called on property deletion)',
        params: {
          type: 'object',
          required: ['propertyId'],
          properties: { propertyId: { type: 'string', format: 'uuid' } }
        },
        response: { 200: { type: 'object', additionalProperties: true } }
      }
    },
    async (request) => {
      return service.severAllLinksForProperty(request.params.propertyId);
    }
  );

  app.patch<{ Params: { id: string }; Body: { status: string } }>(
    '/ratepayers/:id/status',
    {
      preHandler: app.requirePermissions(['ratepayers:manage']),
      schema: {
        tags: ['Ratepayer Admin'],
        summary: 'CROIP portal: oversight official updates a ratepayer account status (ACTIVE, SUSPENDED, DEACTIVATED)',
        params: {
          type: 'object',
          required: ['id'],
          properties: { id: { type: 'string', format: 'uuid' } }
        },
        body: {
          type: 'object',
          required: ['status'],
          properties: {
            status: { type: 'string', enum: ['ACTIVE', 'SUSPENDED', 'DEACTIVATED'] }
          }
        },
        response: { 200: ratepayerResponseSchema, 400: problemSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema }
      }
    },
    async (request) => {
      return service.updateStatus(request.params.id, request.body.status);
    }
  );

  app.post(
    '/ratepayers/purge',
    {
      schema: {
        tags: ['Ratepayer Admin'],
        summary: 'Admin purge all ratepayer profiles, verifications, OTPs, and links',
        response: { 200: { type: 'object', additionalProperties: true } }
      }
    },
    async () => {
      return service.purgeRatepayers();
    }
  );
};
