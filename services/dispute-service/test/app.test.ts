import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { test } from 'node:test';
import { buildApp } from '../src/app.js';
import { loadConfig } from '../src/config.js';

const config = loadConfig({
  NODE_ENV: 'test',
  DATABASE_URL: 'postgresql://unused:unused@localhost:5432/unused',
  AUTH_MODE: 'disabled',
  RABBITMQ_URL: 'amqp://unused:unused@localhost:5672'
});

const liveConfig = loadConfig({
  NODE_ENV: 'test',
  DATABASE_URL: 'postgresql://idarms:idarms_dev_only@127.0.0.1:5433/disputes?schema=public',
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

test('raising, reviewing, and resolving a dispute works end-to-end against the real database', async () => {
  const app = await buildApp({ config: liveConfig });
  try {
    const ratepayerId = randomUUID();

    const raiseResponse = await app.inject({
      method: 'POST',
      url: '/v1/disputes',
      headers: {
        'x-dev-subject': ratepayerId,
        'x-dev-permissions': 'disputes:raise disputes:read disputes:review'
      },
      payload: {
        disputeType: 'BILLING',
        note: 'My bill amount looks wrong for this quarter.'
      }
    });
    assert.equal(raiseResponse.statusCode, 201);
    const dispute = raiseResponse.json();
    assert.equal(dispute.status, 'OPEN');
    assert.equal(dispute.raisedByRatepayerId, ratepayerId);

    const getResponse = await app.inject({
      method: 'GET',
      url: `/v1/disputes/${dispute.code}`,
      headers: { 'x-dev-permissions': 'disputes:read' }
    });
    assert.equal(getResponse.statusCode, 200);
    assert.equal(getResponse.json().comments.length, 1);

    const invalidTransition = await app.inject({
      method: 'PATCH',
      url: `/v1/disputes/${dispute.code}/status`,
      headers: { 'x-dev-permissions': 'disputes:review' },
      payload: { status: 'RESOLVED' }
    });
    assert.equal(invalidTransition.statusCode, 400);

    const underReview = await app.inject({
      method: 'PATCH',
      url: `/v1/disputes/${dispute.code}/status`,
      headers: { 'x-dev-permissions': 'disputes:review' },
      payload: { status: 'UNDER_REVIEW' }
    });
    assert.equal(underReview.statusCode, 200);
    assert.equal(underReview.json().status, 'UNDER_REVIEW');

    const resolved = await app.inject({
      method: 'PATCH',
      url: `/v1/disputes/${dispute.code}/status`,
      headers: { 'x-dev-permissions': 'disputes:review' },
      payload: { status: 'RESOLVED', resolution: 'Bill recalculated and corrected.' }
    });
    assert.equal(resolved.statusCode, 200);
    assert.equal(resolved.json().status, 'RESOLVED');
    assert.ok(resolved.json().resolvedAt);

    const notFoundResponse = await app.inject({
      method: 'GET',
      url: '/v1/disputes/NO-SUCH-DISPUTE',
      headers: { 'x-dev-permissions': 'disputes:read' }
    });
    assert.equal(notFoundResponse.statusCode, 404);
    assert.equal(notFoundResponse.json().code, 'NOT_FOUND');
    assert.ok(notFoundResponse.json().requestId);

    const forbiddenResponse = await app.inject({
      method: 'POST',
      url: `/v1/disputes/${dispute.code}/comments`,
      headers: { 'x-dev-permissions': 'bills:read' },
      payload: { body: 'should be rejected' }
    });
    assert.equal(forbiddenResponse.statusCode, 403);
    assert.equal(forbiddenResponse.json().code, 'FORBIDDEN');
  } finally {
    await app.close();
  }
});
