import type { FastifyInstance } from 'fastify';
import { AppError, NotFoundError } from '../../lib/errors.js';
import { RBAC_ACTIONS, RESOURCE_SEEDS, ROLE_SEEDS, expandActions } from './catalog.js';

export function rbacService(app: FastifyInstance) {
  const prisma = app.prisma;

  async function audit(actorId: string, action: string, resourceType: string, resourceId: string, metadata: Record<string, unknown>) {
    await prisma.auditRecord.create({
      data: {
        actorId,
        actorType: 'USER',
        action,
        resourceType,
        resourceId,
        requestId: crypto.randomUUID(),
        outcome: 'SUCCESS',
        metadata: metadata as object
      }
    });
  }

  return {
    /** Idempotent bootstrap — see catalog.ts for the semantics. */
    async bootstrap() {
      for (const [index, seed] of RESOURCE_SEEDS.entries()) {
        const resource = await prisma.resource.upsert({
          where: { code: seed.code },
          update: { name: seed.name, description: seed.description, sortOrder: index },
          create: { code: seed.code, name: seed.name, description: seed.description, sortOrder: index }
        });
        for (const action of RBAC_ACTIONS) {
          await prisma.permission.upsert({
            where: { resourceId_action: { resourceId: resource.id, action } },
            update: {},
            create: { resourceId: resource.id, action, code: `${seed.code}:${action}`, description: `${action} ${seed.name}` }
          });
        }
      }

      for (const [index, seed] of ROLE_SEEDS.entries()) {
        const existing = await prisma.role.findUnique({ where: { code: seed.code } });
        if (existing) continue;

        const role = await prisma.role.create({
          data: {
            code: seed.code,
            name: seed.name,
            description: seed.description,
            scopeLevel: seed.scopeLevel,
            isSystem: true,
            sortOrder: index
          }
        });

        const codes = Object.entries(seed.grants).flatMap(([resourceCode, compact]) =>
          expandActions(compact).map((action) => `${resourceCode}:${action}`)
        );
        const permissions = await prisma.permission.findMany({ where: { code: { in: codes } } });
        if (permissions.length) {
          await prisma.rolePermission.createMany({
            data: permissions.map((p) => ({ roleId: role.id, permissionId: p.id, grantedBy: 'system:bootstrap' })),
            skipDuplicates: true
          });
        }
      }

      // Ensure SUPER_ADMIN automatically has grants for any newly introduced resources/permissions
      const superAdmin = await prisma.role.findUnique({ where: { code: 'SUPER_ADMIN' } });
      if (superAdmin) {
        const allPermissions = await prisma.permission.findMany();
        await prisma.rolePermission.createMany({
          data: allPermissions.map((p) => ({ roleId: superAdmin.id, permissionId: p.id, grantedBy: 'system:bootstrap' })),
          skipDuplicates: true
        });
      }
    },

    async getMatrix() {
      const [roles, resources, permissions, grants] = await Promise.all([
        prisma.role.findMany({
          where: { status: 'ACTIVE' },
          orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
          include: { _count: { select: { userRoles: true } } }
        }),
        prisma.resource.findMany({ orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }] }),
        prisma.permission.findMany(),
        prisma.rolePermission.findMany({ select: { roleId: true, permissionId: true } })
      ]);

      return {
        actions: [...RBAC_ACTIONS],
        roles: roles.map((r) => ({
          id: r.id,
          code: r.code,
          name: r.name,
          description: r.description,
          scopeLevel: r.scopeLevel,
          isSystem: r.isSystem,
          userCount: r._count.userRoles
        })),
        resources: resources.map((r) => ({ id: r.id, code: r.code, name: r.name, description: r.description })),
        permissions: permissions.map((p) => ({ id: p.id, resourceId: p.resourceId, action: p.action, code: p.code })),
        grants
      };
    },

    async listRoles() {
      return prisma.role.findMany({
        where: { status: 'ACTIVE' },
        orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
        select: { id: true, code: true, name: true, scopeLevel: true }
      });
    },

    async setGrant(roleId: string, permissionId: string, granted: boolean, actorId: string) {
      const [role, permission] = await Promise.all([
        prisma.role.findUnique({ where: { id: roleId } }),
        prisma.permission.findUnique({ where: { id: permissionId } })
      ]);
      if (!role) throw new NotFoundError('Role not found');
      if (!permission) throw new NotFoundError('Permission not found');

      // Guard rail: the platform must never lose the ability to administer access control.
      if (!granted && role.code === 'SUPER_ADMIN' && permission.code.startsWith('ROLE_ACCESS:')) {
        throw new AppError(409, 'PROTECTED_GRANT', 'Super Administrator cannot lose Roles & Access Control permissions');
      }

      if (granted) {
        await prisma.rolePermission.upsert({
          where: { roleId_permissionId: { roleId, permissionId } },
          update: {},
          create: { roleId, permissionId, grantedBy: actorId }
        });
      } else {
        await prisma.rolePermission.deleteMany({ where: { roleId, permissionId } });
      }

      await audit(actorId, granted ? 'rbac.grant' : 'rbac.revoke', 'RolePermission', `${roleId}:${permissionId}`, {
        role: role.code,
        permission: permission.code
      });

      return { roleId, permissionId, granted };
    }
  };
}
