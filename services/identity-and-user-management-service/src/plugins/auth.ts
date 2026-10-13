/**
 * Authentication and Role-Based Access Control (RBAC) Fastify Plugin.
 *
 * Enforces a 3-tier authentication strategy:
 * 1. Development Header Bypass: Allows isolated unit testing with `x-dev-subject` in test/dev modes.
 * 2. Database Session Token Validation: Validates stateful 64-character session tokens issued upon
 *    ratepayer 2-step OTP verification or staff password login against the PostgreSQL `user_sessions` table.
 * 3. ZITADEL Enterprise JWT Validation: Validates cryptographically signed OpenID Connect tokens
 *    via remote JSON Web Key Sets (JWKS).
 */
import fp from 'fastify-plugin';
import crypto from 'node:crypto';
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

function stringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === 'string');
  if (typeof value === 'string') return value.split(/[ ,]+/).filter(Boolean);
  if (value && typeof value === 'object') return Object.keys(value);
  return [];
}

function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export const authPlugin = fp<{ config: AppConfig }>(async (app, options) => {
  const { config } = options;
  const jwks = config.AUTH_MODE === 'zitadel' ? createRemoteJWKSet(new URL(config.ZITADEL_JWKS_URI!)) : undefined;

  app.decorateRequest('auth');
  app.decorate('authenticate', async (request) => {
    // 1. Development bypass via explicit dev headers in test/dev
    if (request.headers['x-dev-subject'] && config.NODE_ENV !== 'production') {
      request.auth = {
        subject: String(request.headers['x-dev-subject']),
        actorType: 'USER',
        concessionId: String(request.headers['x-dev-concession-id'] ?? '00000000-0000-0000-0000-000000000001'),
        assemblyId: String(request.headers['x-dev-assembly-id'] ?? '00000000-0000-0000-0000-000000000001'),
        permissions: String(request.headers['x-dev-permissions'] ?? 'users.read users.manage roles.read permissions.read').split(' '),
        claims: {}
      };
      return;
    }

    const authorization = request.headers.authorization;
    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedError('Authentication required. Please log in and provide a valid Bearer token.');
    }

    const rawToken = authorization.slice(7).trim();
    if (!rawToken) {
      throw new UnauthorizedError('Bearer token cannot be empty');
    }

    // 2. Database Session Token Validation (Tokens issued on staff login or ratepayer OTP verification)
    if (app.prisma) {
      const tokenHash = hashToken(rawToken);
      const session = await app.prisma.userSession.findFirst({
        where: {
          tokenHash,
          expiresAt: { gt: new Date() }
        },
        include: {
          user: {
            include: {
              roleAssignments: {
                include: {
                  role: {
                    include: {
                      permissions: {
                        include: { permission: true }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });

      if (session && session.user && session.user.status === 'ACTIVE') {
        const user = session.user;
        const allPermissions = user.roleAssignments.flatMap((ra) =>
          ra.role.permissions.map((rp) => rp.permission.code)
        );

        request.auth = {
          subject: user.id,
          actorType: user.accountType === 'STAFF' ? 'USER' : 'USER',
          concessionId: user.roleAssignments[0]?.concessionId ?? '00000000-0000-0000-0000-000000000000',
          assemblyId: user.roleAssignments[0]?.assemblyId ?? '00000000-0000-0000-0000-000000000000',
          permissions: [...new Set(allPermissions)],
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

    // 3. ZITADEL JWT Validation (if ZITADEL is configured)
    if (config.AUTH_MODE === 'zitadel' && jwks) {
      try {
        const { payload } = await jwtVerify(rawToken, jwks, {
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
        return;
      } catch (error) {
        request.log.warn({ err: error }, 'JWT token verification failed');
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
