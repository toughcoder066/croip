import { request as httpRequest } from 'node:http';
import { request as httpsRequest } from 'node:https';
import fp from 'fastify-plugin';
import { createLocalJWKSet, jwtVerify, type JWTPayload, type JSONWebKeySet } from 'jose';
import type { AppConfig } from '../config.js';
import { ForbiddenError } from '../lib/errors.js';
import { governanceService } from '../modules/governance/service.js';

export interface AuthContext {
  subject: string;
  actorType: 'USER' | 'SERVICE';
  concessionId: string;
  // A concession can be contracted to more than one MMDA at once — see
  // property-registry-service's auth.ts, which is where this list is actually consumed
  // for scoping decisions. Nothing in this service scopes by it today.
  assemblyIds: string[];
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

// How long a resolved API-client context is trusted before being re-looked-up — short
// enough that a revoked/rotated credential stops working everywhere within a bounded
// window, long enough that a busy integration isn't making this call on every request.
const SERVICE_CONTEXT_TTL_MS = 60 * 1000;

interface ServiceContext {
  concessionId: string;
  assemblyIds: string[];
  permissions: string[];
}

export const authPlugin = fp<{ config: AppConfig }>(async (app, options) => {
  const { config } = options;

  let jwks: ReturnType<typeof createLocalJWKSet> | undefined;
  let jwksFetchedAt = 0;

  const serviceContextCache = new Map<string, { context: ServiceContext | null; fetchedAt: number }>();

  // Resolves a service (client_credentials) token's concession context by its own
  // client_id, in-process — this service already owns the ApiClient table, so there is no
  // reason to make this an HTTP round trip to itself the way every other CROIP service's
  // identical lookup does (see their auth.ts for the HTTP version of this same call).
  // Replaces trusting a urn:idarms:context claim injected by a Zitadel Action, which this
  // Zitadel version does not reliably apply to client_credentials-issued tokens.
  //
  // Every token's client_id is checked here, human logins included — their client_id just
  // never matches a concession's, so this always (and cacheably) comes back null for them,
  // same as any other every-request cost would. A human login's own client_id never
  // changes across its whole session, so one real lookup per idle officer per TTL window,
  // not one per request.
  async function resolveServiceContext(clientId: string): Promise<ServiceContext | null> {
    const cached = serviceContextCache.get(clientId);
    if (cached && Date.now() - cached.fetchedAt < SERVICE_CONTEXT_TTL_MS) return cached.context;

    const context = await governanceService(app).getApiClientContext(clientId);
    serviceContextCache.set(clientId, { context, fetchedAt: Date.now() });
    return context;
  }

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
        assemblyIds: [String(request.headers['x-dev-assembly-id'] ?? '01c23cab-b1b2-4dae-b99b-32ea574632d9')],
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
      // (it's the OIDC app's id for a human login, not a secret, and not distinctive on
      // its own). So this can't branch on client_id's mere presence; it has to actually
      // try the lookup and see whether it names one of our own concession API clients.
      // Found: SERVICE actor, resolved by clientId rather than trusting a claim in the
      // JWT (see resolveServiceContext). Not found: falls through to the human path below
      // — the client_id just belongs to some other OIDC app (e.g. the portal itself).
      if (payload.client_id) {
        const service = await resolveServiceContext(String(payload.client_id));
        if (service) {
          request.auth = {
            subject: payload.sub ?? 'unknown',
            actorType: 'SERVICE',
            concessionId: service.concessionId,
            assemblyIds: service.assemblyIds,
            permissions: [...new Set([...stringArray(payload.scope), ...service.permissions])],
            claims: payload
          };
          return;
        }
      }

      // Human (authorization_code) logins: permissions come from Zitadel's native
      // project-role assertion. CROIP oversight staff aren't scoped to one concession the
      // way a concession's own API client is — concessionId/assemblyId are only carried
      // for the handful of routes that log or default against them, so a missing or
      // unresolvable urn:idarms:context claim (this Zitadel version does not reliably
      // apply one — see resolveServiceContext's comment) falls back to the same default
      // pair every dev-header request already uses, rather than rejecting the login.
      const tenant = payload[config.IDARMS_CONTEXT_CLAIM];
      const context = tenant && typeof tenant === 'object' ? (tenant as Record<string, unknown>) : {};
      request.auth = {
        subject: payload.sub ?? 'unknown',
        actorType: 'USER',
        concessionId: typeof context.concessionId === 'string' ? context.concessionId : '81fdc8f3-fcad-481a-b7fa-e916d5e97d9e',
        assemblyIds: [typeof context.assemblyId === 'string' ? context.assemblyId : '01c23cab-b1b2-4dae-b99b-32ea574632d9'],
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
}, { name: 'auth' });
