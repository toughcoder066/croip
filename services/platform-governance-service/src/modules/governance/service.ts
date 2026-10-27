import type { FastifyInstance } from 'fastify';
import { randomBytes } from 'node:crypto';
import { NotFoundError, ConflictError } from '../../lib/errors.js';
import { inviteUser, provisionMachineUser, deactivateMachineUser } from '../../lib/zitadel-management.js';
import { dispatchApiCredentials } from '../../lib/notification-dispatcher.js';

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
  code?: string;
  name: string;
  businessRegistrationNumber: string;
  tin: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}

export interface AssignAssemblyInput {
  concessionId: string;
  assemblyId: string;
  // No contractStart here — an assignment's contract always starts the moment it's made
  // (see assignAssembly below), never a date the caller picks. Backdating or postdating a
  // territory grant isn't a thing this platform supports.
  contractEnd: string;
}

export interface RegisterPersonnelInput {
  concessionId: string;
  externalStaffRef: string;
  fullName: string;
  phone: string;
}

// The literal permission string a concession's own API-client machine user is granted (via
// Zitadel `roles` metadata, see provisionMachineUser) so it can rotate/revoke its own
// credential through the self-service /concessions/me/api-clients endpoints. Deliberately
// never granted to any CROIP staff role — the staff-facing /concessions/:id/api-clients
// endpoints are gated on the separate `api_clients:manage` permission instead, so the two
// capabilities (manage any concession's clients vs. manage only your own) can never be
// confused by sharing a permission string.
const SELF_SERVICE_API_CLIENT_ROLE = 'api_clients:self_manage';

// What every concession's API client is authorized to do, platform-wide. Flat and global
// for every concession today — the same set the old hardcoded dev-header defaults granted
// (properties:manage/properties:read in property-registry-service,
// ratepayers:manage in ratepayer-service), plus this service's own self-service grant.
// If/when concessions need different permission sets from one another, this moves from a
// constant to a column on Concession — nothing about the lookup contract below would need
// to change for that.
const CONCESSION_API_CLIENT_PERMISSIONS = [
  SELF_SERVICE_API_CLIENT_ROLE,
  'properties:manage',
  'properties:read',
  'ratepayers:manage',
  // Lets a concession search/browse its own walk-in-registered ratepayers via
  // GET /ratepayers/directory in ratepayer-service — the same shape of grant properties:read
  // already gives it for GET /properties, so a concession can look its own citizens up
  // without needing to already know a specific ratepayer's id.
  'ratepayers:read'
];

export function governanceService(app: FastifyInstance) {
  // Mirrors property-registry-service's generatePropertyIdAndCode convention
  // (PREFIX-YEAR-FIRST4-LAST4 from a fresh UUID) so concession codes are never
  // user-entered — onboarding only asks for company name and contact email.
  async function generateConcessionCode(tx: any): Promise<string> {
    const year = new Date().getFullYear();
    while (true) {
      const id = crypto.randomUUID();
      const first4 = id.slice(0, 4).toUpperCase();
      const last4 = id.slice(-4).toUpperCase();
      const code = `CONC-${year}-${first4}-${last4}`;
      const existing = await tx.concession.findUnique({ where: { code }, select: { id: true } });
      if (!existing) return code;
    }
  }

  // Issues a fresh API client for a concession — used both for first-time onboarding and
  // as the second half of a rotation (see rotateApiClient). Provisions the real Zitadel
  // machine user, stores only metadata locally (never the secret), emails the credentials
  // to the concession's contact address, and writes an audit record. The plaintext secret
  // is returned here and nowhere else ever again.
  async function issueApiClient(concession: { id: string; name: string; contactEmail: string }, actorId: string, rotatedFromId: string | null) {
    // Suffixed, not just the concession id: rotating leaves the old Zitadel machine user
    // deactivated, not deleted, and Zitadel usernames must be unique — a second
    // provisioning for the same concession with the same username 409s otherwise.
    const credentials = await provisionMachineUser({
      userName: `concession-${concession.id}-${randomBytes(4).toString('hex')}`,
      name: `${concession.name} API Client`,
      concessionId: concession.id
    });
    const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

    const client = await app.prisma.apiClient.create({
      data: {
        concessionId: concession.id,
        clientId: credentials.clientId,
        zitadelUserId: credentials.issuedVia === 'zitadel' ? credentials.zitadelUserId : null,
        issuedVia: credentials.issuedVia,
        status: 'ACTIVE',
        expiresAt,
        rotatedFromId
      }
    });

    const delivery = await dispatchApiCredentials({
      to: concession.contactEmail,
      concessionName: concession.name,
      clientId: credentials.clientId,
      clientSecret: credentials.clientSecret,
      expiresAt: expiresAt.toISOString(),
      log: app.log
    });

    const finalized = await app.prisma.apiClient.update({
      where: { id: client.id },
      data: delivery.success
        ? { deliveredAt: new Date() }
        : { deliveryError: delivery.error?.slice(0, 500) ?? 'Unknown delivery error' }
    });

    await app.prisma.auditRecord.create({
      data: {
        actorId,
        actorType: 'USER',
        concessionId: concession.id,
        action: rotatedFromId ? 'api_client.rotate' : 'api_client.provision',
        resourceType: 'ApiClient',
        resourceId: client.id,
        requestId: crypto.randomUUID(),
        outcome: 'SUCCESS',
        metadata: { clientId: credentials.clientId, issuedVia: credentials.issuedVia, rotatedFromId, emailDelivered: delivery.success }
      }
    });

    return {
      id: finalized.id,
      concessionId: finalized.concessionId,
      clientId: finalized.clientId,
      clientSecret: credentials.clientSecret,
      status: finalized.status,
      issuedVia: finalized.issuedVia,
      expiresAt: finalized.expiresAt.toISOString(),
      emailDelivered: delivery.success
    };
  }

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

    // Onboarding a concessionaire immediately issues its first API client too — CROIP does
    // the initial provisioning; after this, the concessionaire's own backend uses that
    // credential to self-service rotate or revoke it (see rotateApiClient/revokeApiClient).
    async createConcession(input: CreateConcessionInput, actorId: string) {
      const concession = await app.prisma.$transaction(async (tx) => {
        const code = input.code ? input.code.toUpperCase() : await generateConcessionCode(tx);
        const created = await tx.concession.create({
          data: {
            code,
            name: input.name,
            businessRegistrationNumber: input.businessRegistrationNumber,
            tin: input.tin,
            contactName: input.contactName,
            contactPhone: input.contactPhone,
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
            resourceId: created.id,
            requestId: crypto.randomUUID(),
            outcome: 'SUCCESS',
            metadata: { code: created.code, name: created.name }
          }
        });

        return created;
      });

      const apiClient = await issueApiClient(concession, actorId, null);

      return { ...concession, apiClient };
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

    // Public, no-auth lookup by the concession's own non-secret `code` — lets a
    // concession's public ratepayer-facing app identify itself without ever holding its
    // real API credential (clientId/secret), which must stay server-side only. Used by
    // ratepayer-service's self-registration endpoint.
    async getConcessionByCode(code: string) {
      const concession = await app.prisma.concession.findFirst({
        where: { code: code.toUpperCase() },
        select: { id: true, code: true, name: true, status: true }
      });
      if (!concession) throw new NotFoundError('Unknown concession code');
      return concession;
    },

    // Public, no-auth lookup by id — the by-code lookup's mirror image, for the one case
    // that only ever has a stored concessionId in hand and no code: ratepayer-service
    // resolving a concession's name for white-labeling an email (login/password-reset OTPs)
    // long after registration, when the citizen never supplied a code in that request.
    // Same minimal, non-sensitive field set as by-code — never contact info, TIN, or any
    // API credential.
    async getConcessionById(id: string) {
      const concession = await app.prisma.concession.findUnique({
        where: { id },
        select: { id: true, code: true, name: true, status: true }
      });
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

    // An MMDA belongs to exactly one concessionaire at a time (a concessionaire can hold
    // many MMDAs) — checked here for a clean 409 before hitting the database, and enforced
    // for real by a partial unique index (assemblyId WHERE status = 'ACTIVE', applied by
    // hand — see schema.prisma) so a race between two requests still can't double-assign.
    async assignAssembly(input: AssignAssemblyInput, actorId: string) {
      const existingActive = await app.prisma.concessionAssembly.findFirst({
        where: { assemblyId: input.assemblyId, status: 'ACTIVE' }
      });
      if (existingActive && existingActive.concessionId !== input.concessionId) {
        throw new ConflictError('This MMDA is already actively assigned to another concessionaire');
      }

      const contractStart = new Date();

      return app.prisma.$transaction(async (tx) => {
        const assignment = await tx.concessionAssembly.create({
          data: {
            concessionId: input.concessionId,
            assemblyId: input.assemblyId,
            contractStart,
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
            metadata: { contractStart: contractStart.toISOString(), contractEnd: input.contractEnd }
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

    // Revokes the concession's current active credential (if any) at Zitadel first — that
    // is the step that actually stops it working, since every service verifies the JWT
    // directly against Zitadel and never re-checks this row — then issues and emails a
    // replacement. A concession can never have two ACTIVE credentials at once (enforced by
    // a partial unique index in the database too), so this is the only way to get a new one
    // once the first has already been issued at onboarding.
    async rotateApiClient(concessionId: string, actorId: string) {
      const concession = await app.prisma.concession.findUnique({ where: { id: concessionId } });
      if (!concession) throw new NotFoundError('Concession not found');

      const current = await app.prisma.apiClient.findFirst({ where: { concessionId, status: 'ACTIVE' } });

      if (current?.zitadelUserId) {
        await deactivateMachineUser(current.zitadelUserId);
      }
      if (current) {
        await app.prisma.apiClient.update({ where: { id: current.id }, data: { status: 'REVOKED', revokedAt: new Date() } });
      }

      return issueApiClient(concession, actorId, current?.id ?? null);
    },

    // Revokes the concession's current active credential without issuing a replacement —
    // for shutting off access outright (e.g. the concessionaire is being offboarded, or
    // they want access dead now and will request a new one separately).
    async revokeApiClient(concessionId: string, actorId: string) {
      const current = await app.prisma.apiClient.findFirst({ where: { concessionId, status: 'ACTIVE' } });
      if (!current) throw new ConflictError('No active API client to revoke for this concession');

      if (current.zitadelUserId) {
        await deactivateMachineUser(current.zitadelUserId);
      }

      const revoked = await app.prisma.apiClient.update({
        where: { id: current.id },
        data: { status: 'REVOKED', revokedAt: new Date() }
      });

      await app.prisma.auditRecord.create({
        data: {
          actorId,
          actorType: 'USER',
          concessionId,
          action: 'api_client.revoke',
          resourceType: 'ApiClient',
          resourceId: current.id,
          requestId: crypto.randomUUID(),
          outcome: 'SUCCESS',
          metadata: { clientId: current.clientId }
        }
      });

      return {
        id: revoked.id,
        concessionId: revoked.concessionId,
        clientId: revoked.clientId,
        status: revoked.status,
        revokedAt: revoked.revokedAt?.toISOString() ?? null
      };
    },

    // Never includes the secret — it is shown exactly once, at issuance time, in
    // issueApiClient's own response (via createConcession or rotateApiClient), and never
    // again.
    async listApiClients(concessionId: string) {
      const clients = await app.prisma.apiClient.findMany({
        where: { concessionId },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true, concessionId: true, clientId: true, status: true, issuedVia: true,
          expiresAt: true, revokedAt: true, rotatedFromId: true, deliveredAt: true, deliveryError: true, createdAt: true
        }
      });
      return clients;
    },

    // Called by every other CROIP service's auth.ts to resolve a concession API client's
    // context — concessionId, assemblyId and permissions — from its JWT's own `client_id`
    // claim. Replaces trusting a urn:idarms:context claim injected by a Zitadel Action,
    // which this Zitadel version does not reliably apply to client_credentials-issued
    // tokens (confirmed empirically, not just undocumented). A side benefit over the claim
    // approach: this reflects revocation in real time (a revoked or rotated-away client_id
    // simply isn't found), where a bare JWT signature check never could.
    async getApiClientContext(clientId: string) {
      const client = await app.prisma.apiClient.findUnique({
        where: { clientId },
        select: { status: true, concession: { select: { id: true, status: true } } }
      });
      if (!client || client.status !== 'ACTIVE' || client.concession.status !== 'ACTIVE') return null;

      const assigned = await app.prisma.concessionAssembly.findMany({
        where: { concessionId: client.concession.id, status: 'ACTIVE' },
        select: { assemblyId: true }
      });

      // A concession with no active MMDA assignment yet gets an empty list, not a
      // hardcoded default — an empty list correctly authorizes it for nothing, instead of
      // silently (and incorrectly) scoping it to a territory it was never actually
      // assigned. (Each service's own auth.ts still falls back to a dev-default
      // concessionId/assemblyId pair for human staff logins, which aren't resolved here.)
      return {
        concessionId: client.concession.id,
        assemblyIds: assigned.map((a) => a.assemblyId),
        permissions: CONCESSION_API_CLIENT_PERMISSIONS
      };
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
    },

    async purgeConcessions(actorId: string) {
      return app.prisma.$transaction(async (tx) => {
        // Identify all superuser accounts to preserve without fail
        const superusers = await tx.user.findMany({
          where: {
            OR: [
              { email: 'superuser@croip.com' },
              { code: 'SUPERUSER-001' },
              { userRoles: { some: { role: { code: 'SUPER_ADMIN' } } } }
            ]
          },
          select: { id: true, email: true }
        });
        const preservedUserIds = superusers.map(u => u.id);

        // Delete Concession-dependent entities
        const deletedApiClients = await tx.apiClient.deleteMany({});
        const deletedPersonnel = await tx.concessionPersonnel.deleteMany({});
        const deletedAssemblies = await tx.concessionAssembly.deleteMany({});
        const deletedConcessions = await tx.concession.deleteMany({});

        // Delete non-superuser users (preserving superuser account and super administrator roles)
        const deletedUserRoles = await tx.userRole.deleteMany({
          where: { userId: { notIn: preservedUserIds } }
        });
        const deletedSocials = await tx.userSocialConnection.deleteMany({
          where: { userId: { notIn: preservedUserIds } }
        });
        const deletedUsers = await tx.user.deleteMany({
          where: { id: { notIn: preservedUserIds } }
        });

        await tx.auditRecord.create({
          data: {
            actorId,
            actorType: 'USER',
            action: 'concessions.purge',
            resourceType: 'Concession',
            resourceId: null,
            requestId: crypto.randomUUID(),
            outcome: 'SUCCESS',
            metadata: {
              deletedConcessions: deletedConcessions.count,
              deletedPersonnel: deletedPersonnel.count,
              deletedApiClients: deletedApiClients.count,
              deletedAssemblies: deletedAssemblies.count,
              deletedUsers: deletedUsers.count,
              preservedUsers: superusers.map(u => u.email)
            }
          }
        });

        app.log.warn({
          actorId,
          deletedConcessions: deletedConcessions.count,
          deletedUsers: deletedUsers.count,
          preservedUsers: superusers.map(u => u.email)
        }, 'Admin purged concessions and non-superuser data');

        return {
          success: true,
          purged: {
            concessions: deletedConcessions.count,
            personnel: deletedPersonnel.count,
            apiClients: deletedApiClients.count,
            assemblies: deletedAssemblies.count,
            users: deletedUsers.count,
            userRoles: deletedUserRoles.count,
            socialConnections: deletedSocials.count
          },
          preserved: {
            superusers: superusers.map(u => u.email)
          }
        };
      });
    }
  };
}

