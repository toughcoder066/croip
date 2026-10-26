import type { FastifyPluginAsync } from 'fastify';
import { governanceService, type CreateUserInput, type UpdateUserInput, type CreateConcessionInput, type AssignAssemblyInput, type RegisterPersonnelInput } from './service.js';
import {
  problemSchema,
  userResponseSchema,
  createUserBodySchema,
  updateUserBodySchema,
  concessionResponseSchema,
  concessionWithApiClientResponseSchema,
  concessionPublicLookupSchema,
  createConcessionBodySchema,
  assignAssemblyBodySchema,
  apiClientCredentialsResponseSchema,
  apiClientRevokedResponseSchema,
  registerPersonnelBodySchema
} from './schemas.js';

export const governanceRoutes: FastifyPluginAsync = async (app) => {
  const service = governanceService(app);

  // Users / Oversight
  app.post<{ Body: CreateUserInput }>('/users', {
    preHandler: app.requirePermissions(['iam:users_manage']),
    schema: {
      tags: ['Governance: Oversight Users'],
      summary: 'Register or invite a Central Platform government oversight officer',
      body: createUserBodySchema,
      response: { 201: userResponseSchema, 400: problemSchema, 401: problemSchema, 403: problemSchema }
    }
  }, async (request, reply) => {
    const user = await service.createUser(request.body, request.auth.subject);
    return reply.code(201).send(user);
  });

  app.get('/users', {
    preHandler: app.requirePermissions(['iam:users_manage']),
    schema: {
      tags: ['Governance: Oversight Users'],
      summary: 'List Central Platform oversight staff and officers',
      response: { 200: { type: 'array', items: userResponseSchema }, 401: problemSchema, 403: problemSchema }
    }
  }, async () => {
    return service.listUsers();
  });

  app.get('/users/me', {
    schema: {
      tags: ['Governance: Oversight Users'],
      summary: 'Retrieve authenticated oversight officer profile',
      response: { 200: userResponseSchema, 401: problemSchema, 404: problemSchema }
    }
  }, async (request) => {
    return service.getUserByZitadelId(request.auth.subject);
  });

  app.get<{ Params: { id: string } }>('/users/:id', {
    preHandler: app.requirePermissions(['iam:users_manage']),
    schema: {
      tags: ['Governance: Oversight Users'],
      summary: 'Retrieve a single oversight officer profile',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      response: { 200: userResponseSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request) => service.getUserById(request.params.id));

  app.patch<{ Params: { id: string }; Body: UpdateUserInput }>('/users/:id', {
    preHandler: app.requirePermissions(['iam:users_manage']),
    schema: {
      tags: ['Governance: Oversight Users'],
      summary: 'Update officer profile, status or assigned role',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      body: updateUserBodySchema,
      response: { 200: userResponseSchema, 400: problemSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request) => service.updateUser(request.params.id, request.body, request.auth.subject));

  app.post<{ Params: { id: string } }>('/users/:id/resend-invite', {
    preHandler: app.requirePermissions(['iam:users_manage']),
    schema: {
      tags: ['Governance: Oversight Users'],
      summary: 'Re-trigger the Zitadel invite for a user still in PENDING_ACTIVATION',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      response: { 200: userResponseSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema, 409: problemSchema }
    }
  }, async (request) => service.resendInvite(request.params.id, request.auth.subject));

  app.delete<{ Params: { id: string } }>('/users/:id', {
    preHandler: app.requirePermissions(['iam:users_manage']),
    schema: {
      tags: ['Governance: Oversight Users'],
      summary: 'Remove an officer account',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      response: { 200: { type: 'object', additionalProperties: true }, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request) => service.deleteUser(request.params.id, request.auth.subject));

  // Concessions
  app.post<{ Body: CreateConcessionInput }>('/concessions', {
    preHandler: app.requirePermissions(['concessionaires:manage']),
    schema: {
      tags: ['Governance: Concessions'],
      summary: "Onboard a partner revenue concessionaire company — also provisions and emails its first API client",
      body: createConcessionBodySchema,
      response: { 201: concessionWithApiClientResponseSchema, 400: problemSchema, 401: problemSchema, 403: problemSchema }
    }
  }, async (request, reply) => {
    const concession = await service.createConcession(request.body, request.auth.subject);
    return reply.code(201).send(concession);
  });

  app.get('/concessions', {
    preHandler: app.requirePermissions(['concessionaires:read']),
    schema: {
      tags: ['Governance: Concessions'],
      summary: 'List onboarded concessionaires',
      response: { 200: { type: 'array', items: concessionResponseSchema }, 401: problemSchema, 403: problemSchema }
    }
  }, async () => {
    return service.listConcessions();
  });

  app.get<{ Params: { id: string } }>('/concessions/:id', {
    preHandler: app.requirePermissions(['concessionaires:read']),
    schema: {
      tags: ['Governance: Concessions'],
      summary: 'Get a single concessionaire',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      response: { 200: concessionResponseSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request) => service.getConcession(request.params.id));

  // Internal/public, deliberately unauthenticated — a concession's own public
  // ratepayer-facing app embeds its plain, non-secret `code` and calls this to identify
  // itself when a ratepayer self-registers (see ratepayer-service's POST
  // /ratepayers/self-register). Returns only {id, code, name, status} — never the
  // confidential API client credential.
  app.get<{ Params: { code: string } }>('/concessions/by-code/:code', {
    schema: {
      tags: ['Governance: Concessions'],
      summary: "Resolve a concessionaire's id by its public code (no auth — used by self-registration flows)",
      params: { type: 'object', required: ['code'], properties: { code: { type: 'string' } } },
      response: { 200: concessionPublicLookupSchema, 404: problemSchema }
    }
  }, async (request) => service.getConcessionByCode(request.params.code));

  // Internal/public, deliberately unauthenticated — the by-code lookup's mirror image, for
  // server-to-server callers that only have a stored concessionId in hand (ratepayer-service
  // resolving a concession's display name to white-label a login/password-reset OTP email,
  // long after the citizen last supplied the concession's code). Same minimal field set.
  app.get<{ Params: { id: string } }>('/concessions/by-id/:id', {
    schema: {
      tags: ['Governance: Concessions'],
      summary: "Resolve a concessionaire's public display info by id (no auth — used by internal white-labeling lookups)",
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      response: { 200: concessionPublicLookupSchema, 404: problemSchema }
    }
  }, async (request) => service.getConcessionById(request.params.id));

  app.post<{ Params: { id: string } }>('/concessions/:id/deactivate', {
    preHandler: app.requirePermissions(['concessionaires:manage']),
    schema: {
      tags: ['Governance: Concessions'],
      summary: 'Offboard a concessionaire (sets status to INACTIVE; does not delete history)',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      response: { 200: concessionResponseSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request) => service.deactivateConcession(request.params.id, request.auth.subject));

  app.get<{ Params: { id: string } }>('/concessions/:id/assemblies', {
    preHandler: app.requirePermissions(['concessionaires:read']),
    schema: {
      tags: ['Governance: Concessions'],
      summary: 'List MMDAs assigned to a concessionaire',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      response: { 200: { type: 'array', items: { type: 'object', additionalProperties: true } }, 401: problemSchema, 403: problemSchema }
    }
  }, async (request) => service.listAssignedAssemblies(request.params.id));

  app.get<{ Params: { id: string } }>('/concessions/:id/api-clients', {
    preHandler: app.requirePermissions(['api_clients:manage']),
    schema: {
      tags: ['Governance: Concessions'],
      summary: "List a concessionaire's API clients (never includes secrets — those are shown once, at provisioning time, in the provision response)",
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      response: { 200: { type: 'array', items: { type: 'object', additionalProperties: true } }, 401: problemSchema, 403: problemSchema }
    }
  }, async (request) => service.listApiClients(request.params.id));

  app.post<{ Params: { id: string }; Body: { assemblyId: string; contractEnd: string } }>('/concessions/:id/assemblies', {
    preHandler: app.requirePermissions(['concessionaires:manage']),
    schema: {
      tags: ['Governance: Concessions'],
      summary: 'Assign an MMDA rating concession territory to a concessionaire — the contract starts immediately',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      body: assignAssemblyBodySchema,
      response: { 201: { type: 'object', additionalProperties: true }, 400: problemSchema, 401: problemSchema, 403: problemSchema, 409: problemSchema }
    }
  }, async (request, reply) => {
    const assignment = await service.assignAssembly({
      concessionId: request.params.id,
      assemblyId: request.body.assemblyId,
      contractEnd: request.body.contractEnd
    }, request.auth.subject);
    return reply.code(201).send(assignment);
  });

  // Administrative override: CROIP staff rotating any concession's credential (e.g. the
  // concessionaire lost all access and contacted support). The concession's own self-service
  // equivalent is POST /concessions/me/api-clients/rotate below, gated on a different
  // permission so staff and concessions can never reach into each other's scope.
  app.post<{ Params: { id: string } }>('/concessions/:id/api-clients/rotate', {
    preHandler: app.requirePermissions(['api_clients:manage']),
    schema: {
      tags: ['Governance: Concessions'],
      summary: "Rotate a concessionaire's API credential (revokes the current one at Zitadel, issues and emails a new one)",
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      response: { 201: apiClientCredentialsResponseSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request, reply) => {
    const credentials = await service.rotateApiClient(request.params.id, request.auth.subject);
    return reply.code(201).send(credentials);
  });

  app.post<{ Params: { id: string } }>('/concessions/:id/api-clients/revoke', {
    preHandler: app.requirePermissions(['api_clients:manage']),
    schema: {
      tags: ['Governance: Concessions'],
      summary: "Revoke a concessionaire's API credential without issuing a replacement",
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      response: { 200: apiClientRevokedResponseSchema, 401: problemSchema, 403: problemSchema, 409: problemSchema }
    }
  }, async (request) => service.revokeApiClient(request.params.id, request.auth.subject));

  // Self-service: a concession's own API client calls these with its own current Bearer
  // token — concessionId is taken from that token's iDARMS context claim, never from a URL
  // param, so a concession can only ever rotate or revoke its own credential. Requires the
  // SELF_SERVICE_API_CLIENT_ROLE permission (see service.ts), granted only to concession
  // machine users, never to any CROIP staff role.
  app.get('/concessions/me/api-clients', {
    preHandler: app.requirePermissions(['api_clients:self_manage']),
    schema: {
      tags: ['Governance: Concessions'],
      summary: 'List your own API clients (never includes secrets — those are shown once, at issuance time)',
      response: { 200: { type: 'array', items: { type: 'object', additionalProperties: true } }, 401: problemSchema, 403: problemSchema }
    }
  }, async (request) => service.listApiClients(request.auth.concessionId));

  app.post('/concessions/me/api-clients/rotate', {
    preHandler: app.requirePermissions(['api_clients:self_manage']),
    schema: {
      tags: ['Governance: Concessions'],
      summary: 'Rotate your own API credential — revokes the current one and issues and emails a new one. You can never have two active credentials at once.',
      response: { 201: apiClientCredentialsResponseSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request, reply) => {
    const credentials = await service.rotateApiClient(request.auth.concessionId, request.auth.subject);
    return reply.code(201).send(credentials);
  });

  app.post('/concessions/me/api-clients/revoke', {
    preHandler: app.requirePermissions(['api_clients:self_manage']),
    schema: {
      tags: ['Governance: Concessions'],
      summary: 'Revoke your own API credential without issuing a replacement',
      response: { 200: apiClientRevokedResponseSchema, 401: problemSchema, 403: problemSchema, 409: problemSchema }
    }
  }, async (request) => service.revokeApiClient(request.auth.concessionId, request.auth.subject));

  // Internal, service-to-service, deliberately unauthenticated — every other CROIP
  // service's auth.ts calls this with a verified JWT's own `client_id` claim to resolve
  // which concession it belongs to, instead of trusting a claim injected into the token
  // itself (see getApiClientContext). The clientId is not a secret — it is already present,
  // in plain text, in the JWT the caller already holds; this endpoint never returns a
  // client secret. Matches the existing no-auth convention for internal calls elsewhere in
  // this platform (e.g. ratepayer-service's DELETE /properties/:propertyId/links).
  app.get<{ Params: { clientId: string } }>('/api-clients/:clientId/context', {
    schema: {
      tags: ['Governance: Concessions'],
      summary: "Resolve an API client's concession context and permissions by its clientId (internal, service-to-service)",
      params: { type: 'object', required: ['clientId'], properties: { clientId: { type: 'string' } } },
      response: { 200: { type: 'object', additionalProperties: true }, 404: problemSchema }
    }
  }, async (request, reply) => {
    const context = await service.getApiClientContext(request.params.clientId);
    if (!context) return reply.code(404).send({
      type: 'https://croip.gov.gh/problems/not-found', title: 'Unknown or revoked API client', status: 404,
      code: 'NOT_FOUND', requestId: request.id
    });
    return context;
  });

  app.post<{ Params: { id: string }; Body: { externalStaffRef: string; fullName: string; phone: string } }>('/concessions/:id/personnel', {
    preHandler: app.requirePermissions(['concessionaires:manage']),
    schema: {
      tags: ['Governance: Concessions'],
      summary: 'Register external concession field personnel for audit verification trails',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      body: registerPersonnelBodySchema,
      response: { 201: { type: 'object', additionalProperties: true }, 400: problemSchema, 401: problemSchema, 403: problemSchema }
    }
  }, async (request, reply) => {
    const personnel = await service.registerPersonnel({
      concessionId: request.params.id,
      externalStaffRef: request.body.externalStaffRef,
      fullName: request.body.fullName,
      phone: request.body.phone
    }, request.auth.subject);
    return reply.code(201).send(personnel);
  });

  app.get<{ Params: { id: string } }>('/concessions/:id/personnel', {
    preHandler: app.requirePermissions(['concessionaires:read']),
    schema: {
      tags: ['Governance: Concessions'],
      summary: 'List external field personnel for a concession',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      response: { 200: { type: 'array', items: { type: 'object', additionalProperties: true } }, 401: problemSchema, 403: problemSchema }
    }
  }, async (request) => {
    return service.listPersonnel(request.params.id);
  });

  app.post('/concessions/purge', {
    preHandler: app.requirePermissions(['concessionaires:manage']),
    schema: {
      tags: ['Governance: Concessions'],
      summary: 'Admin purge all partner concessions, personnel, and API clients, preserving superuser accounts',
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            purged: {
              type: 'object',
              properties: {
                concessions: { type: 'integer' },
                personnel: { type: 'integer' },
                apiClients: { type: 'integer' },
                assemblies: { type: 'integer' },
                users: { type: 'integer' },
                userRoles: { type: 'integer' },
                socialConnections: { type: 'integer' }
              }
            },
            preserved: {
              type: 'object',
              properties: {
                superusers: { type: 'array', items: { type: 'string' } }
              }
            }
          }
        },
        401: problemSchema,
        403: problemSchema
      }
    }
  }, async (request) => {
    return service.purgeConcessions(request.auth.subject);
  });
};

