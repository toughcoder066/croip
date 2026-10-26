import { request as httpRequest } from 'node:http';
import { request as httpsRequest } from 'node:https';
import fp from 'fastify-plugin';
import { createLocalJWKSet, jwtVerify, type JWTPayload, type JSONWebKeySet } from 'jose';
import type { AppConfig } from '../config.js';
import { ForbiddenError } from '../lib/errors.js';
import { verifyRatepayerToken } from '../lib/ratepayer-jwt.js';

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

// How long a resolved API-client context is trusted before being re-looked-up — bounds how
// stale a revoked/rotated credential can appear, while sparing platform-governance-service
// a round trip on every request.
const SERVICE_CONTEXT_TTL_MS = 60 * 1000;

interface ServiceContext {
  concessionId: string;
  assemblyId: string;
  permissions: string[];
}

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

  const serviceContextCache = new Map<string, { context: ServiceContext | null; fetchedAt: number }>();

  // Resolves a concession's own API-client (client_credentials) token by calling back to
  // platform-governance-service with the verified JWT's own client_id claim, instead of
  // trusting a urn:idarms:context claim injected into the token itself — this Zitadel
  // version does not reliably apply a Target's returned claims to client_credentials-issued
  // tokens (confirmed empirically). A side benefit over the claim approach: this reflects
  // revocation in real time (a revoked or rotated-away client_id simply isn't found, within
  // the cache TTL), where a bare JWT signature check never could.
  //
  // Every token's client_id is checked here, human logins included — a human login's
  // client_id is the OIDC app's own id, not a concession's, so this always (and cacheably)
  // comes back null for them. That client_id never changes across a whole session, so it's
  // one real lookup per idle officer per TTL window, not one per request.
  async function resolveServiceContext(clientId: string): Promise<ServiceContext | null> {
    const cached = serviceContextCache.get(clientId);
    if (cached && Date.now() - cached.fetchedAt < SERVICE_CONTEXT_TTL_MS) return cached.context;

    try {
      const response = await fetch(`${config.PLATFORM_GOVERNANCE_URL}/v1/api-clients/${encodeURIComponent(clientId)}/context`);
      const context = response.ok ? ((await response.json()) as ServiceContext) : null;
      serviceContextCache.set(clientId, { context, fetchedAt: Date.now() });
      return context;
    } catch (error) {
      app.log.warn({ err: error, clientId }, 'failed to resolve API-client context from platform-governance-service');
      return null;
    }
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

      // Every token carries a client_id — a human login's as much as a machine token's
      // (it's the OIDC app's id for a human login, not distinctive on its own). So this
      // can't branch on client_id's mere presence; it has to actually try the lookup and
      // see whether it names one of our own concession API clients. Found: SERVICE actor.
      // Not found: falls through to the human path below.
      if (payload.client_id) {
        const service = await resolveServiceContext(String(payload.client_id));
        if (service) {
          request.auth = {
            subject: payload.sub ?? 'unknown',
            actorType: 'SERVICE',
            concessionId: service.concessionId,
            assemblyId: service.assemblyId,
            permissions: [...new Set([...stringArray(payload.scope), ...service.permissions])],
            claims: payload
          };
          return;
        }
      }

      // Human (authorization_code) logins: permissions come from Zitadel's native
      // project-role assertion. CROIP oversight staff aren't scoped to one concession the
      // way a concession's own API client is, so a missing or unresolvable
      // urn:idarms:context claim falls back to the same default pair every dev-header
      // request already uses, rather than rejecting the login — see
      // platform-governance-service's auth.ts for the same fix and why.
      const tenant = payload[config.IDARMS_CONTEXT_CLAIM];
      const context = tenant && typeof tenant === 'object' ? (tenant as Record<string, unknown>) : {};
      request.auth = {
        subject: payload.sub ?? 'unknown',
        actorType: 'USER',
        concessionId: typeof context.concessionId === 'string' ? context.concessionId : '81fdc8f3-fcad-481a-b7fa-e916d5e97d9e',
        assemblyId: typeof context.assemblyId === 'string' ? context.assemblyId : '01c23cab-b1b2-4dae-b99b-32ea574632d9',
        permissions: [
          ...new Set([...stringArray(payload.scope), ...stringArray(payload[config.ZITADEL_ROLES_CLAIM])])
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

  // Separate from `authenticate` — ratepayer self-service sessions are HS256 tokens
  // issued by this service's own login flow, not Zitadel-issued staff tokens.
  app.decorate('authenticateRatepayer', async (request) => {
    const authorization = request.headers.authorization;
    if (!authorization?.startsWith('Bearer ')) throw app.httpErrors.unauthorized('Bearer token required');
    try {
      const claims = await verifyRatepayerToken(authorization.slice(7), config.RATEPAYER_JWT_SECRET);
      // The signature/expiry check above passing isn't enough on its own — a token that's
      // been explicitly logged out (POST /auth/logout) is still cryptographically valid
      // until it naturally expires, so a revoked jti has to be rejected here too.
      const revoked = await app.prisma.ratepayerRevokedToken.findUnique({ where: { jti: claims.jti } });
      if (revoked) throw new Error('Token has been revoked (logged out)');
      request.ratepayerAuth = claims;
    } catch (error) {
      request.log.warn({ err: error }, 'ratepayer access token rejected');
      throw app.httpErrors.unauthorized('Invalid or expired access token');
    }
  });
}, { name: 'auth' });
