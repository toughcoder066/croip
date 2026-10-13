import assert from 'node:assert/strict';
import { test } from 'node:test';
import crypto from 'node:crypto';
import { buildApp } from '../src/app.js';
import { loadConfig } from '../src/config.js';
import { isValidGhanaPostGps, parsePolygonCoordinates } from '@croip/contracts';

const config = loadConfig({
  NODE_ENV: 'test',
  SERVICE_NAME: 'property-management-service',
  DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/property_management?schema=public',
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

test('2. Readiness endpoint checks database connectivity', async () => {
  const app = await buildApp({ config });
  const response = await app.inject({ method: 'GET', url: '/health/ready' });
  assert.equal(response.statusCode, 200);
  const json = response.json();
  assert.equal(json.status, 'ready');
  assert.equal(json.database, 'connected');
  await app.close();
});

test('3. OpenAPI / Swagger documentation contains Property tags', async () => {
  const app = await buildApp({ config });
  const response = await app.inject({ method: 'GET', url: '/docs/json' });
  assert.equal(response.statusCode, 200);
  const spec = response.json();
  assert.ok(spec.paths['/v1/ratepayer/properties']);
  await app.close();
});

test('4. Spatial validation: GhanaPost GPS and Polygon coordinates parser', () => {
  // GhanaPost GPS validation
  assert.equal(isValidGhanaPostGps('GA-183-9024'), true);
  assert.equal(isValidGhanaPostGps('AK-039-5028'), true);
  assert.equal(isValidGhanaPostGps('ws-1234-5678'), true);
  assert.equal(isValidGhanaPostGps('INVALID-ADDR'), false);
  assert.equal(isValidGhanaPostGps('12345'), false);

  // Polygon coordinates parser
  const validPolygon = '5.6037,-0.1870; 5.6040,-0.1865; 5.6035,-0.1860; 5.6030,-0.1868';
  const parsed = parsePolygonCoordinates(validPolygon);
  assert.equal(parsed.length, 4);
  assert.equal(parsed[0]?.lat, 5.6037);
  assert.equal(parsed[0]?.lng, -0.1870);

  const invalidPolygon = '5.6037,-0.1870; 5.6040,-0.1865'; // only 2 points
  assert.equal(parsePolygonCoordinates(invalidPolygon).length, 2);
});

test('5. Rejects property registration with invalid GhanaPost GPS or < 4 polygon coordinates', async () => {
  const app = await buildApp({ config });
  const ratepayerId = crypto.randomUUID();

  // Invalid GhanaPost GPS
  const badGpsRes = await app.inject({
    method: 'POST',
    url: '/v1/ratepayer/properties',
    headers: { 'x-dev-subject': ratepayerId },
    payload: {
      propertyName: 'Accra Residency',
      polygonCoordinates: '5.6037,-0.1870; 5.6040,-0.1865; 5.6035,-0.1860; 5.6030,-0.1868',
      centroidGhanapostGps: 'INVALID_GPS',
      numberOfFloors: 2,
      buildingStatus: 'COMPLETED'
    }
  });
  assert.equal(badGpsRes.statusCode, 400);

  // Polygon with < 4 coordinates
  const badPolygonRes = await app.inject({
    method: 'POST',
    url: '/v1/ratepayer/properties',
    headers: { 'x-dev-subject': ratepayerId },
    payload: {
      propertyName: 'Accra Residency',
      polygonCoordinates: '5.6037,-0.1870; 5.6040,-0.1865',
      centroidGhanapostGps: 'GA-183-9024',
      numberOfFloors: 2,
      buildingStatus: 'COMPLETED'
    }
  });
  assert.equal(badPolygonRes.statusCode, 400);

  await app.close();
});

test('6. Authenticated ratepayer registers property with polygon, GhanaPost GPS, optional street/house, and unit', async () => {
  const app = await buildApp({ config });
  const ratepayerId = crypto.randomUUID();

  const payload = {
    propertyName: 'Kofi Villa',
    polygonCoordinates: '5.6037,-0.1870; 5.6040,-0.1865; 5.6035,-0.1860; 5.6030,-0.1868',
    centroidGhanapostGps: 'GA-183-9024',
    streetName: 'Ring Road Central',
    houseNumber: 'HSE-42B',
    numberOfFloors: 2,
    buildingStatus: 'COMPLETED',
    unit: {
      unitIdentifier: 'Penthouse Suite',
      unitType: 'APARTMENT',
      floorLevel: 2,
      ownershipType: 'OWNER',
      ownershipPercentage: 100.0,
      isPrimaryBillingContact: true
    },
    photos: [
      {
        photoType: 'FRONT_VIEW',
        mediaUrl: 'https://cdn.croip.gh/photos/kofi-villa-front.jpg'
      }
    ]
  };

  const res = await app.inject({
    method: 'POST',
    url: '/v1/ratepayer/properties',
    headers: { 'x-dev-subject': ratepayerId },
    payload
  });

  assert.equal(res.statusCode, 201);
  const json = res.json();
  assert.equal(json.success, true);
  assert.ok(json.data.id);
  assert.ok(json.data.systemPropertyCode.startsWith('CRP-'));
  assert.equal(json.data.propertyName, 'Kofi Villa');
  assert.equal(json.data.centroidGhanapostGps, 'GA-183-9024');
  assert.equal(json.data.streetName, 'Ring Road Central');
  assert.equal(json.data.houseNumber, 'HSE-42B');
  assert.equal(json.data.numberOfFloors, 2);
  assert.equal(json.data.buildingStatus, 'COMPLETED');
  assert.equal(json.data.units.length, 1);
  assert.equal(json.data.units[0].unitIdentifier, 'Penthouse Suite');
  assert.equal(json.data.units[0].ratepayerLinks.length, 1);
  assert.equal(json.data.units[0].ratepayerLinks[0].ratepayerId, ratepayerId);
  assert.equal(json.data.units[0].ratepayerLinks[0].ownershipType, 'OWNER');
  assert.equal(json.data.photos.length, 1);
  assert.equal(json.data.photos[0].photoType, 'FRONT_VIEW');

  // Verify outbox event was generated
  const outboxEvent = await app.prisma.outboxEvent.findFirst({
    where: { aggregateId: json.data.id }
  });
  assert.ok(outboxEvent);
  assert.equal(outboxEvent.eventType, 'property.registered.v1');

  await app.close();
});

test('7. Ratepayer property registration succeeds with optional streetName and houseNumber omitted', async () => {
  const app = await buildApp({ config });
  const ratepayerId = crypto.randomUUID();

  const payload = {
    propertyName: 'Rural Family Estate',
    polygonCoordinates: '5.5500,-0.2000; 5.5510,-0.1990; 5.5505,-0.1980; 5.5495,-0.1990',
    centroidGhanapostGps: 'AK-039-5028',
    numberOfFloors: 1,
    buildingStatus: 'UNDER_CONSTRUCTION'
  };

  const res = await app.inject({
    method: 'POST',
    url: '/v1/ratepayer/properties',
    headers: { 'x-dev-subject': ratepayerId },
    payload
  });

  assert.equal(res.statusCode, 201);
  const json = res.json();
  assert.equal(json.data.propertyName, 'Rural Family Estate');
  assert.equal(json.data.streetName, null);
  assert.equal(json.data.houseNumber, null);
  assert.equal(json.data.buildingStatus, 'UNDER_CONSTRUCTION');
  assert.equal(json.data.units[0].unitIdentifier, 'Main Building');

  await app.close();
});

test('8. Ratepayers can list their own properties and view details with tenant isolation', async () => {
  const app = await buildApp({ config });
  const ratepayerA = crypto.randomUUID();
  const ratepayerB = crypto.randomUUID();

  // Ratepayer A creates Property A
  const createResA = await app.inject({
    method: 'POST',
    url: '/v1/ratepayer/properties',
    headers: { 'x-dev-subject': ratepayerA },
    payload: {
      propertyName: 'Alpha Apartments',
      polygonCoordinates: '5.6037,-0.1870; 5.6040,-0.1865; 5.6035,-0.1860; 5.6030,-0.1868',
      centroidGhanapostGps: 'GA-111-2222',
      numberOfFloors: 3,
      buildingStatus: 'COMPLETED'
    }
  });
  const propertyAId = createResA.json().data.id;

  // Ratepayer B lists properties -> should not include Property A
  const listResB = await app.inject({
    method: 'GET',
    url: '/v1/ratepayer/properties',
    headers: { 'x-dev-subject': ratepayerB }
  });
  const listB = listResB.json().data;
  assert.ok(!listB.some((p: any) => p.id === propertyAId));

  // Ratepayer A lists properties -> includes Property A
  const listResA = await app.inject({
    method: 'GET',
    url: '/v1/ratepayer/properties',
    headers: { 'x-dev-subject': ratepayerA }
  });
  const listA = listResA.json().data;
  assert.ok(listA.some((p: any) => p.id === propertyAId));

  // Ratepayer A views Property A details -> 200 OK
  const viewResA = await app.inject({
    method: 'GET',
    url: `/v1/ratepayer/properties/${propertyAId}`,
    headers: { 'x-dev-subject': ratepayerA }
  });
  assert.equal(viewResA.statusCode, 200);

  // Ratepayer B attempts to view Property A details -> 403 Forbidden
  const viewResB = await app.inject({
    method: 'GET',
    url: `/v1/ratepayer/properties/${propertyAId}`,
    headers: {
      'x-dev-subject': ratepayerB,
      'x-dev-permissions': 'properties:view_own'
    }
  });
  assert.equal(viewResB.statusCode, 403);

  await app.close();
});

test('9. Sectional Titling (Act 1043): Ratepayer B can claim a unit in existing property', async () => {
  const app = await buildApp({ config });
  const ownerA = crypto.randomUUID();
  const buyerB = crypto.randomUUID();

  // Create apartment block with 2 units
  const createRes = await app.inject({
    method: 'POST',
    url: '/v1/ratepayer/properties',
    headers: { 'x-dev-subject': ownerA },
    payload: {
      propertyName: 'Cantonments Heights',
      polygonCoordinates: '5.5800,-0.1700; 5.5810,-0.1690; 5.5805,-0.1680; 5.5795,-0.1690',
      centroidGhanapostGps: 'GL-012-3456',
      numberOfFloors: 5,
      buildingStatus: 'COMPLETED',
      unit: {
        unitIdentifier: 'Unit 1A',
        unitType: 'APARTMENT',
        floorLevel: 1
      }
    }
  });
  const propertyId = createRes.json().data.id;

  // Add a second unit "Unit 2B" to the property directly via prisma
  const unit2B = await app.prisma.propertyUnit.create({
    data: {
      propertyId,
      unitIdentifier: 'Unit 2B',
      unitType: 'APARTMENT',
      floorLevel: 2
    }
  });

  // Buyer B claims Unit 2B
  const claimRes = await app.inject({
    method: 'POST',
    url: `/v1/ratepayer/properties/${propertyId}/units/${unit2B.id}/claim`,
    headers: { 'x-dev-subject': buyerB },
    payload: {
      ownershipType: 'OWNER',
      ownershipPercentage: 100.0,
      isPrimaryBillingContact: true
    }
  });

  assert.equal(claimRes.statusCode, 201);
  const claimJson = claimRes.json();
  assert.equal(claimJson.success, true);
  assert.equal(claimJson.data.unitId, unit2B.id);
  assert.equal(claimJson.data.ratepayerId, buyerB);
  assert.equal(claimJson.data.verificationStatus, 'PENDING');

  // Verify outbox event emitted for the unit claim
  const claimOutbox = await app.prisma.outboxEvent.findFirst({
    where: { aggregateId: unit2B.id, eventType: 'property.unit.claimed.v1' }
  });
  assert.ok(claimOutbox);

  // Buyer B attempts duplicate claim on same unit -> 409 Conflict
  const duplicateClaimRes = await app.inject({
    method: 'POST',
    url: `/v1/ratepayer/properties/${propertyId}/units/${unit2B.id}/claim`,
    headers: { 'x-dev-subject': buyerB },
    payload: { ownershipType: 'OWNER' }
  });
  assert.equal(duplicateClaimRes.statusCode, 409);

  // Now Buyer B lists properties -> Cantonments Heights is now visible to Buyer B!
  const listB = await app.inject({
    method: 'GET',
    url: '/v1/ratepayer/properties',
    headers: { 'x-dev-subject': buyerB }
  });
  assert.ok(listB.json().data.some((p: any) => p.id === propertyId));

  await app.close();
});

test('10. Non-admin ratepayer is denied access to admin property oversight (403 Forbidden)', async () => {
  const app = await buildApp({ config });
  const ratepayerId = crypto.randomUUID();

  const res = await app.inject({
    method: 'GET',
    url: '/v1/admin/properties',
    headers: {
      'x-dev-subject': ratepayerId,
      'x-dev-account-type': 'RATEPAYER',
      'x-dev-permissions': 'properties:view_own properties:claim'
    }
  });

  assert.equal(res.statusCode, 403);
  const json = res.json();
  assert.equal(json.code, 'FORBIDDEN');

  await app.close();
});

test('11. CROIP Admin can view all properties nationwide with pagination and search filtering', async () => {
  const app = await buildApp({ config });
  const adminId = crypto.randomUUID();
  const ratepayer1 = crypto.randomUUID();
  const ratepayer2 = crypto.randomUUID();

  // Create property 1
  await app.inject({
    method: 'POST',
    url: '/v1/ratepayer/properties',
    headers: { 'x-dev-subject': ratepayer1 },
    payload: {
      propertyName: 'Kumasi Golden Plaza',
      polygonCoordinates: '6.6800,-1.6200; 6.6810,-1.6190; 6.6805,-1.6180; 6.6795,-1.6190',
      centroidGhanapostGps: 'AK-039-5028',
      numberOfFloors: 4,
      buildingStatus: 'COMPLETED'
    }
  });

  // Create property 2
  await app.inject({
    method: 'POST',
    url: '/v1/ratepayer/properties',
    headers: { 'x-dev-subject': ratepayer2 },
    payload: {
      propertyName: 'Takoradi Harbor Warehouse',
      polygonCoordinates: '4.8900,-1.7500; 4.8910,-1.7490; 4.8905,-1.7480; 4.8895,-1.7490',
      centroidGhanapostGps: 'WS-1234-5678',
      numberOfFloors: 1,
      buildingStatus: 'UNDER_CONSTRUCTION'
    }
  });

  // Admin lists all properties
  const adminRes = await app.inject({
    method: 'GET',
    url: '/v1/admin/properties?page=1&limit=50',
    headers: {
      'x-dev-subject': adminId,
      'x-dev-account-type': 'STAFF',
      'x-dev-permissions': 'properties:read properties:manage'
    }
  });

  assert.equal(adminRes.statusCode, 200);
  const adminJson = adminRes.json();
  assert.equal(adminJson.success, true);
  assert.ok(adminJson.meta.total >= 2);
  assert.ok(adminJson.data.some((p: any) => p.propertyName === 'Kumasi Golden Plaza'));
  assert.ok(adminJson.data.some((p: any) => p.propertyName === 'Takoradi Harbor Warehouse'));

  // Admin searches specifically for 'Takoradi'
  const searchRes = await app.inject({
    method: 'GET',
    url: '/v1/admin/properties?search=Takoradi',
    headers: {
      'x-dev-subject': adminId,
      'x-dev-account-type': 'STAFF',
      'x-dev-permissions': 'properties:read'
    }
  });

  assert.equal(searchRes.statusCode, 200);
  const searchJson = searchRes.json();
  assert.ok(searchJson.data.length >= 1);
  assert.ok(searchJson.data.every((p: any) => p.propertyName.includes('Takoradi')));

  // Admin filters by building status
  const filterRes = await app.inject({
    method: 'GET',
    url: '/v1/admin/properties?buildingStatus=UNDER_CONSTRUCTION',
    headers: {
      'x-dev-subject': adminId,
      'x-dev-account-type': 'STAFF',
      'x-dev-permissions': 'properties:read'
    }
  });

  assert.equal(filterRes.statusCode, 200);
  const filterJson = filterRes.json();
  assert.ok(filterJson.data.every((p: any) => p.buildingStatus === 'UNDER_CONSTRUCTION'));

  await app.close();
});

test('12. CROIP Admin can inspect full details of any property nationwide', async () => {
  const app = await buildApp({ config });
  const adminId = crypto.randomUUID();
  const citizenId = crypto.randomUUID();

  // Citizen creates property
  const createRes = await app.inject({
    method: 'POST',
    url: '/v1/ratepayer/properties',
    headers: { 'x-dev-subject': citizenId },
    payload: {
      propertyName: 'Airport Residential Tower',
      polygonCoordinates: '5.6000,-0.1800; 5.6010,-0.1790; 5.6005,-0.1780; 5.5995,-0.1790',
      centroidGhanapostGps: 'GA-183-9024',
      numberOfFloors: 10,
      buildingStatus: 'COMPLETED'
    }
  });
  const propertyId = createRes.json().data.id;

  // Admin views property details via GET /admin/properties/:id
  const adminViewRes = await app.inject({
    method: 'GET',
    url: `/v1/admin/properties/${propertyId}`,
    headers: {
      'x-dev-subject': adminId,
      'x-dev-account-type': 'STAFF',
      'x-dev-permissions': 'properties:read'
    }
  });
  assert.equal(adminViewRes.statusCode, 200);
  assert.equal(adminViewRes.json().data.propertyName, 'Airport Residential Tower');

  // Admin also allowed through GET /ratepayer/properties/:id due to staff oversight
  const ratepayerViewRes = await app.inject({
    method: 'GET',
    url: `/v1/ratepayer/properties/${propertyId}`,
    headers: {
      'x-dev-subject': adminId,
      'x-dev-account-type': 'STAFF',
      'x-dev-permissions': 'properties:read'
    }
  });
  assert.equal(ratepayerViewRes.statusCode, 200);
  assert.equal(ratepayerViewRes.json().data.propertyName, 'Airport Residential Tower');

  await app.close();
});

test('13. Resolves 64-char session token via Identity Service without P2023 UUID error', async () => {
  const http = await import('node:http');
  const userId = crypto.randomUUID();
  const sessionToken = crypto.randomBytes(32).toString('hex'); // Exactly 64 hex chars

  // Lightweight mock Identity Service server
  const mockServer = http.createServer((req, res) => {
    if (req.url === '/v1/auth/me' && req.headers.authorization === `Bearer ${sessionToken}`) {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        data: {
          id: userId,
          accountType: 'RATEPAYER',
          email: 'ratepayer@example.com',
          roleAssignments: []
        }
      }));
    } else {
      res.writeHead(401, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Unauthorized' }));
    }
  });

  await new Promise<void>((resolve) => mockServer.listen(0, '127.0.0.1', () => resolve()));
  const address = mockServer.address() as any;
  const mockPort = address.port;

  const propertyConfig = loadConfig({
    NODE_ENV: 'test',
    SERVICE_NAME: 'property-management-service',
    DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/property_management?schema=public',
    AUTH_MODE: 'disabled',
    IDENTITY_SERVICE_URL: `http://127.0.0.1:${mockPort}`,
    RABBITMQ_URL: 'amqp://guest:guest@localhost:5672'
  });
  const propertyApp = await buildApp({ config: propertyConfig });

  // 1. Ratepayer registers property using Bearer <64-char-sessionToken>
  const createPropRes = await propertyApp.inject({
    method: 'POST',
    url: '/v1/ratepayer/properties',
    headers: { authorization: `Bearer ${sessionToken}` },
    payload: {
      propertyName: 'Kwame Mensah Residence',
      polygonCoordinates: '5.6037,-0.1870; 5.6040,-0.1865; 5.6035,-0.1860; 5.6030,-0.1868',
      centroidGhanapostGps: 'GA-183-9024',
      numberOfFloors: 1,
      buildingStatus: 'COMPLETED'
    }
  });
  assert.equal(createPropRes.statusCode, 201);
  assert.equal(createPropRes.json().data.propertyName, 'Kwame Mensah Residence');

  // 2. Ratepayer queries their properties using Bearer <64-char-sessionToken> -> NO P2023 ERROR!
  const getPropRes = await propertyApp.inject({
    method: 'GET',
    url: '/v1/ratepayer/properties',
    headers: { authorization: `Bearer ${sessionToken}` }
  });
  assert.equal(getPropRes.statusCode, 200);
  assert.equal(getPropRes.json().success, true);
  assert.equal(getPropRes.json().data.length, 1);
  assert.equal(getPropRes.json().data[0].propertyName, 'Kwame Mensah Residence');

  await propertyApp.close();
  mockServer.close();
});

test('14. Sectional Titling (Act 1043) Co-Ownership: Multiple ratepayers co-own the exact same unit with distinct percentage stakes', async () => {
  const app = await buildApp({ config });
  const ownerA = crypto.randomUUID();
  const ownerB = crypto.randomUUID();
  const strangerC = crypto.randomUUID();

  // 1. Owner A registers property with 60% stake in unit
  const registerRes = await app.inject({
    method: 'POST',
    url: '/v1/ratepayer/properties',
    headers: { 'x-dev-subject': ownerA },
    payload: {
      propertyName: 'Airport City Commercial Complex',
      polygonCoordinates: '5.5900,-0.1750; 5.5910,-0.1740; 5.5905,-0.1730; 5.5895,-0.1740',
      centroidGhanapostGps: 'GL-011-8822',
      numberOfFloors: 4,
      buildingStatus: 'COMPLETED',
      unit: {
        unitIdentifier: 'Shop G-01',
        unitType: 'SHOP',
        floorLevel: 0,
        ownershipType: 'OWNER',
        ownershipPercentage: 60.0,
        isPrimaryBillingContact: true
      }
    }
  });

  assert.equal(registerRes.statusCode, 201);
  const propertyId = registerRes.json().data.id;
  const unitId = registerRes.json().data.units[0].id;

  // 2. Owner B claims remaining 40% stake on the EXACT SAME unit
  const claimRes = await app.inject({
    method: 'POST',
    url: `/v1/ratepayer/properties/${propertyId}/units/${unitId}/claim`,
    headers: { 'x-dev-subject': ownerB },
    payload: {
      ownershipType: 'OWNER',
      ownershipPercentage: 40.0,
      isPrimaryBillingContact: false
    }
  });

  assert.equal(claimRes.statusCode, 201);

  // 3. Verify database reflects both co-owners on the exact same unit
  const dbUnit = await app.prisma.propertyUnit.findUnique({
    where: { id: unitId },
    include: { ratepayerLinks: true }
  });
  assert.equal(dbUnit?.ratepayerLinks.length, 2);
  const linkA = dbUnit?.ratepayerLinks.find((l) => l.ratepayerId === ownerA);
  const linkB = dbUnit?.ratepayerLinks.find((l) => l.ratepayerId === ownerB);
  assert.equal(Number(linkA?.ownershipPercentage), 60);
  assert.equal(linkA?.isPrimaryBillingContact, true);
  assert.equal(Number(linkB?.ownershipPercentage), 40);
  assert.equal(linkB?.isPrimaryBillingContact, false);

  // 4. Both co-owners see property in GET /v1/ratepayer/properties
  const listA = await app.inject({
    method: 'GET',
    url: '/v1/ratepayer/properties',
    headers: { 'x-dev-subject': ownerA }
  });
  assert.ok(listA.json().data.some((p: any) => p.id === propertyId));

  const listB = await app.inject({
    method: 'GET',
    url: '/v1/ratepayer/properties',
    headers: { 'x-dev-subject': ownerB }
  });
  assert.ok(listB.json().data.some((p: any) => p.id === propertyId));

  // 5. Both co-owners can inspect full details via GET /v1/ratepayer/properties/:id
  const detailA = await app.inject({
    method: 'GET',
    url: `/v1/ratepayer/properties/${propertyId}`,
    headers: { 'x-dev-subject': ownerA }
  });
  assert.equal(detailA.statusCode, 200);

  const detailB = await app.inject({
    method: 'GET',
    url: `/v1/ratepayer/properties/${propertyId}`,
    headers: { 'x-dev-subject': ownerB }
  });
  assert.equal(detailB.statusCode, 200);

  // 6. Non-owner stranger C is forbidden
  const detailC = await app.inject({
    method: 'GET',
    url: `/v1/ratepayer/properties/${propertyId}`,
    headers: { 'x-dev-subject': strangerC, 'x-dev-permissions': 'properties:view_own' }
  });
  assert.equal(detailC.statusCode, 403);

  await app.close();
});
