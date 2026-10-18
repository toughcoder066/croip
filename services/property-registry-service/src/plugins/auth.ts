import fp from 'fastify-plugin';
import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose';
import type { AppConfig } from '../config.js';
import { ForbiddenError } from '../lib/errors.js';

export interface AuthContext {
  subject: string;
  actorType: 'USER' | 'SERVICE';
  concessionId: string;
  assemblyId: string;
  permissions: string[];
  claims: JWTPayload;
}

function stringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === 'string');
  if (typeof value === 'string') return value.split(/[ ,]+/).filter(Boolean);
  if (value && typeof value === 'object') return Object.keys(value);
  return [];
}

export const authPlugin = fp<{ config: AppConfig }>(async (app, options) => {
  const { config } = options;
  const jwks = config.AUTH_MODE === 'zitadel' ? createRemoteJWKSet(new URL(config.ZITADEL_JWKS_URI!)) : undefined;

  app.decorateRequest('auth');
  app.decorate('authenticate', async (request) => {
    if (config.AUTH_MODE === 'disabled') {
      request.auth = {
        subject: String(request.headers['x-dev-subject'] ?? 'local-developer'),
        actorType: 'USER',
        concessionId: String(request.headers['x-dev-concession-id'] ?? '81fdc8f3-fcad-481a-b7fa-e916d5e97d9e'),
        assemblyId: String(request.headers['x-dev-assembly-id'] ?? '01c23cab-b1b2-4dae-b99b-32ea574632d9'),
        permissions: String(request.headers['x-dev-permissions'] ?? 'example:read example:write').split(' '),
        claims: {}
      };
      return;
    }

    const authorization = request.headers.authorization;
    if (!authorization?.startsWith('Bearer ')) throw app.httpErrors.unauthorized('Bearer token required');
    try {
      const { payload } = await jwtVerify(authorization.slice(7), jwks!, {
        issuer: config.ZITADEL_ISSUER!,
        audience: config.ZITADEL_AUDIENCE!
      });
      const tenant = payload[config.IDARMS_CONTEXT_CLAIM];
      if (!tenant || typeof tenant !== 'object') throw new Error('Missing iDARMS context claim');
      const context = tenant as Record<string, unknown>;
      if (typeof context.concessionId !== 'string' || typeof context.assemblyId !== 'string') {
        throw new Error('Invalid iDARMS context claim');
      }
      request.auth = {
        subject: payload.sub ?? 'unknown',
        actorType: payload.client_id ? 'SERVICE' : 'USER',
        concessionId: context.concessionId,
        assemblyId: context.assemblyId,
        permissions: [...new Set([...stringArray(payload.scope), ...stringArray(payload[config.ZITADEL_ROLES_CLAIM])])],
        claims: payload
      };
    } catch (error) {
      request.log.warn({ err: error }, 'access token rejected');
      throw app.httpErrors.unauthorized('Invalid or expired access token');
    }
  });

  app.decorate('requirePermissions', (required: string[]) => async (request, reply) => {
    await app.authenticate(request, reply);
    if (!required.every((permission) => request.auth.permissions.includes(permission))) {
      throw new ForbiddenError(`Required permissions: ${required.join(', ')}`);
    }
  });
}, { name: 'auth' });
