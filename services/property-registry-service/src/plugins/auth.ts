import { request as httpRequest } from 'node:http';
import { request as httpsRequest } from 'node:https';
import fp from 'fastify-plugin';
import { createLocalJWKSet, jwtVerify, type JWTPayload, type JSONWebKeySet } from 'jose';
import type { AppConfig } from '../config.js';
import { ForbiddenError } from '../lib/errors.js';
import { verifyRatepayerToken } from '../lib/ratepayer-jwt.js';

// Zitadel issues RS256 (asymmetric, JWKS-verified) tokens; ratepayer-service issues
// HS256 (shared-secret) tokens. Peeking at the unverified header's `alg` is enough to
// route to the right verifier — neither verifier trusts this value itself, it only
// decides which one to try.
function peekAlg(token: string): string | undefined {
  try {
    const headerJson = Buffer.from(token.split('.')[0] ?? '', 'base64url').toString('utf8');
    return (JSON.parse(headerJson) as { alg?: string }).alg;
  } catch {
    return undefined;
  }
}

export interface AuthContext {
  subject: string;
  actorType: 'USER' | 'SERVICE' | 'RATEPAYER';
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

/**
 * This single-instance Zitadel deployment routes every request by the `Host` header,
 * matching it against its one configured ExternalDomain (`localhost`, since that's what
 * the portal's browser-facing OIDC flow needs). Containers reach it over the Docker
 * network at `zitadel:8080`, which has a *different* Host header — Zitadel 404s that as
 * "Instance not found" even though the service is reachable. The fetch() spec forbids
 * overriding Host, so we can't fix this with a custom `fetch`; Node's raw http(s)
 * module has no such restriction, so JWKS is fetched that way instead and cached as a
 * local (non-remote) JWK set rather than handed to jose's createRemoteJWKSet.
 */
function fetchJwks(jwksUri: string, hostHeader: string): Promise<JSONWebKeySet> {
  const url = new URL(jwksUri);
  const transport = url.protocol === 'https:' ? httpsRequest : httpRequest;

  return new Promise((resolve, reject) => {
    const req = transport(
      {
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: `${url.pathname}${url.search}`,
        method: 'GET',
        headers: { Host: hostHeader }
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          if (res.statusCode !== 200) {
            reject(new Error(`JWKS fetch failed: ${res.statusCode} ${body}`));
            return;
          }
          try {
            resolve(JSON.parse(body));
          } catch (err) {
            reject(err);
          }
        });
      }
    );
    req.on('error', reject);
    req.end();
  });
}

const JWKS_TTL_MS = 10 * 60 * 1000;

export const authPlugin = fp<{ config: AppConfig }>(async (app, options) => {
  const { config } = options;

  let jwks: ReturnType<typeof createLocalJWKSet> | undefined;
  let jwksFetchedAt = 0;

  async function getJwks() {
    if (!jwks || Date.now() - jwksFetchedAt > JWKS_TTL_MS) {
      const issuerHost = new URL(config.ZITADEL_ISSUER!).host;
      const keys = await fetchJwks(config.ZITADEL_JWKS_URI!, issuerHost);
      jwks = createLocalJWKSet(keys);
      jwksFetchedAt = Date.now();
    }
    return jwks;
  }

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
      const { payload } = await jwtVerify(authorization.slice(7), await getJwks(), {
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
        // Zitadel's native project-role assertion only populates ZITADEL_ROLES_CLAIM for
        // human (authorization_code) logins — client_credentials tokens never carry it,
        // regardless of role grants or assertion settings. `urn:idarms:service-roles` is
        // a Complement Token Action that reads the machine user's own `roles` metadata
        // and injects an equivalent claim (see the `injectIdarmsContext` Zitadel Action).
        permissions: [
          ...new Set([
            ...stringArray(payload.scope),
            ...stringArray(payload[config.ZITADEL_ROLES_CLAIM]),
            ...stringArray(payload['urn:idarms:service-roles'])
          ])
        ],
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

  // Self-service property creation accepts EITHER a staff Zitadel token (with
  // properties:manage) OR a ratepayer's own session token — a ratepayer registering
  // their own property needs no staff-granted permission, just a valid session.
  app.decorate('authenticateStaffOrRatepayer', (required: string[]) => async (request, reply) => {
    const authorization = request.headers.authorization;
    if (config.AUTH_MODE === 'zitadel' && authorization?.startsWith('Bearer ') && peekAlg(authorization.slice(7)) === 'HS256') {
      try {
        const claims = await verifyRatepayerToken(authorization.slice(7), config.RATEPAYER_JWT_SECRET);
        request.auth = {
          subject: claims.sub,
          actorType: 'RATEPAYER',
          concessionId: '00000000-0000-0000-0000-000000000000',
          assemblyId: claims.assemblyId,
          permissions: [],
          claims: {}
        };
        return;
      } catch (error) {
        request.log.warn({ err: error }, 'ratepayer access token rejected');
        throw app.httpErrors.unauthorized('Invalid or expired access token');
      }
    }

    await app.requirePermissions(required)(request, reply);
  });
}, { name: 'auth' });
