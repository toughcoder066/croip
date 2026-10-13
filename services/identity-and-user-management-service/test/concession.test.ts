import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildApp } from '../src/app.js';
import { loadConfig } from '../src/config.js';
import { Permissions } from '@croip/contracts';

const config = loadConfig({
  ...process.env,
  NODE_ENV: 'test',
  AUTH_MODE: 'disabled'
});

test('Concessionaire Onboarding, MMDA Assignment & API Credentials Integration Suite', async (t) => {
  const app = await buildApp({ config });
  await app.ready();

  const adminHeaders = {
    'x-dev-subject': '00000000-0000-0000-0000-000000000099',
    'x-dev-permissions': [
      Permissions.MANAGE_CONCESSIONAIRES,
      Permissions.VIEW_CONCESSIONAIRES,
      Permissions.MANAGE_MUNICIPALITIES,
      Permissions.VIEW_MUNICIPALITIES,
      Permissions.MANAGE_API_CLIENTS
    ].join(' ')
  };

  const unauthorizedHeaders = {
    'x-dev-subject': '00000000-0000-0000-0000-000000000055',
    'x-dev-permissions': 'ratepayer:read'
  };

  let concessionaireId = '';
  let concessionaire2Id = '';
  let assemblyId = '';
  let assignmentId = '';
  let apiClientId = '';

  const timestamp = Date.now();
  const regNumber1 = `REG-CON-${timestamp}`;
  const regNumber2 = `REG-CON2-${timestamp}`;
  const assemblyCode = `ASM-${timestamp % 10000}`;

  await t.test('1. Rejects concessionaire creation without required permission (403 Forbidden)', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/v1/admin/concessionaires',
      headers: unauthorizedHeaders,
      payload: {
        name: 'Unauthorized Tech Ltd',
        registrationNumber: `REG-NOAUTH-${timestamp}`,
        contactEmail: 'noauth@test.gh',
        contactPhone: '233240000001'
      }
    });

    assert.equal(res.statusCode, 403);
  });

  await t.test('2. CROIP Admin successfully onboards new partner concessionaire (201 Created)', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/v1/admin/concessionaires',
      headers: adminHeaders,
      payload: {
        name: 'RevTech Solutions Ghana Ltd',
        registrationNumber: regNumber1,
        contactEmail: 'partners@revtech.gh',
        contactPhone: '233241002000'
      }
    });

    assert.equal(res.statusCode, 201);
    const body = res.json();
    assert.equal(body.success, true);
    assert.equal(body.data.name, 'RevTech Solutions Ghana Ltd');
    assert.equal(body.data.registrationNumber, regNumber1);
    assert.equal(body.data.status, 'ACTIVE');
    assert.ok(body.data.id);
    concessionaireId = body.data.id;
  });

  await t.test('3. Rejects duplicate registration number with 409 Conflict', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/v1/admin/concessionaires',
      headers: adminHeaders,
      payload: {
        name: 'Duplicate Entity Ltd',
        registrationNumber: regNumber1,
        contactEmail: 'dup@test.gh',
        contactPhone: '233241002001'
      }
    });

    assert.equal(res.statusCode, 409);
    const body = res.json();
    assert.equal(body.code, 'CONFLICT');
  });

  await t.test('4. Onboards a second concessionaire for territory conflict testing', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/v1/admin/concessionaires',
      headers: adminHeaders,
      payload: {
        name: 'GoldCoast Revenue Partners',
        registrationNumber: regNumber2,
        contactEmail: 'info@goldcoastrev.gh',
        contactPhone: '233201112233'
      }
    });

    assert.equal(res.statusCode, 201);
    concessionaire2Id = res.json().data.id;
  });

  await t.test('5. Lists concessionaires with search and pagination (200 OK)', async () => {
    const res = await app.inject({
      method: 'GET',
      url: `/v1/admin/concessionaires?search=RevTech`,
      headers: adminHeaders
    });

    assert.equal(res.statusCode, 200);
    const body = res.json();
    assert.equal(body.success, true);
    assert.ok(body.data.items.length >= 1);
    assert.equal(body.data.items[0].id, concessionaireId);
  });

  await t.test('6. Retrieves full concessionaire details including assignments (200 OK)', async () => {
    const res = await app.inject({
      method: 'GET',
      url: `/v1/admin/concessionaires/${concessionaireId}`,
      headers: adminHeaders
    });

    assert.equal(res.statusCode, 200);
    const body = res.json();
    assert.equal(body.data.id, concessionaireId);
    assert.ok(Array.isArray(body.data.assignments));
    assert.ok(Array.isArray(body.data.apiClients));
  });

  await t.test('7. Updates concessionaire status to SUSPENDED and back to ACTIVE', async () => {
    const suspendRes = await app.inject({
      method: 'PATCH',
      url: `/v1/admin/concessionaires/${concessionaireId}/status`,
      headers: adminHeaders,
      payload: { status: 'SUSPENDED' }
    });
    assert.equal(suspendRes.statusCode, 200);
    assert.equal(suspendRes.json().data.status, 'SUSPENDED');

    const activateRes = await app.inject({
      method: 'PATCH',
      url: `/v1/admin/concessionaires/${concessionaireId}/status`,
      headers: adminHeaders,
      payload: { status: 'ACTIVE' }
    });
    assert.equal(activateRes.statusCode, 200);
    assert.equal(activateRes.json().data.status, 'ACTIVE');
  });

  await t.test('8. Registers a Municipal Assembly (MMDA) (201 Created)', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/v1/admin/assemblies',
      headers: adminHeaders,
      payload: {
        code: assemblyCode,
        name: `Accra Central Municipal Assembly ${assemblyCode}`,
        region: 'Greater Accra'
      }
    });

    assert.equal(res.statusCode, 201);
    const body = res.json();
    assert.equal(body.data.code, assemblyCode);
    assemblyId = body.data.id;
  });

  await t.test('9. Rejects duplicate assembly code with 409 Conflict', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/v1/admin/assemblies',
      headers: adminHeaders,
      payload: {
        code: assemblyCode,
        name: 'Another Duplicate Assembly',
        region: 'Greater Accra'
      }
    });

    assert.equal(res.statusCode, 409);
  });

  await t.test('10. Assigns MMDA concession territory to Concessionaire 1 (201 Created)', async () => {
    const res = await app.inject({
      method: 'POST',
      url: `/v1/admin/concessionaires/${concessionaireId}/concessions`,
      headers: adminHeaders,
      payload: {
        assemblyId,
        contractStartDate: '2026-01-01T00:00:00.000Z',
        contractEndDate: '2028-12-31T23:59:59.000Z'
      }
    });

    assert.equal(res.statusCode, 201);
    const body = res.json();
    assert.equal(body.data.concessionaireId, concessionaireId);
    assert.equal(body.data.assemblyId, assemblyId);
    assert.equal(body.data.status, 'ACTIVE');
    assignmentId = body.data.id;
  });

  await t.test('11. Enforces single active concessionaire per MMDA (rejects overlap with 409 Conflict)', async () => {
    const conflictRes = await app.inject({
      method: 'POST',
      url: `/v1/admin/concessionaires/${concessionaire2Id}/concessions`,
      headers: adminHeaders,
      payload: {
        assemblyId,
        contractStartDate: '2026-06-01T00:00:00.000Z',
        contractEndDate: '2029-06-01T00:00:00.000Z'
      }
    });

    assert.equal(conflictRes.statusCode, 409);
    const body = conflictRes.json();
    assert.equal(body.code, 'CONFLICT');
    assert.match(body.title || body.message || '', /already has an active concession/i);
  });

  await t.test('12. Terminates active concession assignment early (200 OK)', async () => {
    const res = await app.inject({
      method: 'PATCH',
      url: `/v1/admin/concessions/${assignmentId}/terminate`,
      headers: adminHeaders
    });

    assert.equal(res.statusCode, 200);
    assert.equal(res.json().data.status, 'TERMINATED');
  });

  await t.test('13. Assembly can now be assigned to Concessionaire 2 after prior contract terminated', async () => {
    const res = await app.inject({
      method: 'POST',
      url: `/v1/admin/concessionaires/${concessionaire2Id}/concessions`,
      headers: adminHeaders,
      payload: {
        assemblyId,
        contractStartDate: '2026-06-01T00:00:00.000Z',
        contractEndDate: '2029-06-01T00:00:00.000Z'
      }
    });

    assert.equal(res.statusCode, 201);
    assert.equal(res.json().data.concessionaireId, concessionaire2Id);
  });

  await t.test('14. Provisions M2M API Client credentials (revealing secret once) (201 Created)', async () => {
    const res = await app.inject({
      method: 'POST',
      url: `/v1/admin/concessionaires/${concessionaireId}/api-clients`,
      headers: adminHeaders,
      payload: {
        name: 'Field Enumeration Service API',
        allowedIps: ['197.251.12.0/24'],
        rateLimitPerMinute: 1200
      }
    });

    assert.equal(res.statusCode, 201);
    const body = res.json();
    assert.equal(body.success, true);
    assert.ok(body.data.clientId.startsWith('crp_live_'));
    assert.ok(body.data.clientSecret.startsWith('crp_sec_'));
    assert.equal(body.data.rateLimitPerMinute, 1200);
    assert.equal(body.data.status, 'ACTIVE');
    apiClientId = body.data.clientId;
  });

  await t.test('15. Rotates M2M API Client secret (200 OK)', async () => {
    const res = await app.inject({
      method: 'POST',
      url: `/v1/admin/concessionaires/${concessionaireId}/api-clients/${apiClientId}/rotate`,
      headers: adminHeaders
    });

    assert.equal(res.statusCode, 200);
    const body = res.json();
    assert.equal(body.success, true);
    assert.equal(body.data.clientId, apiClientId);
    assert.ok(body.data.clientSecret.startsWith('crp_sec_'));
  });

  await t.test('16. Revokes M2M API Client credentials (200 OK)', async () => {
    const res = await app.inject({
      method: 'DELETE',
      url: `/v1/admin/concessionaires/${concessionaireId}/api-clients/${apiClientId}`,
      headers: adminHeaders
    });

    assert.equal(res.statusCode, 200);

    // Verify rotation on revoked client is rejected
    const rotateRes = await app.inject({
      method: 'POST',
      url: `/v1/admin/concessionaires/${concessionaireId}/api-clients/${apiClientId}/rotate`,
      headers: adminHeaders
    });
    assert.equal(rotateRes.statusCode, 400);
  });

  await t.test('17. OpenAPI / Swagger documentation includes concessionaire tags & endpoints', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/docs/json'
    });

    assert.equal(res.statusCode, 200);
    const swaggerDoc = res.json();
    assert.ok(swaggerDoc.paths['/v1/admin/concessionaires']);
    assert.ok(swaggerDoc.paths['/v1/admin/assemblies']);
    assert.ok(swaggerDoc.paths['/v1/admin/concessionaires/{id}/concessions']);
    assert.ok(swaggerDoc.paths['/v1/admin/concessionaires/{id}/api-clients']);
  });

  await app.close();
});
