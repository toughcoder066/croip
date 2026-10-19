import type { FastifyPluginAsync } from 'fastify';

export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get('/live', { config: { public: true }, logLevel: 'warn' }, async () => ({ status: 'ok' }));

  app.get('/ready', { config: { public: true }, logLevel: 'warn' }, async (_request, reply) => {
    try {
      await app.prisma.$queryRaw`SELECT 1`;
      return { status: 'ready', checks: { database: 'ok' } };
    } catch (error) {
      app.log.error({ err: error }, 'readiness check failed');
      return reply.code(503).send({ status: 'not-ready', checks: { database: 'failed' } });
    }
  });
};
