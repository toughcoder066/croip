import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildApp } from '../src/app.js';
import { loadConfig } from '../src/config.js';

const config = loadConfig({
  NODE_ENV: 'test',
  DATABASE_URL: 'postgresql://unused:unused@localhost:5432/unused',
  AUTH_MODE: 'disabled',
  RABBITMQ_URL: 'amqp://unused:unused@localhost:5672'
});

test('liveness endpoint is public', async () => {
  const app = await buildApp({ config, skipInfrastructure: true });
  const response = await app.inject({ method: 'GET', url: '/health/live' });
  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json(), { status: 'ok' });
  await app.close();
});

test('unknown routes use the standard problem envelope', async () => {
  const app = await buildApp({ config, skipInfrastructure: true });
  const response = await app.inject({ method: 'GET', url: '/missing' });
  assert.equal(response.statusCode, 404);
  assert.equal(response.json().code, 'ROUTE_NOT_FOUND');
  assert.ok(response.json().requestId);
  await app.close();
});
