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
import { identityRoutes } from './modules/identity/routes.js';
import { concessionRoutes } from './modules/concession/routes.js';

interface BuildOptions { config: AppConfig; skipInfrastructure?: boolean }

export async function buildApp(options: BuildOptions): Promise<FastifyInstance> {
  const { config } = options;
  const app = Fastify({
    logger: config.NODE_ENV === 'test' ? false : { level: config.LOG_LEVEL },
    bodyLimit: config.REQUEST_BODY_LIMIT_BYTES,
    trustProxy: config.TRUST_PROXY,
    requestIdHeader: 'x-request-id',
    genReqId: (request) => String(request.headers['x-request-id'] ?? crypto.randomUUID()),
    ajv: {
      customOptions: {
        strict: false
      }
    }
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
      info: { title: config.SERVICE_NAME, version: config.SERVICE_VERSION },
      components: { securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } } },
      security: [{ bearerAuth: [] }]
    }
  });
  await app.register(swaggerUi, { routePrefix: '/docs', uiConfig: { docExpansion: 'list' } });
  await app.register(metricsPlugin);
  if (!options.skipInfrastructure) {
    await app.register(prismaPlugin);
  }
  await app.register(authPlugin, { config });
  await app.register(healthRoutes, { prefix: '/health' });
  await app.register(identityRoutes, { prefix: '/v1' });
  await app.register(concessionRoutes, { prefix: '/v1' });

  app.setNotFoundHandler(async (request, reply) => reply.code(404).send({
    type: 'https://idarms.example/problems/not-found', title: 'Not Found', status: 404,
    code: 'ROUTE_NOT_FOUND', requestId: request.id
  }));
  app.setErrorHandler(async (error, request, reply) => {
    const frameworkError = error as Error & { statusCode?: number };
    const status = error instanceof AppError ? error.statusCode : (frameworkError.statusCode ?? 500);
    const code = error instanceof AppError ? error.code : (status === 400 ? 'VALIDATION_ERROR' : 'INTERNAL_ERROR');
    if (status >= 500) request.log.error({ err: error }, 'request failed');
    else request.log.info({ err: error }, 'request rejected');
    return reply.code(status).type('application/problem+json').send({
      type: `https://idarms.example/problems/${code.toLowerCase().replaceAll('_', '-')}`,
      title: status >= 500 ? 'Internal Server Error' : frameworkError.message,
      status,
      code,
      requestId: request.id,
      ...(error instanceof AppError && error.details !== undefined ? { details: error.details } : {})
    });
  });
  return app;
}
