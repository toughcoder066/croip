import type { FastifyPluginAsync } from 'fastify';
import { problemSchema } from '../governance/schemas.js';
import { rbacService } from './service.js';

const uuidParam = { type: 'string', format: 'uuid' };

export const rbacRoutes: FastifyPluginAsync = async (app) => {
  const service = rbacService(app);

  app.get('/rbac/matrix', {
    preHandler: app.requirePermissions(['iam:roles_assign']),
    schema: {
      tags: ['Governance: RBAC'],
      summary: 'Access matrix: roles × resources × actions with current grants',
      response: { 200: { type: 'object', additionalProperties: true }, 401: problemSchema, 403: problemSchema }
    }
  }, async () => service.getMatrix());

  app.get('/roles', {
    preHandler: app.requirePermissions(['iam:users_manage']),
    schema: {
      tags: ['Governance: RBAC'],
      summary: 'List active roles that can be assigned to users',
      response: { 200: { type: 'array', items: { type: 'object', additionalProperties: true } }, 401: problemSchema, 403: problemSchema }
    }
  }, async () => service.listRoles());

  const grantSchema = {
    tags: ['Governance: RBAC'],
    params: {
      type: 'object',
      required: ['roleId', 'permissionId'],
      properties: { roleId: uuidParam, permissionId: uuidParam }
    },
    response: { 200: { type: 'object', additionalProperties: true }, 401: problemSchema, 403: problemSchema, 404: problemSchema, 409: problemSchema }
  };

  app.put<{ Params: { roleId: string; permissionId: string } }>('/rbac/roles/:roleId/permissions/:permissionId', {
    preHandler: app.requirePermissions(['iam:roles_assign']),
    schema: { ...grantSchema, summary: 'Grant a permission to a role' }
  }, async (request) => service.setGrant(request.params.roleId, request.params.permissionId, true, request.auth.subject));

  app.delete<{ Params: { roleId: string; permissionId: string } }>('/rbac/roles/:roleId/permissions/:permissionId', {
    preHandler: app.requirePermissions(['iam:roles_assign']),
    schema: { ...grantSchema, summary: 'Revoke a permission from a role' }
  }, async (request) => service.setGrant(request.params.roleId, request.params.permissionId, false, request.auth.subject));
};
