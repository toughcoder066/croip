import type { FastifyPluginAsync, FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { verifyRatepayerToken } from '../../lib/ratepayer-jwt.js';
import { withIdempotency } from '../../lib/idempotency.js';
import {
  ratepayerService,
  type RegisterRatepayerInput,
  type ClaimPropertyInput,
  type DirectoryFilter,
  type LoginInput,
  type VerifyOtpInput,
  type UpdateProfileInput,
  type SelfUpdateProfileInput,
  type ForgotPasswordInput,
  type ResetPasswordInput
} from './service.js';
import {
  problemSchema,
  ratepayerResponseSchema,
  registerRatepayerBodySchema,
  selfRegisterRatepayerBodySchema,
  claimPropertyBodySchema,
  directoryResponseSchema,
  reviewVerificationBodySchema,
  verificationResponseSchema,
  loginBodySchema,
  otpRequiredResponseSchema,
  verifyOtpBodySchema,
  authTokenResponseSchema,
  updateProfileBodySchema,
  selfUpdateProfileBodySchema,
  createVerificationBodySchema,
  forgotPasswordBodySchema,
  resetPasswordBodySchema,
  activityRecordSchema
} from './schemas.js';

// Resolves both WHICH ratepayer an action targets and WHO is actually performing it — the
// two differ whenever staff or a concession act on a ratepayer's behalf, which matters for
// the account activity log (see service.ts's recordActivity): a ratepayer's own token means
// they're acting on themselves (actor === target), while a staff/concession token means the
// actor is that officer/concession, acting on the ratepayer named in the URL.
interface ResolvedActor {
  ratepayerId: string;
  actorId: string;
  actorType: 'RATEPAYER' | 'USER' | 'SERVICE';
}

async function authenticateRatepayerOrStaff(
  app: FastifyInstance,
  request: FastifyRequest<{ Params?: { id?: string; code?: string } }>,
  reply: FastifyReply
): Promise<ResolvedActor> {
  if (app.config.AUTH_MODE === 'disabled') {
    const id = request.params?.id || 'anonymous';
    return { ratepayerId: id, actorId: id, actorType: 'RATEPAYER' };
  }

  const authorization = request.headers.authorization;
  if (!authorization?.startsWith('Bearer ')) {
    throw app.httpErrors.unauthorized('Authorization bearer token is required');
  }

  const token = authorization.slice(7);
  let isRatepayerAuth = false;
  try {
    const claims = await verifyRatepayerToken(token, app.config.RATEPAYER_JWT_SECRET);
    isRatepayerAuth = true;
    // Same revocation check authenticateRatepayer does (plugins/auth.ts) — this helper
    // verifies the token itself directly rather than going through that decorator, so it
    // needs its own copy rather than silently skipping it.
    const revoked = await app.prisma.ratepayerRevokedToken.findUnique({ where: { jti: claims.jti } });
    if (revoked) throw new Error('Token has been revoked (logged out)');
    const targetId = request.params?.id;
    if (targetId && targetId !== 'me' && claims.sub !== targetId && claims.code !== targetId) {
      const rp = await app.prisma.ratepayer.findFirst({
        where: { OR: [{ id: targetId }, { code: targetId }] },
        select: { id: true, code: true }
      });
      if (!rp || (rp.id !== claims.sub && rp.code !== claims.code)) {
        throw app.httpErrors.forbidden('You are not authorized to access another ratepayer\'s profile or resources');
      }
    }
    const ratepayerId = targetId === 'me' || !targetId ? claims.sub : targetId;
    return { ratepayerId, actorId: claims.sub, actorType: 'RATEPAYER' };
  } catch (err: any) {
    if (err.statusCode === 403) throw err;
    if (!isRatepayerAuth) {
      await app.authenticate(request as any, reply);
      const auth = (request as any).auth;
      const ratepayerId = request.params?.id || auth?.subject || 'staff';
      return { ratepayerId, actorId: auth?.subject ?? 'staff', actorType: auth?.actorType ?? 'USER' };
    } else {
      throw app.httpErrors.unauthorized('Invalid or expired authorization token');
    }
  }
}

export const ratepayerRoutes: FastifyPluginAsync = async (app) => {
  const service = ratepayerService(app);

  // idempotencyKey (optional) is what makes this safe for a concession's field agent to
  // sync from offline — the agent's app generates it once, locally, when the ratepayer is
  // first captured, and resends the same key on every sync retry; a replayed request
  // returns the original response instead of creating a second ratepayer. See
  // lib/idempotency.ts for the full mechanism, including why it's race-safe.
  app.post<{ Body: Omit<RegisterRatepayerInput, 'actorId' | 'concessionId'> & { idempotencyKey?: string } }>('/ratepayers', {
    preHandler: app.requirePermissions(['ratepayers:manage']),
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: 'Concession/staff walk-in registers a citizen/corporate ratepayer profile — ratepayers can also self-register, see POST /ratepayers/self-register',
      body: registerRatepayerBodySchema,
      response: { 201: ratepayerResponseSchema, 400: problemSchema, 401: problemSchema, 403: problemSchema, 409: problemSchema }
    }
  }, async (request, reply) => {
    const { idempotencyKey, ...body } = request.body;
    const concessionId = request.auth.concessionId;
    const register = async () => ({
      status: 201,
      body: await service.registerRatepayer({
        ...body,
        actorId: request.auth.subject,
        actorType: request.auth.actorType,
        concessionId
      })
    });

    const result = idempotencyKey
      ? await withIdempotency(app, { concessionId, idempotencyKey, requestBody: body }, register)
      : await register();
    return reply.code(result.status).send(result.body);
  });

  // Public, no auth — lets a ratepayer create their own profile directly through a
  // concession's own ratepayer-facing app, instead of needing to walk into an MMDA office.
  // `concessionCode` identifies which concession this profile belongs to via that
  // concession's public, non-secret code (resolved against platform-governance-service),
  // never its real API client credential, which must stay server-side only. Once created,
  // login works across every concession's app (authenticateRatepayer isn't
  // concession-scoped) — same as a staff-registered profile today.
  app.post<{ Body: Omit<RegisterRatepayerInput, 'actorId' | 'concessionId'> & { concessionCode: string; idempotencyKey?: string } }>(
    '/ratepayers/self-register',
    {
      // Public and unauthenticated by design (see the comment above) — rate-limited per IP
      // so it can't be used for bulk account creation or to hammer the concession-lookup
      // fetch above.
      config: { rateLimit: { max: 5, timeWindow: '15 minutes' } },
      schema: {
        tags: ['Ratepayer Self-Service'],
        summary: 'Ratepayer self-registers their own profile through a concession\'s public app, identifying it by concessionCode',
        body: selfRegisterRatepayerBodySchema,
        response: { 201: ratepayerResponseSchema, 400: problemSchema, 409: problemSchema, 429: problemSchema }
      }
    },
    async (request, reply) => {
      const { concessionCode, idempotencyKey, ...body } = request.body;
      let concessionId: string;
      try {
        const res = await fetch(`${app.config.PLATFORM_GOVERNANCE_URL}/v1/concessions/by-code/${encodeURIComponent(concessionCode)}`);
        if (!res.ok) throw new Error('not found');
        const concession = (await res.json()) as { id: string; status: string };
        if (concession.status !== 'ACTIVE') {
          throw app.httpErrors.badRequest('This concessionaire is no longer active');
        }
        concessionId = concession.id;
      } catch (err: any) {
        if (err.statusCode) throw err;
        throw app.httpErrors.badRequest('Unknown or inactive concession code');
      }

      const register = async () => ({
        status: 201,
        body: await service.registerRatepayer({
          ...body,
          actorId: 'self-service',
          actorType: 'RATEPAYER',
          concessionId
        })
      });

      const result = idempotencyKey
        ? await withIdempotency(app, { concessionId, idempotencyKey, requestBody: body }, register)
        : await register();
      return reply.code(result.status).send(result.body);
    }
  );

  app.post<{ Body: LoginInput }>('/auth/login', {
    // Public, password-bearing, unauthenticated — the one endpoint most worth throttling
    // against brute-force password guessing across many identifiers.
    config: { rateLimit: { max: 10, timeWindow: '5 minutes' } },
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: 'Step 1 of login: check phone/email + password, send an OTP to the registered phone',
      body: loginBodySchema,
      response: { 200: otpRequiredResponseSchema, 401: problemSchema, 429: problemSchema }
    }
  }, async (request) => {
    return service.login(request.body);
  });

  app.post<{ Body: VerifyOtpInput }>('/auth/verify-otp', {
    // Defense-in-depth on top of the existing per-OTP attempt counter (OTP_MAX_ATTEMPTS in
    // service.ts) — that one tracks attempts against a single OTP record; this bounds
    // attempts against this IP across OTPs/identifiers too.
    config: { rateLimit: { max: 10, timeWindow: '5 minutes' } },
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: 'Step 2 of login: confirm the OTP and receive a ratepayer session token',
      body: verifyOtpBodySchema,
      response: { 200: authTokenResponseSchema, 401: problemSchema, 429: problemSchema }
    }
  }, async (request) => {
    return service.verifyOtp(request.body);
  });

  app.post<{ Body: ForgotPasswordInput }>('/auth/forgot-password', {
    // Public and unauthenticated by design — rate-limited so it can't be used to spam an
    // account with OTP emails/SMS, or as a slow account-enumeration oracle.
    config: { rateLimit: { max: 5, timeWindow: '15 minutes' } },
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: 'Step 1 of password reset: send an OTP to the account\'s registered phone/email — same response whether or not the identifier is registered, so this can\'t be used to check who has an account',
      body: forgotPasswordBodySchema,
      response: { 200: otpRequiredResponseSchema, 400: problemSchema, 429: problemSchema }
    }
  }, async (request) => {
    return service.forgotPassword(request.body);
  });

  app.post<{ Body: ResetPasswordInput }>('/auth/reset-password', {
    config: { rateLimit: { max: 10, timeWindow: '5 minutes' } },
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: 'Step 2 of password reset: confirm the OTP, set a new password, and receive a session token',
      body: resetPasswordBodySchema,
      response: { 200: authTokenResponseSchema, 400: problemSchema, 401: problemSchema, 429: problemSchema }
    }
  }, async (request) => {
    return service.resetPassword(request.body);
  });

  // Revokes just this session token — the ratepayer stays logged in on any other device
  // that still holds a different, still-valid token. See plugins/auth.ts's
  // authenticateRatepayer for where a revoked jti actually gets rejected.
  app.post('/auth/logout', {
    preHandler: app.authenticateRatepayer,
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: "Sign out the signed-in ratepayer's current session (authenticated) — revokes just this token, not every session",
      response: { 200: { type: 'object', additionalProperties: true }, 401: problemSchema }
    }
  }, async (request) => {
    return service.logout(request.ratepayerAuth);
  });

  app.get('/ratepayers/me', {
    preHandler: app.authenticateRatepayer,
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: 'Get the signed-in ratepayer\'s own profile (authenticated)',
      response: { 200: { type: 'object', additionalProperties: true }, 401: problemSchema }
    }
  }, async (request) => {
    return service.getRatepayer(request.ratepayerAuth.sub);
  });

  // Self-service update: unlike PATCH /ratepayers/:id (concession-mediated, below), this
  // uses the ratepayer's own login token and omits updateProfile's requireConcessionId
  // argument entirely — the function already skips the "registered by this concession"
  // ownership check when it's not passed, which is exactly right here. Deliberately covers
  // every genuinely self-owned field (more than the concession-mediated update below
  // exposes, e.g. ratepayerType) via selfUpdateProfileBodySchema, which just as
  // deliberately has no `email` property and rejects unknown ones outright — a ratepayer
  // can change anything about their own profile except their email, the concession they
  // registered with (never user-settable at all), or any other immutable field (code, id,
  // status, createdAt).
  app.patch<{ Body: SelfUpdateProfileInput }>('/ratepayers/me', {
    preHandler: app.authenticateRatepayer,
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: "Update the signed-in ratepayer's own profile (authenticated, self-service) — every field except email, registered concession, and other immutable data",
      body: selfUpdateProfileBodySchema,
      response: { 200: { type: 'object', additionalProperties: true }, 400: problemSchema, 401: problemSchema, 404: problemSchema }
    }
  }, async (request) => {
    return service.updateOwnProfile(request.ratepayerAuth.sub, request.body as Record<string, unknown>);
  });

  app.post<{ Body: { provider?: string; providerReference?: string; autoVerify?: boolean } }>(
    '/ratepayers/me/verifications',
    {
      preHandler: app.authenticateRatepayer,
      schema: {
        tags: ['Ratepayer Self-Service'],
        summary: 'Submit or dummy-verify KYC for own authenticated ratepayer profile (authenticated)',
        body: createVerificationBodySchema,
        response: { 201: verificationResponseSchema, 400: problemSchema, 401: problemSchema }
      }
    },
    async (request, reply) => {
      const verification = await service.verifyKyc(request.ratepayerAuth.sub, request.body ?? {}, {
        id: request.ratepayerAuth.sub,
        type: 'RATEPAYER'
      });
      return reply.code(201).send(verification);
    }
  );

  app.get('/ratepayers/me/activity', {
    preHandler: app.authenticateRatepayer,
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: "Chronological account activity log for the signed-in ratepayer's own account (authenticated, self-service)",
      response: { 200: { type: 'array', items: activityRecordSchema }, 401: problemSchema }
    }
  }, async (request) => {
    return service.getActivity(request.ratepayerAuth.sub);
  });

  // Self-service account deletion — same business rule as the concession-mediated delete
  // below (rejected while properties are still linked), just scoped to the caller's own
  // account instead of a concessionId: omits deleteRatepayer's requireConcessionId
  // argument entirely, exactly like updateOwnProfile omits it for PATCH /ratepayers/me.
  app.delete('/ratepayers/me', {
    preHandler: app.authenticateRatepayer,
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: "Delete the signed-in ratepayer's own account (authenticated, self-service) — rejected if properties are still linked",
      response: { 200: { type: 'object', additionalProperties: true }, 400: problemSchema, 401: problemSchema, 404: problemSchema }
    }
  }, async (request) => {
    return service.deleteRatepayer(request.ratepayerAuth.sub, undefined, {
      id: request.ratepayerAuth.sub,
      type: 'RATEPAYER'
    });
  });

  app.get<{ Params: { id: string } }>('/ratepayers/:id', {
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: 'Get ratepayer KYC profile, verification status, and linked properties (authenticated)',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string' } } },
      response: { 200: { type: 'object', additionalProperties: true }, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request, reply) => {
    const actor = await authenticateRatepayerOrStaff(app, request, reply);
    return service.getRatepayer(actor.ratepayerId);
  });

  // Who's calling: staff (request.auth.subject) or a concession's own API client (also
  // request.auth.subject, actorType SERVICE) — requirePermissions always runs
  // app.authenticate first, so request.auth is already populated here either way.
  app.get<{ Params: { id: string } }>('/ratepayers/:id/activity', {
    preHandler: app.requirePermissions(['ratepayers:read']),
    schema: {
      tags: ['Ratepayer Admin'],
      summary: "Chronological account activity log for a ratepayer — every real action taken on the account, not a synthetic narrative",
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string' } } },
      response: { 200: { type: 'array', items: activityRecordSchema }, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request) => {
    return service.getActivity(request.params.id);
  });

  // Update is concession-mediated: only the concession that registered this ratepayer may update them.
  app.patch<{ Params: { id: string }; Body: UpdateProfileInput }>('/ratepayers/:id', {
    preHandler: app.requirePermissions(['ratepayers:manage']),
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: 'Concession updates a ratepayer profile it registered (authenticated, concession-scoped)',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string' } } },
      body: updateProfileBodySchema,
      response: { 200: { type: 'object', additionalProperties: true }, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request) => {
    return service.updateProfile(request.params.id, request.body, request.auth.concessionId, {
      id: request.auth.subject,
      type: request.auth.actorType
    });
  });

  app.post<{ Body: ClaimPropertyInput }>('/ratepayers/claims', {
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: 'Claim ownership or tenancy of a property unit in the Unified Ratepayer Portal (authenticated)',
      body: claimPropertyBodySchema,
      response: { 201: { type: 'object', additionalProperties: true }, 401: problemSchema, 403: problemSchema }
    }
  }, async (request, reply) => {
    const actor = await authenticateRatepayerOrStaff(app, request as any, reply);
    const claim = await service.claimProperty({
      ...request.body,
      ratepayerId: request.body.ratepayerId || actor.ratepayerId
    }, { id: actor.actorId, type: actor.actorType });
    return reply.code(201).send(claim);
  });

  app.post<{ Params: { code: string }; Body: ClaimPropertyInput }>('/properties/:code/claims', {
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: 'Ratepayer claims ownership of a concession-registered property by attaching ownership proof (authenticated)',
      params: { type: 'object', required: ['code'], properties: { code: { type: 'string' } } },
      body: claimPropertyBodySchema,
      response: { 201: { type: 'object', additionalProperties: true }, 401: problemSchema, 403: problemSchema }
    }
  }, async (request, reply) => {
    const actor = await authenticateRatepayerOrStaff(app, request as any, reply);
    const claim = await service.claimProperty({
      ...request.body,
      ratepayerId: request.body.ratepayerId || actor.ratepayerId,
      propertyId: request.body?.propertyId || request.params.code
    }, { id: actor.actorId, type: actor.actorType });
    return reply.code(201).send(claim);
  });

  app.get<{ Params: { id: string } }>('/ratepayers/:id/properties', {
    schema: {
      tags: ['Ratepayer Self-Service'],
      summary: 'List all properties linked to this ratepayer across any MMDA in Ghana (authenticated)',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string' } } },
      response: { 200: { type: 'array', items: { type: 'object', additionalProperties: true } }, 401: problemSchema, 403: problemSchema }
    }
  }, async (request, reply) => {
    const actor = await authenticateRatepayerOrStaff(app, request, reply);
    return service.getMyProperties(actor.ratepayerId);
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
      }, { id: request.auth.subject, type: request.auth.actorType });
    }
  );

  app.post<{ Params: { id: string }; Body: { provider?: string; providerReference?: string; autoVerify?: boolean } }>(
    '/ratepayers/:id/verifications',
    {
      schema: {
        tags: ['Ratepayer Self-Service', 'Ratepayer Admin'],
        summary: 'Submit or dummy-verify KYC for a ratepayer (authenticated)',
        params: {
          type: 'object',
          required: ['id'],
          properties: { id: { type: 'string' } }
        },
        body: createVerificationBodySchema,
        response: { 201: verificationResponseSchema, 400: problemSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema }
      }
    },
    async (request, reply) => {
      const actor = await authenticateRatepayerOrStaff(app, request, reply);
      const verification = await service.verifyKyc(actor.ratepayerId, request.body ?? {}, { id: actor.actorId, type: actor.actorType });
      return reply.code(201).send(verification);
    }
  );

  app.delete<{ Params: { id: string } }>(
    '/ratepayers/:id',
    {
      preHandler: app.requirePermissions(['ratepayers:manage']),
      schema: {
        tags: ['Ratepayer Admin'],
        summary: 'Concession deletes a ratepayer profile it registered (rejected if linked properties exist, authenticated, concession-scoped)',
        params: {
          type: 'object',
          required: ['id'],
          properties: { id: { type: 'string' } }
        },
        response: { 200: { type: 'object', additionalProperties: true }, 400: problemSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema }
      }
    },
    async (request) => {
      return service.deleteRatepayer(request.params.id, request.auth.concessionId, {
        id: request.auth.subject,
        type: request.auth.actorType
      });
    }
  );

  app.delete<{ Params: { id: string; propertyId: string } }>(
    '/ratepayers/:id/properties/:propertyId',
    {
      schema: {
        tags: ['Ratepayer Admin'],
        summary: 'Sever link between a ratepayer and an individual property (authenticated)',
        params: {
          type: 'object',
          required: ['id', 'propertyId'],
          properties: {
            id: { type: 'string' },
            propertyId: { type: 'string', format: 'uuid' }
          }
        },
        response: { 200: { type: 'object', additionalProperties: true }, 401: problemSchema, 403: problemSchema, 404: problemSchema }
      }
    },
    async (request, reply) => {
      const actor = await authenticateRatepayerOrStaff(app, request, reply);
      return service.severPropertyLink(actor.ratepayerId, request.params.propertyId, { id: actor.actorId, type: actor.actorType });
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
      return service.updateStatus(request.params.id, request.body.status, {
        id: request.auth.subject,
        type: request.auth.actorType
      });
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
