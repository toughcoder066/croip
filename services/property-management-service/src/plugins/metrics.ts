import fp from 'fastify-plugin';
import { collectDefaultMetrics, Registry } from '@prometheus-io/client';

export const metricsPlugin = fp(async (app) => {
  const register = new Registry();
  collectDefaultMetrics({ register });

  app.get('/metrics', async (_request, reply) => {
    reply.header('content-type', register.contentType);
    return register.metrics();
  });
}, { name: 'metrics' });
