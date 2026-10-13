/**
 * Property Management Service Authentication & Authorization Fastify Plugin.
 *
 * Implements:
 * 1. Development Header Support: Allows passing `x-dev-subject` for isolated testing.
 * 2. Identity Service Session Token Introspection: When an external client presents a
 *    64-character bearer token, this plugin queries `IDENTITY_SERVICE_URL/v1/auth/me` to
 *    resolve the user's authentic UUID and role permissions.
 * 3. Strict UUID Integrity Guards: Ensures caller identifiers conform to UUID standard format
 *    before queries reach Prisma, preventing PostgreSQL `P2023` length mismatch exceptions.
 * 4. ZITADEL Enterprise JWT Validation: Validates cryptographically signed OpenID Connect tokens
 *    via remote JSON Web Key Sets (JWKS) when `AUTH_MODE=zitadel`.
 */
import fp from 'fastify-plugin';
import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose';
import type { AppConfig } from '../config.js';
import { ForbiddenError, UnauthorizedError } from '../lib/errors.js';

export interface AuthContext {
  subject: string;
  actorType: 'USER' | 'SERVICE';
  concessionId: string;
  assemblyId: string;
  permissions: string[];
  claims: JWTPayload | Record<string, unknown>;
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function stringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === 'string');
  if (typeof value === 'string') return value.split(/[ ,]+/).filter(Boolean);
  if (value && typeof value === 'object') return Object.keys(value);
  return [];
}

export const authPlugin = fp<{ config: AppConfig }>(async (app, options) => {
  const { config } = options;
  const jwks = config.AUTH_MODE === 'zitadel' && config.ZITADEL_JWKS_URI 
    ? createRemoteJWKSet(new URL(config.ZITADEL_JWKS_URI)) 
    : undefined;

  app.decorateRequest('auth');

  app.decorate('authenticate', async (request) => {
    // 1. Development bypass via explicit dev headers in test/dev
    if (request.headers['x-dev-subject'] && config.NODE_ENV !== 'production') {
      const subject = String(request.headers['x-dev-subject']);
      const perms = request.headers['x-dev-permissions'] 
        ? String(request.headers['x-dev-permissions']).split(' ') 
        : ['properties:search', 'properties:claim', 'properties:manage_own', 'properties:view_own'];
      request.auth = {
        subject,
        actorType: 'USER',
        concessionId: String(request.headers['x-dev-concession-id'] ?? '00000000-0000-0000-0000-000000000001'),
        assemblyId: String(request.headers['x-dev-assembly-id'] ?? '00000000-0000-0000-0000-000000000001'),
        permissions: perms,
        claims: {
          sub: subject,
          accountType: String(request.headers['x-dev-account-type'] ?? 'RATEPAYER')
        }
      };
      return;
    }

    const authorization = request.headers.authorization;
    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedError('Authentication required. Please provide a valid Bearer token or authorization header.');
    }

    const rawToken = authorization.slice(7).trim();
    if (!rawToken) {
      throw new UnauthorizedError('Bearer token cannot be empty');
    }

    // 2. Introspect active session token via Central Platform Identity Service
    if (config.IDENTITY_SERVICE_URL) {
      try {
        const response = await fetch(`${config.IDENTITY_SERVICE_URL}/v1/auth/me`, {
          method: 'GET',
          headers: {
            authorization: `Bearer ${rawToken}`,
            'x-request-id': request.id
          }
        });

        if (response.ok) {
          const body = (await response.json()) as {
            success?: boolean;
            data?: {
              id?: string;
              email?: string;
              phone?: string;
              accountType?: string;
              roleAssignments?: Array<{
                concessionId?: string;
                assemblyId?: string;
                role?: {
                  permissions?: Array<{ permission?: { code?: string }; code?: string }>;
                };
              }>;
            };
          };

          if (body?.data?.id && UUID_REGEX.test(body.data.id)) {
            const user = body.data;
            const perms: string[] = [];
            if (user.roleAssignments) {
              for (const ra of user.roleAssignments) {
                if (ra.role?.permissions) {
                  for (const rp of ra.role.permissions) {
                    const code = rp.permission?.code ?? rp.code;
                    if (code) perms.push(code);
                  }
                }
              }
            }
            if (perms.length === 0) {
              if (user.accountType === 'STAFF') {
                perms.push('properties:read', 'properties:manage');
              } else {
                perms.push('properties:view_own', 'properties:claim', 'properties:search');
              }
            }

            request.auth = {
              subject: user.id as string,
              actorType: user.accountType === 'STAFF' ? 'USER' : 'USER',
              concessionId: user.roleAssignments?.[0]?.concessionId ?? '00000000-0000-0000-0000-000000000000',
              assemblyId: user.roleAssignments?.[0]?.assemblyId ?? '00000000-0000-0000-0000-000000000000',
              permissions: [...new Set(perms)],
              claims: {
                sub: user.id,
                email: user.email,
                phone: user.phone,
                accountType: user.accountType
              }
            };
            return;
          }
        }
      } catch (error) {
        request.log.debug({ err: error }, 'Identity service introspection failed or service unreachable');
      }
    }

    // 3. ZITADEL JWT Validation (if ZITADEL is configured)
    if (config.AUTH_MODE === 'zitadel' && jwks) {
      try {
        const { payload } = await jwtVerify(rawToken, jwks, {
          issuer: config.ZITADEL_ISSUER!,
          audience: config.ZITADEL_AUDIENCE!
        });
        const tenant = payload[config.IDARMS_CONTEXT_CLAIM];
        const context = (typeof tenant === 'object' && tenant !== null ? tenant : {}) as Record<string, unknown>;
        request.auth = {
          subject: payload.sub ?? 'unknown',
          actorType: payload.client_id ? 'SERVICE' : 'USER',
          concessionId: typeof context.concessionId === 'string' ? context.concessionId : '00000000-0000-0000-0000-000000000000',
          assemblyId: typeof context.assemblyId === 'string' ? context.assemblyId : '00000000-0000-0000-0000-000000000000',
          permissions: [...new Set([...stringArray(payload.scope), ...stringArray(payload[config.ZITADEL_ROLES_CLAIM])])],
          claims: payload
        };
        return;
      } catch (error) {
        request.log.warn({ err: error }, 'JWT token verification failed');
      }
    }

    // 4. Fallback in development / test with mock bearer token (must be valid UUID format)
    if (config.NODE_ENV !== 'production') {
      if (UUID_REGEX.test(rawToken)) {
        request.auth = {
          subject: rawToken,
          actorType: 'USER',
          concessionId: '00000000-0000-0000-0000-000000000001',
          assemblyId: '00000000-0000-0000-0000-000000000001',
          permissions: ['properties:search', 'properties:claim', 'properties:manage_own', 'properties:view_own'],
          claims: { sub: rawToken }
        };
        return;
      }
    }

    throw new UnauthorizedError('Invalid or expired authentication token. Please log in again.');
  });

  app.decorate('requirePermissions', (required: string[]) => async (request, reply) => {
    await app.authenticate(request, reply);
    if (!required.every((permission) => request.auth.permissions.includes(permission))) {
      throw new ForbiddenError(`Required permissions: ${required.join(', ')}`);
    }
  });
}, { name: 'auth' });
