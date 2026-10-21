import assert from 'node:assert/strict';
import { test } from 'node:test';
import { SignJWT } from 'jose';
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

test('POST /v1/properties requires authentication (401 when no token is provided)', async () => {
  const app = await buildApp({ config, skipInfrastructure: true });
  const response = await app.inject({
    method: 'POST',
    url: '/v1/properties',
    payload: {
      code: 'PROP-ACC-001',
      polygonGeoJson: { type: 'Polygon', coordinates: [] }
    }
  });
  assert.equal(response.statusCode, 401);
  assert.equal(response.json().code, 'UNAUTHORIZED');
  await app.close();
});

test('POST /v1/properties/batch requires authentication (401 when no token is provided)', async () => {
  const app = await buildApp({ config, skipInfrastructure: true });
  const response = await app.inject({
    method: 'POST',
    url: '/v1/properties/batch',
    payload: {
      properties: [
        { code: 'PROP-ACC-001', polygonGeoJson: { type: 'Polygon', coordinates: [] } }
      ]
    }
  });
  assert.equal(response.statusCode, 401);
  assert.equal(response.json().code, 'UNAUTHORIZED');
  await app.close();
});

test('POST /v1/properties rejects invalid Bearer tokens with 401', async () => {
  const app = await buildApp({ config, skipInfrastructure: true });
  const response = await app.inject({
    method: 'POST',
    url: '/v1/properties',
    headers: {
      Authorization: 'Bearer invalid.jwt.token'
    },
    payload: {
      code: 'PROP-ACC-001',
      polygonGeoJson: { type: 'Polygon', coordinates: [] }
    }
  });
  assert.equal(response.statusCode, 401);
  assert.equal(response.json().code, 'UNAUTHORIZED');
  await app.close();
});

test('POST /v1/properties/batch rejects ratepayer callers with 403 Forbidden', async () => {
  const app = await buildApp({ config, skipInfrastructure: true });
  const response = await app.inject({
    method: 'POST',
    url: '/v1/properties/batch',
    headers: {
      'x-dev-actor-type': 'RATEPAYER',
      'x-dev-subject': '00000000-0000-0000-0000-000000000001'
    },
    payload: {
      properties: [
        { code: 'PROP-ACC-001', polygonGeoJson: { type: 'Polygon', coordinates: [] } }
      ]
    }
  });
  assert.equal(response.statusCode, 403);
  assert.equal(response.json().code, 'FORBIDDEN');
  await app.close();
});

test('POST /v1/properties rejects ratepayer registration without propertyName (400)', async () => {
  const app = await buildApp({ config, skipInfrastructure: true });
  const response = await app.inject({
    method: 'POST',
    url: '/v1/properties',
    headers: {
      'x-dev-actor-type': 'RATEPAYER',
      'x-dev-subject': '00000000-0000-0000-0000-000000000001'
    },
    payload: {
      polygonGeoJson: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.186964, 5.603716],
            [-0.185964, 5.603716],
            [-0.185964, 5.602716],
            [-0.186964, 5.602716],
            [-0.186964, 5.603716]
          ]
        ]
      },
      documents: [
        {
          documentType: 'LAND_TITLE_CERTIFICATE',
          mediaUrl: 'https://storage.croip.gov.gh/claims/ltc-001.pdf'
        }
      ]
    }
  });
  assert.equal(response.statusCode, 400);
  assert.equal(response.json().code, 'BAD_REQUEST');
  assert.match(response.json().title, /property name is required/i);
  await app.close();
});

test('POST /v1/properties rejects ratepayer registration without propertyUse (400)', async () => {
  const app = await buildApp({ config, skipInfrastructure: true });
  const response = await app.inject({
    method: 'POST',
    url: '/v1/properties',
    headers: {
      'x-dev-actor-type': 'RATEPAYER',
      'x-dev-subject': '00000000-0000-0000-0000-000000000001'
    },
    payload: {
      propertyName: 'My Residence',
      ownershipType: 'FULL',
      polygonGeoJson: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.186964, 5.603716],
            [-0.185964, 5.603716],
            [-0.185964, 5.602716],
            [-0.186964, 5.602716],
            [-0.186964, 5.603716]
          ]
        ]
      }
    }
  });
  assert.equal(response.statusCode, 400);
  assert.equal(response.json().code, 'BAD_REQUEST');
  assert.match(response.json().title, /property use .* is required/i);
  await app.close();
});

test('POST /v1/properties rejects ratepayer registration without ownershipType (400)', async () => {
  const app = await buildApp({ config, skipInfrastructure: true });
  const response = await app.inject({
    method: 'POST',
    url: '/v1/properties',
    headers: {
      'x-dev-actor-type': 'RATEPAYER',
      'x-dev-subject': '00000000-0000-0000-0000-000000000001'
    },
    payload: {
      propertyName: 'My Residence',
      propertyUse: 'RESIDENTIAL',
      polygonGeoJson: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.186964, 5.603716],
            [-0.185964, 5.603716],
            [-0.185964, 5.602716],
            [-0.186964, 5.602716],
            [-0.186964, 5.603716]
          ]
        ]
      }
    }
  });
  assert.equal(response.statusCode, 400);
  assert.equal(response.json().code, 'BAD_REQUEST');
  assert.match(response.json().title, /ownership type is required/i);
  await app.close();
});

test('POST /v1/properties rejects concession registration when required fields are missing (400)', async () => {
  const app = await buildApp({ config, skipInfrastructure: true });
  const response = await app.inject({
    method: 'POST',
    url: '/v1/properties',
    headers: {
      'x-dev-actor-type': 'CONCESSION',
      'x-dev-subject': '00000000-0000-0000-0000-000000000001',
      'x-dev-concession-id': '00000000-0000-0000-0000-000000000010'
    },
    payload: {
      polygonGeoJson: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.186964, 5.603716],
            [-0.185964, 5.603716],
            [-0.185964, 5.602716],
            [-0.186964, 5.602716],
            [-0.186964, 5.603716]
          ]
        ]
      }
      // Missing required concession fields: propertyClass, buildingStatus, propertyStatus, propertyUse, tenureType, structureType
    }
  });
  assert.equal(response.statusCode, 400);
  assert.equal(response.json().code, 'BAD_REQUEST');
  assert.match(response.json().title, /required for concession property registration/i);
  await app.close();
});

test('POST /v1/properties accepts valid HS256 Bearer token and identifies Ratepayer', async () => {
  const app = await buildApp({ config, skipInfrastructure: true });
  const secretKey = new TextEncoder().encode(config.RATEPAYER_JWT_SECRET);
  const token = await new SignJWT({
    sub: '00000000-0000-0000-0000-000000000001',
    code: 'RP-ACC-001',
    phone: '+233201234567',
    assemblyId: '01c23cab-b1b2-4dae-b99b-32ea574632d9',
    regionId: '01c23cab-b1b2-4dae-b99b-32ea574632d8'
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer('croip-ratepayer-service')
    .setAudience('croip-platform')
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secretKey);

  const response = await app.inject({
    method: 'POST',
    url: '/v1/properties',
    headers: {
      Authorization: `Bearer ${token}`
    },
    payload: {
      propertyName: 'My Residence',
      polygonGeoJson: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.186964, 5.603716],
            [-0.185964, 5.603716],
            [-0.185964, 5.602716],
            [-0.186964, 5.602716],
            [-0.186964, 5.603716]
          ]
        ]
      }
    }
  });

  // Token is verified! Because caller is identified as a Ratepayer,
  // it enforces ratepayer required fields (propertyUse, ownershipType) rather than rejecting with 401 Unauthorized
  assert.equal(response.statusCode, 400);
  assert.equal(response.json().code, 'BAD_REQUEST');
  assert.match(response.json().title, /property use .* is required/i);
  await app.close();
});

test('PATCH /v1/properties/:id requires authentication (401 when no token is provided)', async () => {
  const app = await buildApp({ config, skipInfrastructure: true });
  const response = await app.inject({
    method: 'PATCH',
    url: '/v1/properties/00000000-0000-0000-0000-000000000101',
    payload: {
      propertyName: 'Renamed Villa'
    }
  });
  assert.equal(response.statusCode, 401);
  assert.equal(response.json().code, 'UNAUTHORIZED');
  await app.close();
});



