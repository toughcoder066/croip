import type { FastifyPluginAsync } from 'fastify';

export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get('/live', async () => ({ status: 'ok' }));

  app.get('/ready', async (_request, reply) => {
    try {
      await app.prisma.$queryRaw`SELECT 1`;
      return { status: 'ready', database: 'connected' };
    } catch {
      return reply.code(503).send({ status: 'unhealthy', database: 'disconnected' });
    }
  });
};
