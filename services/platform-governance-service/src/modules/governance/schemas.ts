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
  required: [
    'id', 'code', 'name', 'businessRegistrationNumber', 'tin', 'contactName', 'contactPhone',
    'contactEmail', 'status', 'createdAt'
  ],
  properties: {
    id: { type: 'string', format: 'uuid' },
    code: { type: 'string' },
    name: { type: 'string' },
    businessRegistrationNumber: { type: 'string' },
    tin: { type: 'string' },
    contactName: { type: 'string' },
    contactPhone: { type: 'string' },
    contactEmail: { type: 'string' },
    status: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' }
  }
};

export const createConcessionBodySchema = {
  type: 'object',
  required: ['name', 'businessRegistrationNumber', 'tin', 'contactName', 'contactPhone', 'contactEmail'],
  properties: {
    code: { type: 'string', minLength: 2, maxLength: 50 },
    name: { type: 'string', minLength: 2, maxLength: 150 },
    businessRegistrationNumber: { type: 'string', minLength: 2, maxLength: 50 },
    tin: { type: 'string', minLength: 2, maxLength: 50 },
    contactName: { type: 'string', minLength: 2, maxLength: 150 },
    contactPhone: { type: 'string', minLength: 7, maxLength: 30 },
    contactEmail: { type: 'string', format: 'email' }
  }
};

// No contractStart — an assignment's contract always starts the moment it's created
// (see service.ts's assignAssembly), never a date the caller picks.
export const assignAssemblyBodySchema = {
  type: 'object',
  required: ['assemblyId', 'contractEnd'],
  properties: {
    assemblyId: { type: 'string', format: 'uuid' },
    contractEnd: { type: 'string', format: 'date' }
  }
};

// Returned once, at issuance time (onboarding or rotation) — the only place the plaintext
// secret ever appears outside the delivery email.
export const apiClientCredentialsResponseSchema = {
  type: 'object',
  required: ['id', 'concessionId', 'clientId', 'clientSecret', 'status', 'issuedVia', 'expiresAt', 'emailDelivered'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    concessionId: { type: 'string', format: 'uuid' },
    clientId: { type: 'string' },
    clientSecret: { type: 'string' },
    status: { type: 'string' },
    issuedVia: { type: 'string', enum: ['zitadel', 'stub'] },
    expiresAt: { type: 'string', format: 'date-time' },
    emailDelivered: { type: 'boolean' }
  }
};

export const apiClientRevokedResponseSchema = {
  type: 'object',
  required: ['id', 'concessionId', 'clientId', 'status'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    concessionId: { type: 'string', format: 'uuid' },
    clientId: { type: 'string' },
    status: { type: 'string' },
    revokedAt: { type: ['string', 'null'], format: 'date-time' }
  }
};

export const concessionWithApiClientResponseSchema = {
  type: 'object',
  required: [
    'id', 'code', 'name', 'businessRegistrationNumber', 'tin', 'contactName', 'contactPhone',
    'contactEmail', 'status', 'createdAt', 'apiClient'
  ],
  properties: {
    id: { type: 'string', format: 'uuid' },
    code: { type: 'string' },
    name: { type: 'string' },
    businessRegistrationNumber: { type: 'string' },
    tin: { type: 'string' },
    contactName: { type: 'string' },
    contactPhone: { type: 'string' },
    contactEmail: { type: 'string' },
    status: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
    apiClient: apiClientCredentialsResponseSchema
  }
};

// Deliberately minimal — served with no auth to a public ratepayer-facing app, so it
// excludes everything sensitive on the full concessionResponseSchema (contact info, TIN,
// business registration number). A non-ACTIVE concession is still returned (not 404'd) so
// the caller can show "this concessionaire is no longer active" instead of a generic error.
export const concessionPublicLookupSchema = {
  type: 'object',
  required: ['id', 'code', 'name', 'status'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    code: { type: 'string' },
    name: { type: 'string' },
    status: { type: 'string' }
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
