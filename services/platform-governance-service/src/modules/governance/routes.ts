import type { FastifyPluginAsync } from 'fastify';
import { governanceService, type CreateUserInput, type UpdateUserInput, type CreateConcessionInput, type AssignAssemblyInput, type RegisterPersonnelInput } from './service.js';
import {
  problemSchema,
  userResponseSchema,
  createUserBodySchema,
  updateUserBodySchema,
  concessionResponseSchema,
  createConcessionBodySchema,
  assignAssemblyBodySchema,
  provisionApiClientResponseSchema,
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
      summary: 'Onboard a partner revenue concessionaire company',
      body: createConcessionBodySchema,
      response: { 201: concessionResponseSchema, 400: problemSchema, 401: problemSchema, 403: problemSchema }
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

  app.post<{ Params: { id: string }; Body: { assemblyId: string; contractStart: string; contractEnd: string } }>('/concessions/:id/assemblies', {
    preHandler: app.requirePermissions(['concessionaires:manage']),
    schema: {
      tags: ['Governance: Concessions'],
      summary: 'Assign an MMDA rating concession territory to a concessionaire',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      body: assignAssemblyBodySchema,
      response: { 201: { type: 'object', additionalProperties: true }, 400: problemSchema, 401: problemSchema, 403: problemSchema }
    }
  }, async (request, reply) => {
    const assignment = await service.assignAssembly({
      concessionId: request.params.id,
      assemblyId: request.body.assemblyId,
      contractStart: request.body.contractStart,
      contractEnd: request.body.contractEnd
    }, request.auth.subject);
    return reply.code(201).send(assignment);
  });

  app.post<{ Params: { id: string } }>('/concessions/:id/api-clients', {
    preHandler: app.requirePermissions(['api_clients:manage']),
    schema: {
      tags: ['Governance: Concessions'],
      summary: 'Provision machine-to-machine API credentials for a concessionaire backend',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      response: { 201: provisionApiClientResponseSchema, 401: problemSchema, 403: problemSchema }
    }
  }, async (request, reply) => {
    const credentials = await service.provisionApiClient(request.params.id, request.auth.subject);
    return reply.code(201).send(credentials);
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

