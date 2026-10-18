import type { FastifyInstance } from 'fastify';
import { randomBytes, createHash } from 'node:crypto';
import { NotFoundError, ConflictError } from '../../lib/errors.js';
import { inviteUser } from '../../lib/zitadel-management.js';

export interface CreateUserInput {
  code: string;
  countryId?: string;
  email: string;
  fullName: string;
  phone?: string;
  roleCode?: string;
}

export interface UpdateUserInput {
  fullName?: string;
  phone?: string | null;
  status?: string;
  roleCode?: string;
}

const userInclude = {
  userRoles: { include: { role: { select: { id: true, code: true, name: true } } } }
} as const;

function toUserDto<T extends { userRoles: Array<{ scopeLevel: string; role: { id: string; code: string; name: string } }> }>(user: T) {
  const { userRoles, ...rest } = user;
  return {
    ...rest,
    roles: userRoles.map((ur) => ({ id: ur.role.id, code: ur.role.code, name: ur.role.name, scopeLevel: ur.scopeLevel }))
  };
}

export interface CreateConcessionInput {
  code: string;
  name: string;
  contactEmail: string;
}

export interface AssignAssemblyInput {
  concessionId: string;
  assemblyId: string;
  contractStart: string;
  contractEnd: string;
}

export interface RegisterPersonnelInput {
  concessionId: string;
  externalStaffRef: string;
  fullName: string;
  phone: string;
}

export function governanceService(app: FastifyInstance) {
  return {
    // Onboarding an oversight official never involves CROIP admins setting a password —
    // they only supply profile details. This calls Zitadel's Management API to create the
    // real IdP account and trigger its invite/password-set email (or, until real Zitadel
    // credentials are configured, falls back to a clearly logged stub — see
    // lib/zitadel-management.ts). The local User row starts in PENDING_ACTIVATION and only
    // becomes ACTIVE once the official actually completes the invite with Zitadel.
    async createUser(input: CreateUserInput, actorId: string) {
      const role = input.roleCode ? await app.prisma.role.findUnique({ where: { code: input.roleCode } }) : null;
      if (input.roleCode && !role) throw new NotFoundError(`Role ${input.roleCode} not found`);

      const existing = await app.prisma.user.findUnique({ where: { email: input.email } });
      if (existing) throw new ConflictError(`A user with email '${input.email}' already exists`);

      const invite = await inviteUser({ email: input.email, fullName: input.fullName, ...(input.phone ? { phone: input.phone } : {}) });

      return app.prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            code: input.code,
            zitadelId: invite.zitadelId,
            countryId: input.countryId ?? null,
            email: input.email,
            fullName: input.fullName,
            phone: input.phone ?? null,
            status: 'PENDING_ACTIVATION',
            invitedAt: new Date(),
            invitedViaStub: invite.stub === true,
            ...(role ? { userRoles: { create: { roleId: role.id, scopeLevel: role.scopeLevel, assignedBy: actorId } } } : {})
          },
          include: userInclude
        });

        await tx.auditRecord.create({
          data: {
            actorId,
            actorType: 'USER',
            action: 'user.invite',
            resourceType: 'User',
            resourceId: user.id,
            requestId: crypto.randomUUID(),
            outcome: 'SUCCESS',
            metadata: { code: user.code, email: user.email, role: role?.code ?? null, realInviteSent: invite.invited }
          }
        });

        return { ...toUserDto(user), realInviteSent: invite.invited };
      });
    },

    // Re-trigger the Zitadel invite for a user still stuck in PENDING_ACTIVATION — e.g. they
    // never received the email, or were created back when Zitadel credentials were a stub.
    async resendInvite(id: string, actorId: string) {
      const user = await app.prisma.user.findUnique({ where: { id } });
      if (!user) throw new NotFoundError('User not found');
      if (user.status !== 'PENDING_ACTIVATION') {
        throw new ConflictError(`User is already ${user.status.toLowerCase()} — nothing to resend`);
      }

      const invite = await inviteUser({ email: user.email, fullName: user.fullName, ...(user.phone ? { phone: user.phone } : {}) });

      const updated = await app.prisma.user.update({
        where: { id },
        data: { invitedAt: new Date(), invitedViaStub: invite.stub === true, ...(invite.invited ? { zitadelId: invite.zitadelId } : {}) },
        include: userInclude
      });

      await app.prisma.auditRecord.create({
        data: {
          actorId,
          actorType: 'USER',
          action: 'user.invite_resend',
          resourceType: 'User',
          resourceId: id,
          requestId: crypto.randomUUID(),
          outcome: 'SUCCESS',
          metadata: { email: user.email, realInviteSent: invite.invited }
        }
      });

      return { ...toUserDto(updated), realInviteSent: invite.invited };
    },

    async listUsers() {
      const users = await app.prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        include: userInclude
      });
      return users.map(toUserDto);
    },

    async updateUser(id: string, input: UpdateUserInput, actorId: string) {
      return app.prisma.$transaction(async (tx) => {
        const existing = await tx.user.findUnique({ where: { id } });
        if (!existing) throw new NotFoundError('User not found');

        if (input.roleCode) {
          const role = await tx.role.findUnique({ where: { code: input.roleCode } });
          if (!role) throw new NotFoundError(`Role ${input.roleCode} not found`);
          // One primary role per officer: replace any existing assignment.
          await tx.userRole.deleteMany({ where: { userId: id } });
          await tx.userRole.create({ data: { userId: id, roleId: role.id, scopeLevel: role.scopeLevel, assignedBy: actorId } });
        }

        const user = await tx.user.update({
          where: { id },
          data: {
            ...(input.fullName !== undefined ? { fullName: input.fullName } : {}),
            ...(input.phone !== undefined ? { phone: input.phone } : {}),
            ...(input.status !== undefined ? { status: input.status } : {})
          },
          include: userInclude
        });

        await tx.auditRecord.create({
          data: {
            actorId,
            actorType: 'USER',
            action: 'user.update',
            resourceType: 'User',
            resourceId: id,
            requestId: crypto.randomUUID(),
            outcome: 'SUCCESS',
            metadata: { ...input }
          }
        });

        return toUserDto(user);
      });
    },

    async deleteUser(id: string, actorId: string) {
      return app.prisma.$transaction(async (tx) => {
        const existing = await tx.user.findUnique({ where: { id } });
        if (!existing) throw new NotFoundError('User not found');
        await tx.user.delete({ where: { id } });
        await tx.auditRecord.create({
          data: {
            actorId,
            actorType: 'USER',
            action: 'user.delete',
            resourceType: 'User',
            resourceId: id,
            requestId: crypto.randomUUID(),
            outcome: 'SUCCESS',
            metadata: { code: existing.code, email: existing.email }
          }
        });
        return { id, deleted: true };
      });
    },

    async getUserByZitadelId(zitadelId: string) {
      const user = await app.prisma.user.findUnique({
        where: { zitadelId },
        include: userInclude
      });
      if (!user) throw new NotFoundError('User profile not found for authenticated subject');
      return toUserDto(user);
    },

    async getUserById(id: string) {
      const user = await app.prisma.user.findUnique({ where: { id }, include: userInclude });
      if (!user) throw new NotFoundError('User not found');
      return toUserDto(user);
    },

    async createConcession(input: CreateConcessionInput, actorId: string) {
      return app.prisma.$transaction(async (tx) => {
        const concession = await tx.concession.create({
          data: {
            code: input.code.toUpperCase(),
            name: input.name,
            contactEmail: input.contactEmail,
            status: 'ACTIVE'
          }
        });

        await tx.auditRecord.create({
          data: {
            actorId,
            actorType: 'USER',
            action: 'concession.onboard',
            resourceType: 'Concession',
            resourceId: concession.id,
            requestId: crypto.randomUUID(),
            outcome: 'SUCCESS',
            metadata: { code: concession.code, name: concession.name }
          }
        });

        return concession;
      });
    },

    async listConcessions() {
      return app.prisma.concession.findMany({
        orderBy: { code: 'asc' }
      });
    },

    async getConcession(id: string) {
      const concession = await app.prisma.concession.findUnique({ where: { id } });
      if (!concession) throw new NotFoundError('Concession not found');
      return concession;
    },

    async deactivateConcession(id: string, actorId: string) {
      return app.prisma.$transaction(async (tx) => {
        const existing = await tx.concession.findUnique({ where: { id } });
        if (!existing) throw new NotFoundError('Concession not found');

        const concession = await tx.concession.update({ where: { id }, data: { status: 'INACTIVE' } });

        await tx.auditRecord.create({
          data: {
            actorId,
            actorType: 'USER',
            action: 'concession.deactivate',
            resourceType: 'Concession',
            resourceId: id,
            requestId: crypto.randomUUID(),
            outcome: 'SUCCESS',
            metadata: { code: existing.code }
          }
        });

        return concession;
      });
    },

    async assignAssembly(input: AssignAssemblyInput, actorId: string) {
      return app.prisma.$transaction(async (tx) => {
        const assignment = await tx.concessionAssembly.create({
          data: {
            concessionId: input.concessionId,
            assemblyId: input.assemblyId,
            contractStart: new Date(input.contractStart),
            contractEnd: new Date(input.contractEnd),
            status: 'ACTIVE'
          }
        });

        await tx.auditRecord.create({
          data: {
            actorId,
            actorType: 'USER',
            concessionId: input.concessionId,
            assemblyId: input.assemblyId,
            action: 'concession.assign_assembly',
            resourceType: 'ConcessionAssembly',
            resourceId: assignment.id,
            requestId: crypto.randomUUID(),
            outcome: 'SUCCESS',
            metadata: { contractStart: input.contractStart, contractEnd: input.contractEnd }
          }
        });

        return assignment;
      });
    },

    async listAssignedAssemblies(concessionId: string) {
      return app.prisma.concessionAssembly.findMany({
        where: { concessionId },
        orderBy: { contractStart: 'desc' }
      });
    },

    async provisionApiClient(concessionId: string, actorId: string) {
      const unhashedSecret = randomBytes(24).toString('hex');
      const clientSecretHash = createHash('sha256').update(unhashedSecret).digest('hex');
      const clientId = `croip_client_${randomBytes(8).toString('hex')}`;
      const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

      const client = await app.prisma.apiClient.create({
        data: {
          concessionId,
          clientId,
          clientSecretHash,
          status: 'ACTIVE',
          expiresAt
        }
      });

      return {
        id: client.id,
        concessionId: client.concessionId,
        clientId: client.clientId,
        clientSecret: unhashedSecret,
        status: client.status,
        expiresAt: client.expiresAt.toISOString()
      };
    },

    // Never includes clientSecretHash — the plaintext secret is shown exactly once, at
    // provisioning time, in provisionApiClient's own response, and never again.
    async listApiClients(concessionId: string) {
      const clients = await app.prisma.apiClient.findMany({
        where: { concessionId },
        orderBy: { expiresAt: 'desc' },
        select: { id: true, concessionId: true, clientId: true, status: true, expiresAt: true }
      });
      return clients;
    },

    async registerPersonnel(input: RegisterPersonnelInput, actorId: string) {
      return app.prisma.concessionPersonnel.create({
        data: {
          concessionId: input.concessionId,
          externalStaffRef: input.externalStaffRef,
          fullName: input.fullName,
          phone: input.phone,
          status: 'ACTIVE'
        }
      });
    },

    async listPersonnel(concessionId: string) {
      return app.prisma.concessionPersonnel.findMany({
        where: { concessionId },
        orderBy: { fullName: 'asc' }
      });
    }
  };
}
