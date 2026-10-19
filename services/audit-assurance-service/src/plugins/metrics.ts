import fp from 'fastify-plugin';
import { collectDefaultMetrics, Counter, Histogram, Registry } from '@prometheus-io/client';

export const metricsPlugin = fp(async (app) => {
  const registry = new Registry();
  collectDefaultMetrics({ register: registry, prefix: 'idarms_' });
  const requests = new Counter({
    name: 'idarms_http_requests_total',
    help: 'HTTP requests',
    labelNames: ['method', 'route', 'status'] as const,
    registers: [registry]
  });
  const duration = new Histogram({
    name: 'idarms_http_request_duration_seconds',
    help: 'HTTP request duration',
    labelNames: ['method', 'route', 'status'] as const,
    buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5],
    registers: [registry]
  });

  app.addHook('onRequest', async (request) => { request.routeOptions.config.metricStart = process.hrtime.bigint(); });
  app.addHook('onResponse', async (request, reply) => {
    const route = request.routeOptions.url ?? 'unmatched';
    const status = String(reply.statusCode);
    requests.inc({ method: request.method, route, status });
    const started = request.routeOptions.config.metricStart;
    if (typeof started === 'bigint') duration.observe({ method: request.method, route, status }, Number(process.hrtime.bigint() - started) / 1e9);
  });

  app.get('/metrics', { config: { public: true }, logLevel: 'warn' }, async (_request, reply) => {
    reply.header('content-type', registry.contentType);
    return registry.metrics();
  });
}, { name: 'metrics' });

declare module 'fastify' {
  interface FastifyContextConfig { metricStart?: bigint; public?: boolean }
}
