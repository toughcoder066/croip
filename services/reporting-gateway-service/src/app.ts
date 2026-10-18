import Fastify, { type FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import sensible from '@fastify/sensible';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import type { AppConfig } from './config.js';
import { AppError } from './lib/errors.js';
import { authPlugin } from './plugins/auth.js';
import { metricsPlugin } from './plugins/metrics.js';
import { prismaPlugin } from './plugins/prisma.js';
import { healthRoutes } from './modules/health/routes.js';
import { ingestionRoutes } from './modules/ingestions/routes.js';

interface BuildOptions { config: AppConfig; skipInfrastructure?: boolean }

export async function buildApp(options: BuildOptions): Promise<FastifyInstance> {
  const { config } = options;
  const app = Fastify({
    logger: config.NODE_ENV === 'test' ? false : { level: config.LOG_LEVEL },
    bodyLimit: config.REQUEST_BODY_LIMIT_BYTES,
    trustProxy: config.TRUST_PROXY,
    requestIdHeader: 'x-request-id',
    genReqId: (request) => String(request.headers['x-request-id'] ?? crypto.randomUUID())
  });
  app.decorate('serviceInfo', { name: config.SERVICE_NAME });
  await app.register(sensible);
  await app.register(helmet, { contentSecurityPolicy: false });
  await app.register(cors, {
    origin: config.corsOrigins.length ? config.corsOrigins : false,
    credentials: false,
    allowedHeaders: ['authorization', 'content-type', 'idempotency-key', 'x-request-id']
  });
  await app.register(swagger, {
    openapi: {
      openapi: '3.1.0',
      info: { title: 'CROIP Reporting Gateway Service', version: config.SERVICE_VERSION },
      components: { securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } } },
      security: [{ bearerAuth: [] }]
    }
  });
  await app.register(swaggerUi, { routePrefix: '/docs', uiConfig: { docExpansion: 'list' } });
  await app.register(metricsPlugin);
  if (!options.skipInfrastructure) await app.register(prismaPlugin);
  await app.register(authPlugin, { config });

  // setNotFoundHandler/setErrorHandler must be registered BEFORE any child route plugin
  // (healthRoutes, ingestionRoutes). Fastify's encapsulation model binds each child plugin's
  // route context to whatever error/not-found handler is in effect on the parent AT THE TIME
  // that child finishes registering (awaited `register()` calls run to completion in order) —
  // calling setErrorHandler afterwards leaves every already-registered route silently bound to
  // Fastify's default handler, which blows up with FST_ERR_FAILED_ERROR_SERIALIZATION on any
  // route that also declares a response schema for the error's status code.
  app.setNotFoundHandler(async (request, reply) => reply.code(404).send({
    type: 'https://croip.gov.gh/problems/not-found', title: 'Not Found', status: 404,
    code: 'ROUTE_NOT_FOUND', requestId: request.id
  }));
  app.setErrorHandler(async (error, request, reply) => {
    const frameworkError = error as Error & { statusCode?: number };
    const status = error instanceof AppError ? error.statusCode : (frameworkError.statusCode ?? 500);
    const code = error instanceof AppError ? error.code : (status === 400 ? 'VALIDATION_ERROR' : 'INTERNAL_ERROR');
    if (status >= 500) request.log.error({ err: error }, 'request failed');
    else request.log.info({ err: error }, 'request rejected');
    // Do not `return` reply.send()'s result: Reply#send() resolves to the Reply instance
    // itself (not undefined), and an async error handler that returns it causes Fastify's
    // wrapThenable to call reply.send() a second time with that Reply instance as the
    // payload — which then fails schema serialization on any route with a response schema
    // for this status code. Resolving to undefined avoids the double-send.
    reply.code(status).type('application/problem+json').send({
      type: `https://croip.gov.gh/problems/${code.toLowerCase().replaceAll('_', '-')}`,
      title: status >= 500 ? 'Internal Server Error' : frameworkError.message,
      status,
      code,
      requestId: request.id,
      ...(error instanceof AppError && error.details !== undefined ? { details: error.details } : {})
    });
  });

  if (!options.skipInfrastructure) await app.register(healthRoutes, { prefix: '/health' });
  else app.get('/health/live', { config: { public: true } }, async () => ({ status: 'ok' }));
  if (!options.skipInfrastructure) await app.register(ingestionRoutes, { prefix: '/v1' });

  return app;
}
