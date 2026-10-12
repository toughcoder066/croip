import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildApp } from '../src/app.js';
import { loadConfig } from '../src/config.js';
import { hashPassword, verifyPassword, generateOtp, hashOtp } from '../src/modules/identity/auth-utils.js';

const config = loadConfig({
  NODE_ENV: 'test',
  SERVICE_NAME: 'identity-and-user-management-service',
  DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/identity_user_management?schema=public',
  AUTH_MODE: 'disabled',
  RABBITMQ_URL: 'amqp://guest:guest@localhost:5672'
});

test('1. Liveness endpoint is public', async () => {
  const app = await buildApp({ config });
  const response = await app.inject({ method: 'GET', url: '/health/live' });
  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json(), { status: 'ok' });
  await app.close();
});

test('2. Unknown routes use RFC 9457 standard problem envelope', async () => {
  const app = await buildApp({ config });
  const response = await app.inject({ method: 'GET', url: '/non-existent-route' });
  assert.equal(response.statusCode, 404);
  const json = response.json();
  assert.equal(json.code, 'ROUTE_NOT_FOUND');
  assert.ok(json.requestId);
  await app.close();
});

test('3. Auth utils: cryptographic password hashing and timing-safe verify', () => {
  const password = 'SuperSecretPassword123!';
  const hash = hashPassword(password);
  assert.ok(hash.includes(':'));
  assert.equal(verifyPassword(password, hash), true);
  assert.equal(verifyPassword('WrongPassword123!', hash), false);
});

test('4. Auth utils: 6-digit OTP generation and SHA-256 hashing', () => {
  const otp = generateOtp();
  assert.equal(otp.length, 6);
  assert.ok(/^\d{6}$/.test(otp));
  const hash = hashOtp(otp);
  assert.equal(hash.length, 64);
  assert.equal(hashOtp(otp), hash);
});

test('5. OpenAPI / Swagger documentation generates requestBody and segregated tags', async () => {
  const app = await buildApp({ config });
  await app.ready();
  const swagger = app.swagger();

  // Ratepayer register endpoint
  const regPath = swagger.paths?.['/v1/ratepayers/register']?.post as Record<string, any> | undefined;
  assert.ok(regPath);
  assert.ok(regPath.requestBody);
  assert.equal(regPath.tags?.[0], 'Ratepayer');

  // Ratepayer login endpoint
  const loginPath = swagger.paths?.['/v1/ratepayers/login']?.post as Record<string, any> | undefined;
  assert.ok(loginPath);
  assert.ok(loginPath.requestBody);
  assert.equal(loginPath.tags?.[0], 'Ratepayer');

  // Staff login endpoint
  const staffPath = swagger.paths?.['/v1/staff/login']?.post as Record<string, any> | undefined;
  assert.ok(staffPath);
  assert.ok(staffPath.requestBody);
  assert.equal(staffPath.tags?.[0], 'Staff & Government Oversight');

  // Access Control & RBAC endpoint
  const usersPath = swagger.paths?.['/v1/users']?.get as Record<string, any> | undefined;
  assert.ok(usersPath);
  assert.equal(usersPath.tags?.[0], 'Access Control & RBAC');

  await app.close();
});

test('6. Ratepayer Registration: Validation enforcement & duplicate handling', async () => {
  const app = await buildApp({ config });
  const uniquePhone = `23324${Math.floor(1000000 + Math.random() * 9000000)}`;

  // 6a. Fails when passwords do not match
  const mismatchRes = await app.inject({
    method: 'POST',
    url: '/v1/ratepayers/register',
    payload: {
      fullName: 'Test User',
      phone: uniquePhone,
      password: 'Password123!',
      confirmPassword: 'MismatchPassword123!'
    }
  });
  assert.equal(mismatchRes.statusCode, 400);

  // 6b. Fails when password is under 8 characters
  const shortPassRes = await app.inject({
    method: 'POST',
    url: '/v1/ratepayers/register',
    payload: {
      fullName: 'Test User',
      phone: uniquePhone,
      password: 'short',
      confirmPassword: 'short'
    }
  });
  assert.equal(shortPassRes.statusCode, 400);

  // 6c. Successfully registers when matching & valid
  const successRes = await app.inject({
    method: 'POST',
    url: '/v1/ratepayers/register',
    payload: {
      fullName: 'Kofi Owusu',
      phone: uniquePhone,
      email: `kofi.${uniquePhone}@example.com`,
      password: 'StrongPassword123!',
      confirmPassword: 'StrongPassword123!',
      preferredChannels: ['SMS'],
      tin: 'P0098765432',
      ghanaCardNumber: 'GHA-987654321-0'
    }
  });
  assert.equal(successRes.statusCode, 201);
  const body = successRes.json();
  assert.equal(body.success, true);
  assert.equal(body.data.phone, uniquePhone);
  assert.equal(body.data.accountType, 'RATEPAYER');
  assert.equal(body.data.status, 'ACTIVE');

  // 6d. Duplicate registration with same phone is rejected with 409 Conflict
  const duplicateRes = await app.inject({
    method: 'POST',
    url: '/v1/ratepayers/register',
    payload: {
      fullName: 'Kofi Owusu Clone',
      phone: uniquePhone,
      password: 'StrongPassword123!',
      confirmPassword: 'StrongPassword123!'
    }
  });
  assert.equal(duplicateRes.statusCode, 409);

  // 6e. Verify outbox event was recorded in DB
  const outboxEvent = await app.prisma.outboxEvent.findFirst({
    where: { aggregateId: body.data.id }
  });
  assert.ok(outboxEvent);
  assert.equal(outboxEvent.eventType, 'identity.ratepayer.registered.v1');

  await app.close();
});

test('7. Ratepayer 2-Step Authentication: Password verification -> OTP -> Session issuance', async () => {
  const app = await buildApp({ config });
  const uniquePhone = `23325${Math.floor(1000000 + Math.random() * 9000000)}`;
  const password = 'CorrectPassword123!';

  // Register ratepayer
  await app.inject({
    method: 'POST',
    url: '/v1/ratepayers/register',
    payload: {
      fullName: 'Abena Mansa',
      phone: uniquePhone,
      password,
      confirmPassword: password
    }
  });

  // 7a. Step 1 Login: Rejects invalid password
  const badLoginRes = await app.inject({
    method: 'POST',
    url: '/v1/ratepayers/login',
    payload: { phone: uniquePhone, password: 'WrongPassword999!' }
  });
  assert.equal(badLoginRes.statusCode, 401);

  // 7b. Step 1 Login: Valid password issues OTP and returns devOtp in test mode
  const loginRes = await app.inject({
    method: 'POST',
    url: '/v1/ratepayers/login',
    payload: { phone: uniquePhone, password }
  });
  assert.equal(loginRes.statusCode, 200);
  const loginBody = loginRes.json();
  assert.equal(loginBody.success, true);
  assert.ok(loginBody.data.devOtp);
  const otp = loginBody.data.devOtp;

  // 7c. Step 2 OTP: Rejects incorrect OTP code
  const badOtpRes = await app.inject({
    method: 'POST',
    url: '/v1/ratepayers/verify-otp',
    payload: { phone: uniquePhone, otp: '000000' }
  });
  assert.equal(badOtpRes.statusCode, 401);

  // 7d. Step 2 OTP: Validates OTP and issues authenticated session token
  const verifyRes = await app.inject({
    method: 'POST',
    url: '/v1/ratepayers/verify-otp',
    payload: { phone: uniquePhone, otp }
  });
  assert.equal(verifyRes.statusCode, 200);
  const verifyBody = verifyRes.json();
  assert.equal(verifyBody.success, true);
  assert.ok(verifyBody.data.token);
  assert.equal(verifyBody.data.user.phone, uniquePhone);
  assert.equal(verifyBody.data.user.accountType, 'RATEPAYER');

  await app.close();
});

test('8. Staff Login & CROIP Admin Onboarding with Scoped Concession/Assembly Roles', async () => {
  const app = await buildApp({ config });

  // 8a. Staff Login with default Super Admin
  const staffLoginRes = await app.inject({
    method: 'POST',
    url: '/v1/staff/login',
    payload: {
      identifier: 'admin@croip.gov.gh',
      password: 'AdminPassword123!'
    }
  });
  assert.equal(staffLoginRes.statusCode, 200);
  const staffLoginBody = staffLoginRes.json();
  assert.ok(staffLoginBody.data.token);
  assert.equal(staffLoginBody.data.user.email, 'admin@croip.gov.gh');

  // 8b. Onboard a new Rate Card Verifier staff member
  const newStaffEmail = `verifier.${Date.now()}@croip.gov.gh`;
  const onboardRes = await app.inject({
    method: 'POST',
    url: '/v1/staff/onboard',
    payload: {
      fullName: 'Dr. Kwame Addo',
      email: newStaffEmail,
      phone: `23326${Math.floor(1000000 + Math.random() * 9000000)}`,
      password: 'VerifierPassword123!',
      department: 'MMDA Valuation & Tariffs',
      staffIdNumber: 'VERIFIER-ACC-01',
      roleCode: 'RATE_CARD_VERIFIER'
    }
  });
  assert.equal(onboardRes.statusCode, 201);
  const onboardBody = onboardRes.json();
  assert.equal(onboardBody.data.email, newStaffEmail);
  assert.equal(onboardBody.data.roles[0].code, 'RATE_CARD_VERIFIER');

  // 8c. List staff members
  const staffListRes = await app.inject({
    method: 'GET',
    url: '/v1/staff'
  });
  assert.equal(staffListRes.statusCode, 200);
  assert.ok(staffListRes.json().data.length >= 2);

  await app.close();
});

test('9. Roles & Permissions: RATEPAYER has property claiming and self-management permissions', async () => {
  const app = await buildApp({ config });

  // 9a. Verify Roles endpoint
  const rolesRes = await app.inject({ method: 'GET', url: '/v1/roles' });
  assert.equal(rolesRes.statusCode, 200);
  const rolesData = rolesRes.json().data;
  assert.ok(rolesData.length >= 11);

  const ratepayerRole = rolesData.find((r: any) => r.code === 'RATEPAYER');
  assert.ok(ratepayerRole);
  assert.ok(ratepayerRole.permissions.includes('properties.claim'), 'Must have properties.claim');
  assert.ok(ratepayerRole.permissions.includes('properties.search'), 'Must have properties.search');
  assert.ok(ratepayerRole.permissions.includes('properties.own.manage'), 'Must have properties.own.manage');
  assert.ok(ratepayerRole.permissions.includes('properties.own.read'), 'Must have properties.own.read');
  assert.ok(ratepayerRole.permissions.includes('bills.own.read'), 'Must have bills.own.read');
  assert.ok(ratepayerRole.permissions.includes('payments.own.initiate'), 'Must have payments.own.initiate');

  // 9b. Verify Permissions catalog endpoint
  const permsRes = await app.inject({ method: 'GET', url: '/v1/permissions' });
  assert.equal(permsRes.statusCode, 200);
  assert.ok(permsRes.json().data.length >= 30);

  await app.close();
});

test('10. User Lifecycle: List segregated users, pagination, and status update', async () => {
  const app = await buildApp({ config });

  // 10a. Query RATEPAYER accounts only
  const ratepayersRes = await app.inject({
    method: 'GET',
    url: '/v1/users?accountType=RATEPAYER&limit=10'
  });
  assert.equal(ratepayersRes.statusCode, 200);
  const ratepayerUsers = ratepayersRes.json().data;
  assert.ok(ratepayerUsers.every((u: any) => u.accountType === 'RATEPAYER'));

  // 10b. Query STAFF accounts only
  const staffRes = await app.inject({
    method: 'GET',
    url: '/v1/users?accountType=STAFF&limit=10'
  });
  assert.equal(staffRes.statusCode, 200);
  const staffUsers = staffRes.json().data;
  assert.ok(staffUsers.every((u: any) => u.accountType === 'STAFF'));

  // 10c. Suspend a user account
  const targetUser = ratepayerUsers[0];
  if (targetUser) {
    const suspendRes = await app.inject({
      method: 'PATCH',
      url: `/v1/users/${targetUser.id}/status`,
      payload: { status: 'SUSPENDED' }
    });
    assert.equal(suspendRes.statusCode, 200);
    assert.equal(suspendRes.json().data.status, 'SUSPENDED');

    // Reactivate user
    const reactivateRes = await app.inject({
      method: 'PATCH',
      url: `/v1/users/${targetUser.id}/status`,
      payload: { status: 'ACTIVE' }
    });
    assert.equal(reactivateRes.statusCode, 200);
    assert.equal(reactivateRes.json().data.status, 'ACTIVE');
  }

  await app.close();
});
