export const problemSchema = {
  type: 'object',
  required: ['type', 'title', 'status', 'code', 'requestId'],
  properties: {
    type: { type: 'string' },
    title: { type: 'string' },
    status: { type: 'integer' },
    code: { type: 'string' },
    requestId: { type: 'string' },
    details: {}
  }
};

export const userResponseSchema = {
  type: 'object',
  required: ['id', 'code', 'zitadelId', 'email', 'fullName', 'status', 'createdAt'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    code: { type: 'string' },
    zitadelId: { type: 'string' },
    countryId: { type: ['string', 'null'], format: 'uuid' },
    email: { type: 'string' },
    fullName: { type: 'string' },
    phone: { type: ['string', 'null'] },
    status: { type: 'string' },
    invitedAt: { type: ['string', 'null'], format: 'date-time' },
    invitedViaStub: { type: 'boolean' },
    realInviteSent: { type: 'boolean' },
    createdAt: { type: 'string', format: 'date-time' },
    roles: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          code: { type: 'string' },
          name: { type: 'string' },
          scopeLevel: { type: 'string' }
        }
      }
    }
  }
};

// Note: no `zitadelId` and no password field — those never come from the caller. Creating a
// user triggers a real Zitadel invite (or a logged stub if Zitadel isn't configured yet);
// see lib/zitadel-management.ts.
export const createUserBodySchema = {
  type: 'object',
  required: ['code', 'email', 'fullName'],
  properties: {
    code: { type: 'string', minLength: 3, maxLength: 50 },
    countryId: { type: 'string', format: 'uuid' },
    email: { type: 'string', format: 'email' },
    fullName: { type: 'string', minLength: 2, maxLength: 150 },
    phone: { type: 'string', maxLength: 30 },
    roleCode: { type: 'string', maxLength: 50 }
  }
};

export const updateUserBodySchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    fullName: { type: 'string', minLength: 2, maxLength: 150 },
    phone: { type: ['string', 'null'], maxLength: 30 },
    status: { type: 'string', enum: ['ACTIVE', 'SUSPENDED', 'INACTIVE'] },
    roleCode: { type: 'string', maxLength: 50 }
  }
};

export const concessionResponseSchema = {
  type: 'object',
  required: ['id', 'code', 'name', 'contactEmail', 'status', 'createdAt'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    code: { type: 'string' },
    name: { type: 'string' },
    contactEmail: { type: 'string' },
    status: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' }
  }
};

export const createConcessionBodySchema = {
  type: 'object',
  required: ['code', 'name', 'contactEmail'],
  properties: {
    code: { type: 'string', minLength: 2, maxLength: 50 },
    name: { type: 'string', minLength: 2, maxLength: 150 },
    contactEmail: { type: 'string', format: 'email' }
  }
};

export const assignAssemblyBodySchema = {
  type: 'object',
  required: ['assemblyId', 'contractStart', 'contractEnd'],
  properties: {
    assemblyId: { type: 'string', format: 'uuid' },
    contractStart: { type: 'string', format: 'date' },
    contractEnd: { type: 'string', format: 'date' }
  }
};

export const provisionApiClientResponseSchema = {
  type: 'object',
  required: ['id', 'concessionId', 'clientId', 'clientSecret', 'status', 'expiresAt'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    concessionId: { type: 'string', format: 'uuid' },
    clientId: { type: 'string' },
    clientSecret: { type: 'string' },
    status: { type: 'string' },
    expiresAt: { type: 'string', format: 'date-time' }
  }
};

export const registerPersonnelBodySchema = {
  type: 'object',
  required: ['externalStaffRef', 'fullName', 'phone'],
  properties: {
    externalStaffRef: { type: 'string', minLength: 2, maxLength: 100 },
    fullName: { type: 'string', minLength: 2, maxLength: 150 },
    phone: { type: 'string', minLength: 7, maxLength: 30 }
  }
};
