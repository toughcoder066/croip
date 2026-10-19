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
  DATABASE_URL: 'postgresql://idarms:idarms_dev_only@127.0.0.1:5433/billing_payments?schema=public',
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

test('issuing and reading back a bill works end-to-end against the real database', async () => {
  const app = await buildApp({ config: liveConfig });
  try {
    const propertyId = randomUUID();
    const ratepayerId = randomUUID();

    const issueResponse = await app.inject({
      method: 'POST',
      url: '/v1/bills',
      headers: {
        'x-dev-subject': ratepayerId,
        'x-dev-permissions': 'bills:issue bills:read payments:receive'
      },
      payload: {
        propertyId,
        ratepayerId,
        billingPeriod: '2026-Q1',
        amountDue: 500,
        dueDate: '2026-12-31',
        externalBillRef: `TEST-${randomUUID()}`
      }
    });
    assert.equal(issueResponse.statusCode, 201);
    const bill = issueResponse.json();
    assert.equal(bill.paymentStatus, 'UNPAID');
    assert.equal(bill.ratepayerId, ratepayerId);

    const getResponse = await app.inject({
      method: 'GET',
      url: `/v1/bills/${bill.billNumber}`,
      headers: { 'x-dev-permissions': 'bills:read' }
    });
    assert.equal(getResponse.statusCode, 200);
    assert.equal(getResponse.json().billNumber, bill.billNumber);

    const anotherRatepayerId = randomUUID();
    const paymentResponse = await app.inject({
      method: 'POST',
      url: `/v1/bills/${bill.billNumber}/payments`,
      headers: { 'x-dev-permissions': 'payments:receive' },
      payload: {
        amount: 200,
        paidByRatepayerId: anotherRatepayerId,
        externalPaymentRef: `PAY-${randomUUID()}`,
        clientEventId: randomUUID(),
        paidAt: new Date().toISOString()
      }
    });
    assert.equal(paymentResponse.statusCode, 201);
    assert.equal(paymentResponse.json().paidByRatepayerId, anotherRatepayerId);

    const billAfterPayment = await app.inject({
      method: 'GET',
      url: `/v1/bills/${bill.billNumber}`,
      headers: { 'x-dev-permissions': 'bills:read' }
    });
    assert.equal(billAfterPayment.json().paymentStatus, 'PARTIALLY_PAID');

    const overpayResponse = await app.inject({
      method: 'POST',
      url: `/v1/bills/${bill.billNumber}/payments`,
      headers: { 'x-dev-permissions': 'payments:receive' },
      payload: {
        amount: 9999,
        externalPaymentRef: `PAY-${randomUUID()}`,
        clientEventId: randomUUID(),
        paidAt: new Date().toISOString()
      }
    });
    assert.equal(overpayResponse.statusCode, 400);
    assert.equal(overpayResponse.json().code, 'BAD_REQUEST');
    assert.ok(overpayResponse.json().requestId);

    const notFoundResponse = await app.inject({
      method: 'GET',
      url: '/v1/bills/NO-SUCH-BILL',
      headers: { 'x-dev-permissions': 'bills:read' }
    });
    assert.equal(notFoundResponse.statusCode, 404);
    assert.equal(notFoundResponse.json().code, 'NOT_FOUND');
  } finally {
    await app.close();
  }
});
