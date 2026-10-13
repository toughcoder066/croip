import type { FastifyPluginAsync } from 'fastify';
import { Permissions } from '@croip/contracts';
import {
  CreateConcessionaireSchema,
  UpdateConcessionaireStatusSchema,
  CreateMunicipalAssemblySchema,
  AssignConcessionSchema,
  CreateApiClientSchema,
  CreateConcessionaireFastifySchema,
  UpdateConcessionaireStatusFastifySchema,
  CreateMunicipalAssemblyFastifySchema,
  AssignConcessionFastifySchema,
  CreateApiClientFastifySchema,
  AdminConcessionaireQueryFastifySchema,
  ConcessionaireIdParamFastifySchema,
  AssignmentIdParamFastifySchema,
  ApiClientParamsFastifySchema
} from './schemas.js';
import {
  generateClientId,
  generateClientSecret,
  hashClientSecret
} from './crypto-utils.js';
import { BadRequestError, NotFoundError, ConflictError, ForbiddenError } from '../../lib/errors.js';
import { appendOutboxEvent } from '../../events/outbox.js';
import { domainEvent } from '../../events/envelope.js';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Concessionaire & MMDA Municipal Territory Management Route Plugin.
 *
 * Implements administrative controls for:
 * 1. Partner Concessionaire onboarding & lifecycle management.
 * 2. Metropolitan, Municipal, and District Assemblies (MMDA) catalog.
 * 3. Territorial concession jurisdiction assignment with single-active concessionaire enforcement.
 * 4. Machine-to-Machine (M2M) API client credential provisioning, rotation, and revocation.
 */
export const concessionRoutes: FastifyPluginAsync = async (app) => {
  // =========================================================================
  // 1. CONCESSIONAIRE MANAGEMENT
  // =========================================================================

  /**
   * Onboard New Partner Concessionaire.
   *
   * Registers a private revenue collection or property enumeration firm.
   * Emits `concessionaire.onboarded.v1` domain event to the outbox.
   *
   * @requiresPermission `concessionaires:manage`
   */
  app.post('/admin/concessionaires', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['Concessionaire Governance'],
      security: [{ bearerAuth: [] }],
      summary: 'Onboard Partner Concessionaire',
      description: 'Registers a partner revenue collection concessionaire profile.',
      body: CreateConcessionaireFastifySchema
    }
  }, async (request, reply) => {
    if (!request.auth.permissions.includes(Permissions.MANAGE_CONCESSIONAIRES)) {
      throw new ForbiddenError(`Required permission: ${Permissions.MANAGE_CONCESSIONAIRES}`);
    }

    const parseResult = CreateConcessionaireSchema.safeParse(request.body);
    if (!parseResult.success) {
      throw new BadRequestError('Validation failed', parseResult.error.format());
    }
    const data = parseResult.data;

    const existing = await app.prisma.concessionaire.findUnique({
      where: { registrationNumber: data.registrationNumber }
    });
    if (existing) {
      throw new ConflictError(`Concessionaire with registration number '${data.registrationNumber}' already exists`);
    }

    const result = await app.prisma.$transaction(async (tx) => {
      const concessionaire = await tx.concessionaire.create({
        data: {
          name: data.name,
          registrationNumber: data.registrationNumber,
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone,
          status: 'ACTIVE'
        }
      });

      await appendOutboxEvent(
        tx,
        'concessionaire.onboarded.v1',
        domainEvent({
          eventType: 'concessionaire.onboarded.v1',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'Concessionaire',
          aggregateId: concessionaire.id,
          aggregateVersion: 1,
          concessionId: concessionaire.id,
          assemblyId: '00000000-0000-0000-0000-000000000000',
          correlationId: request.id,
          data: {
            concessionaireId: concessionaire.id,
            name: concessionaire.name,
            registrationNumber: concessionaire.registrationNumber,
            contactEmail: concessionaire.contactEmail,
            contactPhone: concessionaire.contactPhone,
            status: concessionaire.status,
            onboardedBy: request.auth.subject
          }
        })
      );

      return concessionaire;
    });

    return reply.status(201).send({
      success: true,
      data: result
    });
  });

  /**
   * List Concessionaires with Pagination & Filters.
   *
   * @requiresPermission `concessionaires:read` or `concessionaires:manage`
   */
  app.get('/admin/concessionaires', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['Concessionaire Governance'],
      security: [{ bearerAuth: [] }],
      summary: 'List Concessionaires',
      description: 'Lists registered concessionaires with pagination, search, and status filtering.',
      querystring: AdminConcessionaireQueryFastifySchema
    }
  }, async (request, reply) => {
    const perms = request.auth.permissions;
    if (!perms.includes(Permissions.VIEW_CONCESSIONAIRES) && !perms.includes(Permissions.MANAGE_CONCESSIONAIRES)) {
      throw new ForbiddenError(`Required permission: ${Permissions.VIEW_CONCESSIONAIRES} or ${Permissions.MANAGE_CONCESSIONAIRES}`);
    }

    const query = request.query as { page?: string; limit?: string; search?: string; status?: string };
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.status) {
      where.status = query.status;
    }
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { registrationNumber: { contains: query.search, mode: 'insensitive' } },
        { contactEmail: { contains: query.search, mode: 'insensitive' } }
      ];
    }

    const [items, total] = await Promise.all([
      app.prisma.concessionaire.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          assignments: {
            where: { status: 'ACTIVE' },
            include: { assembly: true }
          },
          _count: {
            select: { apiClients: true }
          }
        }
      }),
      app.prisma.concessionaire.count({ where })
    ]);

    return reply.send({
      success: true,
      data: {
        items,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });
  });

  /**
   * Retrieve Single Concessionaire Profile.
   *
   * Returns full corporate profile, active/past MMDA assignments, and registered API clients.
   *
   * @requiresPermission `concessionaires:read` or `concessionaires:manage`
   */
  app.get('/admin/concessionaires/:id', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['Concessionaire Governance'],
      security: [{ bearerAuth: [] }],
      summary: 'Get Concessionaire Details',
      description: 'Retrieves full concessionaire profile including assigned MMDAs and API clients.',
      params: ConcessionaireIdParamFastifySchema
    }
  }, async (request, reply) => {
    const perms = request.auth.permissions;
    if (!perms.includes(Permissions.VIEW_CONCESSIONAIRES) && !perms.includes(Permissions.MANAGE_CONCESSIONAIRES)) {
      throw new ForbiddenError(`Required permission: ${Permissions.VIEW_CONCESSIONAIRES} or ${Permissions.MANAGE_CONCESSIONAIRES}`);
    }

    const { id } = request.params as { id: string };
    if (!UUID_REGEX.test(id)) {
      throw new BadRequestError('Invalid concessionaire UUID format');
    }

    const concessionaire = await app.prisma.concessionaire.findUnique({
      where: { id },
      include: {
        assignments: {
          orderBy: { createdAt: 'desc' },
          include: { assembly: true }
        },
        apiClients: {
          select: {
            id: true,
            clientId: true,
            name: true,
            allowedIps: true,
            rateLimitPerMinute: true,
            status: true,
            lastUsedAt: true,
            createdAt: true,
            updatedAt: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!concessionaire) {
      throw new NotFoundError(`Concessionaire with ID '${id}' not found`);
    }

    return reply.send({
      success: true,
      data: concessionaire
    });
  });

  /**
   * Update Concessionaire Operational Status.
   *
   * Transitions status between `ACTIVE`, `SUSPENDED`, and `OFFBOARDED`.
   * Emits `concessionaire.status_changed.v1` outbox event.
   *
   * @requiresPermission `concessionaires:manage`
   */
  app.patch('/admin/concessionaires/:id/status', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['Concessionaire Governance'],
      security: [{ bearerAuth: [] }],
      summary: 'Update Concessionaire Status',
      description: 'Updates concessionaire lifecycle state (ACTIVE, SUSPENDED, OFFBOARDED).',
      params: ConcessionaireIdParamFastifySchema,
      body: UpdateConcessionaireStatusFastifySchema
    }
  }, async (request, reply) => {
    if (!request.auth.permissions.includes(Permissions.MANAGE_CONCESSIONAIRES)) {
      throw new ForbiddenError(`Required permission: ${Permissions.MANAGE_CONCESSIONAIRES}`);
    }

    const { id } = request.params as { id: string };
    if (!UUID_REGEX.test(id)) {
      throw new BadRequestError('Invalid concessionaire UUID format');
    }

    const parseResult = UpdateConcessionaireStatusSchema.safeParse(request.body);
    if (!parseResult.success) {
      throw new BadRequestError('Validation failed', parseResult.error.format());
    }

    const existing = await app.prisma.concessionaire.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundError(`Concessionaire with ID '${id}' not found`);
    }

    const updated = await app.prisma.$transaction(async (tx) => {
      const result = await tx.concessionaire.update({
        where: { id },
        data: { status: parseResult.data.status }
      });

      await appendOutboxEvent(
        tx,
        'concessionaire.status_changed.v1',
        domainEvent({
          eventType: 'concessionaire.status_changed.v1',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'Concessionaire',
          aggregateId: id,
          aggregateVersion: 1,
          concessionId: id,
          assemblyId: '00000000-0000-0000-0000-000000000000',
          correlationId: request.id,
          data: {
            concessionaireId: id,
            previousStatus: existing.status,
            newStatus: result.status,
            updatedBy: request.auth.subject
          }
        })
      );

      return result;
    });

    return reply.send({
      success: true,
      data: updated
    });
  });

  // =========================================================================
  // 2. MUNICIPAL ASSEMBLIES & CONCESSION ASSIGNMENT
  // =========================================================================

  /**
   * List Municipal Assemblies (MMDAs).
   *
   * Returns statutory District Assemblies with active concessionaire assignments.
   *
   * @requiresPermission `municipalities:read` or `municipalities:manage`
   */
  app.get('/admin/assemblies', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['Municipal Governance'],
      security: [{ bearerAuth: [] }],
      summary: 'List District Assemblies (MMDAs)',
      description: 'Lists all MMDAs and their active concessionaire assignment status.'
    }
  }, async (request, reply) => {
    const perms = request.auth.permissions;
    if (!perms.includes(Permissions.VIEW_MUNICIPALITIES) && !perms.includes(Permissions.MANAGE_MUNICIPALITIES)) {
      throw new ForbiddenError(`Required permission: ${Permissions.VIEW_MUNICIPALITIES} or ${Permissions.MANAGE_MUNICIPALITIES}`);
    }

    const assemblies = await app.prisma.municipalAssembly.findMany({
      orderBy: { name: 'asc' },
      include: {
        assignments: {
          where: { status: 'ACTIVE' },
          include: { concessionaire: true }
        }
      }
    });

    const formatted = assemblies.map((a) => {
      const activeAssignment = a.assignments[0];
      return {
        id: a.id,
        code: a.code,
        name: a.name,
        region: a.region,
        isActive: a.isActive,
        activeConcessionaire: activeAssignment
          ? {
              id: activeAssignment.concessionaire.id,
              name: activeAssignment.concessionaire.name,
              assignmentId: activeAssignment.id,
              contractStartDate: activeAssignment.contractStartDate.toISOString(),
              contractEndDate: activeAssignment.contractEndDate.toISOString()
            }
          : null,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt
      };
    });

    return reply.send({
      success: true,
      data: formatted
    });
  });

  /**
   * Register Municipal Assembly (MMDA).
   *
   * @requiresPermission `municipalities:manage`
   */
  app.post('/admin/assemblies', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['Municipal Governance'],
      security: [{ bearerAuth: [] }],
      summary: 'Register District Assembly (MMDA)',
      description: 'Registers a statutory Metropolitan, Municipal, or District Assembly.',
      body: CreateMunicipalAssemblyFastifySchema
    }
  }, async (request, reply) => {
    if (!request.auth.permissions.includes(Permissions.MANAGE_MUNICIPALITIES)) {
      throw new ForbiddenError(`Required permission: ${Permissions.MANAGE_MUNICIPALITIES}`);
    }

    const parseResult = CreateMunicipalAssemblySchema.safeParse(request.body);
    if (!parseResult.success) {
      throw new BadRequestError('Validation failed', parseResult.error.format());
    }
    const data = parseResult.data;

    const existing = await app.prisma.municipalAssembly.findUnique({
      where: { code: data.code }
    });
    if (existing) {
      throw new ConflictError(`Assembly with code '${data.code}' already exists`);
    }

    const assembly = await app.prisma.municipalAssembly.create({
      data: {
        code: data.code,
        name: data.name,
        region: data.region,
        isActive: true
      }
    });

    return reply.status(201).send({
      success: true,
      data: assembly
    });
  });

  /**
   * Assign MMDA Concession Territory to Concessionaire.
   *
   * Enforces the statutory single-active concessionaire constraint:
   * Rejects with `409 Conflict` if the MMDA already has an active concession assignment.
   * Emits `concession.assigned.v1` outbox event.
   *
   * @requiresPermission `municipalities:manage`
   */
  app.post('/admin/concessionaires/:id/concessions', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['Concessionaire Governance'],
      security: [{ bearerAuth: [] }],
      summary: 'Assign MMDA to Concessionaire',
      description: 'Assigns a District Assembly territorial concession with single-active enforcement.',
      params: ConcessionaireIdParamFastifySchema,
      body: AssignConcessionFastifySchema
    }
  }, async (request, reply) => {
    if (!request.auth.permissions.includes(Permissions.MANAGE_MUNICIPALITIES)) {
      throw new ForbiddenError(`Required permission: ${Permissions.MANAGE_MUNICIPALITIES}`);
    }

    const { id } = request.params as { id: string };
    if (!UUID_REGEX.test(id)) {
      throw new BadRequestError('Invalid concessionaire UUID format');
    }

    const parseResult = AssignConcessionSchema.safeParse(request.body);
    if (!parseResult.success) {
      throw new BadRequestError('Validation failed', parseResult.error.format());
    }
    const data = parseResult.data;

    const [concessionaire, assembly] = await Promise.all([
      app.prisma.concessionaire.findUnique({ where: { id } }),
      app.prisma.municipalAssembly.findUnique({ where: { id: data.assemblyId } })
    ]);

    if (!concessionaire) {
      throw new NotFoundError(`Concessionaire with ID '${id}' not found`);
    }
    if (concessionaire.status !== 'ACTIVE') {
      throw new BadRequestError(`Cannot assign territory to concessionaire in '${concessionaire.status}' status`);
    }

    if (!assembly) {
      throw new NotFoundError(`Municipal Assembly with ID '${data.assemblyId}' not found`);
    }
    if (!assembly.isActive) {
      throw new BadRequestError(`Municipal Assembly '${assembly.name}' is inactive`);
    }

    // Strict Enforcement: At most ONE active concession assignment per assembly
    const existingActive = await app.prisma.concessionAssignment.findFirst({
      where: {
        assemblyId: data.assemblyId,
        status: 'ACTIVE'
      },
      include: { concessionaire: true }
    });

    if (existingActive) {
      throw new ConflictError(
        `Municipal assembly '${assembly.name}' already has an active concession assignment with '${existingActive.concessionaire.name}' until ${existingActive.contractEndDate.toISOString()}`
      );
    }

    const assignment = await app.prisma.$transaction(async (tx) => {
      const created = await tx.concessionAssignment.create({
        data: {
          concessionaireId: id,
          assemblyId: data.assemblyId,
          contractStartDate: new Date(data.contractStartDate),
          contractEndDate: new Date(data.contractEndDate),
          status: 'ACTIVE'
        },
        include: {
          assembly: true,
          concessionaire: true
        }
      });

      await appendOutboxEvent(
        tx,
        'concession.assigned.v1',
        domainEvent({
          eventType: 'concession.assigned.v1',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'ConcessionAssignment',
          aggregateId: created.id,
          aggregateVersion: 1,
          concessionId: id,
          assemblyId: assembly.id,
          correlationId: request.id,
          data: {
            assignmentId: created.id,
            concessionaireId: id,
            concessionaireName: concessionaire.name,
            assemblyId: assembly.id,
            assemblyCode: assembly.code,
            assemblyName: assembly.name,
            contractStartDate: created.contractStartDate.toISOString(),
            contractEndDate: created.contractEndDate.toISOString(),
            assignedBy: request.auth.subject
          }
        })
      );

      return created;
    });

    return reply.status(201).send({
      success: true,
      data: assignment
    });
  });

  /**
   * Terminate Concession Territory Assignment Early.
   *
   * @requiresPermission `municipalities:manage`
   */
  app.patch('/admin/concessions/:assignmentId/terminate', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['Concessionaire Governance'],
      security: [{ bearerAuth: [] }],
      summary: 'Terminate Concession Assignment',
      description: 'Terminates an active concession contract assignment early.',
      params: AssignmentIdParamFastifySchema
    }
  }, async (request, reply) => {
    if (!request.auth.permissions.includes(Permissions.MANAGE_MUNICIPALITIES)) {
      throw new ForbiddenError(`Required permission: ${Permissions.MANAGE_MUNICIPALITIES}`);
    }

    const { assignmentId } = request.params as { assignmentId: string };
    if (!UUID_REGEX.test(assignmentId)) {
      throw new BadRequestError('Invalid assignment UUID format');
    }

    const existing = await app.prisma.concessionAssignment.findUnique({
      where: { id: assignmentId },
      include: { assembly: true, concessionaire: true }
    });
    if (!existing) {
      throw new NotFoundError(`Concession assignment with ID '${assignmentId}' not found`);
    }

    const updated = await app.prisma.$transaction(async (tx) => {
      const result = await tx.concessionAssignment.update({
        where: { id: assignmentId },
        data: { status: 'TERMINATED' }
      });

      await appendOutboxEvent(
        tx,
        'concession.terminated.v1',
        domainEvent({
          eventType: 'concession.terminated.v1',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'ConcessionAssignment',
          aggregateId: assignmentId,
          aggregateVersion: 1,
          concessionId: existing.concessionaireId,
          assemblyId: existing.assemblyId,
          correlationId: request.id,
          data: {
            assignmentId,
            concessionaireId: existing.concessionaireId,
            assemblyId: existing.assemblyId,
            terminatedBy: request.auth.subject
          }
        })
      );

      return result;
    });

    return reply.send({
      success: true,
      data: updated
    });
  });

  // =========================================================================
  // 3. MACHINE-TO-MACHINE (M2M) API CLIENT CREDENTIALS
  // =========================================================================

  /**
   * Provision New API Client Credentials for Concessionaire.
   *
   * Generates a high-entropy Client ID and Secret.
   * The unhashed `clientSecret` is returned strictly ONCE in this response.
   * Emits `concessionaire.api_client.created.v1` outbox event.
   *
   * @requiresPermission `api_clients:manage`
   */
  app.post('/admin/concessionaires/:id/api-clients', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['Concessionaire Security & API Keys'],
      security: [{ bearerAuth: [] }],
      summary: 'Provision M2M API Client Credentials',
      description: 'Provisions client ID and secret for external concessionaire billing/enumeration services.',
      params: ConcessionaireIdParamFastifySchema,
      body: CreateApiClientFastifySchema
    }
  }, async (request, reply) => {
    if (!request.auth.permissions.includes(Permissions.MANAGE_API_CLIENTS)) {
      throw new ForbiddenError(`Required permission: ${Permissions.MANAGE_API_CLIENTS}`);
    }

    const { id } = request.params as { id: string };
    if (!UUID_REGEX.test(id)) {
      throw new BadRequestError('Invalid concessionaire UUID format');
    }

    const parseResult = CreateApiClientSchema.safeParse(request.body);
    if (!parseResult.success) {
      throw new BadRequestError('Validation failed', parseResult.error.format());
    }
    const data = parseResult.data;

    const concessionaire = await app.prisma.concessionaire.findUnique({ where: { id } });
    if (!concessionaire) {
      throw new NotFoundError(`Concessionaire with ID '${id}' not found`);
    }
    if (concessionaire.status !== 'ACTIVE') {
      throw new BadRequestError(`Cannot provision API credentials for '${concessionaire.status}' concessionaire`);
    }

    const clientId = generateClientId();
    const clientSecret = generateClientSecret();
    const clientSecretHash = hashClientSecret(clientSecret);

    const apiClient = await app.prisma.$transaction(async (tx) => {
      const created = await tx.concessionaireApiClient.create({
        data: {
          concessionaireId: id,
          clientId,
          clientSecretHash,
          name: data.name,
          allowedIps: data.allowedIps ?? [],
          rateLimitPerMinute: data.rateLimitPerMinute ?? 600,
          status: 'ACTIVE'
        }
      });

      await appendOutboxEvent(
        tx,
        'concessionaire.api_client.created.v1',
        domainEvent({
          eventType: 'concessionaire.api_client.created.v1',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'ConcessionaireApiClient',
          aggregateId: created.id,
          aggregateVersion: 1,
          concessionId: id,
          assemblyId: '00000000-0000-0000-0000-000000000000',
          correlationId: request.id,
          data: {
            apiClientId: created.id,
            concessionaireId: id,
            clientId: created.clientId,
            name: created.name,
            allowedIps: created.allowedIps,
            rateLimitPerMinute: created.rateLimitPerMinute,
            createdBy: request.auth.subject
          }
        })
      );

      return created;
    });

    return reply.status(201).send({
      success: true,
      data: {
        id: apiClient.id,
        concessionaireId: apiClient.concessionaireId,
        clientId: apiClient.clientId,
        clientSecret, // Revealed only once upon creation
        name: apiClient.name,
        allowedIps: apiClient.allowedIps,
        rateLimitPerMinute: apiClient.rateLimitPerMinute,
        status: apiClient.status,
        createdAt: apiClient.createdAt.toISOString()
      }
    });
  });

  /**
   * Rotate Concessionaire API Client Secret.
   *
   * Replaces current secret with a freshly generated secret.
   *
   * @requiresPermission `api_clients:manage`
   */
  app.post('/admin/concessionaires/:id/api-clients/:clientId/rotate', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['Concessionaire Security & API Keys'],
      security: [{ bearerAuth: [] }],
      summary: 'Rotate API Client Secret',
      description: 'Generates a new client secret and updates the credential digest.',
      params: ApiClientParamsFastifySchema
    }
  }, async (request, reply) => {
    if (!request.auth.permissions.includes(Permissions.MANAGE_API_CLIENTS)) {
      throw new ForbiddenError(`Required permission: ${Permissions.MANAGE_API_CLIENTS}`);
    }

    const { id, clientId } = request.params as { id: string; clientId: string };
    if (!UUID_REGEX.test(id)) {
      throw new BadRequestError('Invalid concessionaire UUID format');
    }

    const existing = await app.prisma.concessionaireApiClient.findFirst({
      where: {
        concessionaireId: id,
        clientId
      }
    });

    if (!existing) {
      throw new NotFoundError(`API client '${clientId}' for concessionaire '${id}' not found`);
    }
    if (existing.status !== 'ACTIVE') {
      throw new BadRequestError(`Cannot rotate secret for revoked API client`);
    }

    const newSecret = generateClientSecret();
    const newHash = hashClientSecret(newSecret);

    await app.prisma.concessionaireApiClient.update({
      where: { id: existing.id },
      data: { clientSecretHash: newHash }
    });

    return reply.send({
      success: true,
      data: {
        clientId: existing.clientId,
        clientSecret: newSecret // Revealed only once upon rotation
      }
    });
  });

  /**
   * Revoke Concessionaire API Client Credentials.
   *
   * Immediately invalidates M2M credentials by transitioning status to `REVOKED`.
   * Emits `concessionaire.api_client.revoked.v1` outbox event.
   *
   * @requiresPermission `api_clients:manage`
   */
  app.delete('/admin/concessionaires/:id/api-clients/:clientId', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['Concessionaire Governance'],
      security: [{ bearerAuth: [] }],
      summary: 'Revoke API Client Credentials',
      description: 'Permanently revokes an API client credential set.',
      params: ApiClientParamsFastifySchema
    }
  }, async (request, reply) => {
    if (!request.auth.permissions.includes(Permissions.MANAGE_API_CLIENTS)) {
      throw new ForbiddenError(`Required permission: ${Permissions.MANAGE_API_CLIENTS}`);
    }

    const { id, clientId } = request.params as { id: string; clientId: string };
    if (!UUID_REGEX.test(id)) {
      throw new BadRequestError('Invalid concessionaire UUID format');
    }

    const existing = await app.prisma.concessionaireApiClient.findFirst({
      where: {
        concessionaireId: id,
        clientId
      }
    });

    if (!existing) {
      throw new NotFoundError(`API client '${clientId}' for concessionaire '${id}' not found`);
    }

    await app.prisma.$transaction(async (tx) => {
      await tx.concessionaireApiClient.update({
        where: { id: existing.id },
        data: { status: 'REVOKED' }
      });

      await appendOutboxEvent(
        tx,
        'concessionaire.api_client.revoked.v1',
        domainEvent({
          eventType: 'concessionaire.api_client.revoked.v1',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'ConcessionaireApiClient',
          aggregateId: existing.id,
          aggregateVersion: 1,
          concessionId: id,
          assemblyId: '00000000-0000-0000-0000-000000000000',
          correlationId: request.id,
          data: {
            apiClientId: existing.id,
            concessionaireId: id,
            clientId: existing.clientId,
            revokedBy: request.auth.subject
          }
        })
      );
    });

    return reply.send({
      success: true,
      message: `API client '${clientId}' successfully revoked`
    });
  });
};
