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

// A chronological audit trail entry for one ratepayer — every real action taken on that
// account (registered, logged in, profile updated, KYC submitted/reviewed, status changed,
// property claimed/unlinked, password reset), never a synthetic/hardcoded narrative.
export const activityRecordSchema = {
  type: 'object',
  required: ['id', 'occurredAt', 'actorId', 'actorType', 'action', 'outcome'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    occurredAt: { type: 'string', format: 'date-time' },
    actorId: { type: 'string' },
    actorType: { type: 'string' },
    action: { type: 'string' },
    outcome: { type: 'string' },
    metadata: { type: 'object', additionalProperties: true }
  }
};

export const completionSchema = {
  type: 'object',
  properties: {
    completionPercentage: { type: 'integer' },
    isProfileComplete: { type: 'boolean' },
    hasVerifiedKyc: { type: 'boolean' },
    isEligibleForPropertyCreation: { type: 'boolean' },
    missingSections: { type: 'array', items: { type: 'string' } }
  }
};

export const ratepayerResponseSchema = {
  type: 'object',
  required: ['id', 'code', 'ratepayerType', 'status', 'createdAt'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    code: { type: 'string' },
    ratepayerType: { type: 'string' },
    firstName: { type: ['string', 'null'] },
    middleName: { type: ['string', 'null'] },
    lastName: { type: ['string', 'null'] },
    legalName: { type: ['string', 'null'] },
    phone: { type: ['string', 'null'] },
    email: { type: ['string', 'null'] },
    address: { type: ['string', 'null'] },
    regionId: { type: ['string', 'null'], format: 'uuid' },
    assemblyId: { type: ['string', 'null'], format: 'uuid' },
    // additionalProperties: true matters here — without it, Fastify's response
    // serializer only passes through keys explicitly listed under `properties` (none are
    // here), so every ratepayer response was silently serializing a real GeoJSON Point
    // (correctly stored in the database) down to an empty `{}`.
    locationGeo: { type: ['object', 'null'], additionalProperties: true },
    status: { type: 'string' },
    concessionId: { type: ['string', 'null'], format: 'uuid' },
    createdAt: { type: 'string', format: 'date-time' },
    completion: completionSchema,
    otp: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        channel: { type: 'string' },
        destination: { type: 'string' },
        expiresInSeconds: { type: 'integer' },
        devOtpCode: { type: 'string' }
      }
    }
  }
};

export const registerRatepayerBodySchema = {
  type: 'object',
  required: ['password'],
  properties: {
    ratepayerType: { type: 'string', enum: ['INDIVIDUAL', 'ORGANIZATION'], default: 'INDIVIDUAL' },
    firstName: { type: 'string', maxLength: 100 },
    middleName: { type: 'string', maxLength: 100 },
    lastName: { type: 'string', maxLength: 100 },
    legalName: { type: 'string', maxLength: 200 },
    phone: { type: 'string', minLength: 7, maxLength: 30 },
    number: { type: 'string', minLength: 7, maxLength: 30, description: 'Alias for phone number' },
    identifier: { type: 'string', description: 'Email address or phone number' },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6, maxLength: 100, description: 'Required login password for self-service login' },
    confirmPassword: { type: 'string', minLength: 6, maxLength: 100 },
    address: { type: 'string', maxLength: 255 },
    regionId: { type: 'string', format: 'uuid' },
    assemblyId: { type: 'string', format: 'uuid' },
    locationGeo: { type: 'object' },
    latitude: { type: 'number' },
    longitude: { type: 'number' },
    // Optional — makes this request safe to retry (e.g. a concession field agent syncing a
    // ratepayer they registered while offline, whose device isn't sure the first sync
    // attempt's response actually made it back). Generate it once, client-side, at the
    // moment the registration is first captured — never per sync attempt — and reuse the
    // same value on every retry of that same registration. See lib/idempotency.ts.
    idempotencyKey: { type: 'string', minLength: 1, maxLength: 200 }
  }
};

// Same fields as registerRatepayerBodySchema, plus the one thing a public self-service
// app has to supply that a concession's own staff request gets for free from its Bearer
// token: which concession this profile belongs to. Identified by the concession's public,
// non-secret `code` — never its real API client credential.
export const selfRegisterRatepayerBodySchema = {
  type: 'object',
  required: ['password', 'concessionCode'],
  properties: {
    ...registerRatepayerBodySchema.properties,
    concessionCode: { type: 'string', minLength: 2, maxLength: 50 }
  }
};

export const loginBodySchema = {
  type: 'object',
  required: ['password'],
  properties: {
    identifier: { type: 'string', description: 'Phone or email used at registration' },
    email: { type: 'string', description: 'Email used at registration' },
    phone: { type: 'string', description: 'Phone number used at registration' },
    number: { type: 'string', description: 'Phone number alias' },
    password: { type: 'string' }
  }
};

export const otpRequiredResponseSchema = {
  type: 'object',
  required: ['status', 'destination', 'expiresInSeconds'],
  properties: {
    status: { type: 'string', enum: ['OTP_REQUIRED'] },
    destination: { type: 'string', description: 'Masked destination the OTP was sent to' },
    expiresInSeconds: { type: 'integer' },
    devOtpCode: { type: 'string', description: 'Dev-only: the real OTP, returned since no SMS provider is configured. Never present in production.' }
  }
};

export const verifyOtpBodySchema = {
  type: 'object',
  required: ['otpCode'],
  properties: {
    identifier: { type: 'string', description: 'Email or phone number' },
    email: { type: 'string' },
    phone: { type: 'string' },
    number: { type: 'string' },
    otpCode: { type: 'string', minLength: 6, maxLength: 6 }
  }
};

// No password field — this is "I forgot it", not "I know my current one". Same identifier
// shape as login, since both ultimately look up the same account.
export const forgotPasswordBodySchema = {
  type: 'object',
  properties: {
    identifier: { type: 'string', description: 'Email or phone number used at registration' },
    email: { type: 'string' },
    phone: { type: 'string' },
    number: { type: 'string' }
  }
};

export const resetPasswordBodySchema = {
  type: 'object',
  required: ['otpCode', 'newPassword'],
  properties: {
    identifier: { type: 'string', description: 'Email or phone number used at registration' },
    email: { type: 'string' },
    phone: { type: 'string' },
    number: { type: 'string' },
    otpCode: { type: 'string', minLength: 6, maxLength: 6 },
    newPassword: { type: 'string', minLength: 6, maxLength: 100 },
    confirmNewPassword: { type: 'string', minLength: 6, maxLength: 100 }
  }
};

export const authTokenResponseSchema = {
  type: 'object',
  required: ['accessToken', 'tokenType', 'expiresInSeconds', 'ratepayer'],
  properties: {
    accessToken: { type: 'string' },
    tokenType: { type: 'string', enum: ['Bearer'] },
    expiresInSeconds: { type: 'integer' },
    ratepayer: ratepayerResponseSchema
  }
};

export const updateProfileBodySchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string', maxLength: 100 },
    middleName: { type: 'string', maxLength: 100 },
    lastName: { type: 'string', maxLength: 100 },
    legalName: { type: 'string', maxLength: 200 },
    email: { type: 'string', format: 'email' },
    phone: { type: 'string', minLength: 7, maxLength: 30 },
    number: { type: 'string', minLength: 7, maxLength: 30, description: 'Phone number alias' },
    password: { type: 'string', minLength: 6, maxLength: 100, description: 'Optional password update' },
    confirmPassword: { type: 'string', minLength: 6, maxLength: 100 },
    address: { type: 'string', maxLength: 255 },
    regionId: { type: 'string', format: 'uuid' },
    assemblyId: { type: 'string', format: 'uuid' },
    locationGeo: { type: 'object' },
    latitude: { type: 'number' },
    longitude: { type: 'number' }
  }
};

// Self-service profile update (PATCH /ratepayers/me) is deliberately more permissive than
// the concession-mediated one above about WHICH fields it covers (every genuinely
// self-owned attribute, including ratepayerType, which the staff-mediated update doesn't
// even expose) but strictly narrower about WHO can touch identity/registration data: there
// is no `email` property here at all. Deliberately no `additionalProperties: false` either
// — Fastify's AJV defaults to silently stripping disallowed extra properties rather than
// rejecting the request, which would let someone think an email/concessionId change
// succeeded when it was quietly dropped. Instead, service.ts's updateOwnProfile explicitly
// rejects the request with a clear error if email, concessionId, or any other immutable
// field is present in the raw body.
export const selfUpdateProfileBodySchema = {
  type: 'object',
  properties: {
    ratepayerType: { type: 'string', enum: ['INDIVIDUAL', 'ORGANIZATION'] },
    firstName: { type: 'string', maxLength: 100 },
    middleName: { type: 'string', maxLength: 100 },
    lastName: { type: 'string', maxLength: 100 },
    legalName: { type: 'string', maxLength: 200 },
    phone: { type: 'string', minLength: 7, maxLength: 30 },
    number: { type: 'string', minLength: 7, maxLength: 30, description: 'Phone number alias' },
    password: { type: 'string', minLength: 6, maxLength: 100, description: 'Optional password update' },
    confirmPassword: { type: 'string', minLength: 6, maxLength: 100 },
    address: { type: 'string', maxLength: 255 },
    regionId: { type: 'string', format: 'uuid' },
    assemblyId: { type: 'string', format: 'uuid' },
    locationGeo: { type: 'object' },
    latitude: { type: 'number' },
    longitude: { type: 'number' }
  }
};

export const verificationResponseSchema = {
  type: 'object',
  required: ['id', 'ratepayerId', 'provider', 'verificationStatus', 'createdAt'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    ratepayerId: { type: 'string', format: 'uuid' },
    provider: { type: 'string' },
    providerReference: { type: 'string' },
    verificationStatus: { type: 'string' },
    verifiedAt: { type: ['string', 'null'], format: 'date-time' },
    createdAt: { type: 'string', format: 'date-time' }
  }
};

export const directoryResponseSchema = {
  type: 'object',
  required: ['items', 'total', 'page', 'pageSize', 'totalPages'],
  properties: {
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          ...ratepayerResponseSchema.properties,
          verifications: { type: 'array', items: verificationResponseSchema }
        }
      }
    },
    total: { type: 'integer' },
    page: { type: 'integer' },
    pageSize: { type: 'integer' },
    totalPages: { type: 'integer' }
  }
};

export const reviewVerificationBodySchema = {
  type: 'object',
  required: ['verificationStatus'],
  properties: {
    verificationStatus: { type: 'string', enum: ['VERIFIED', 'REJECTED'] }
  }
};

export const createVerificationBodySchema = {
  type: 'object',
  properties: {
    provider: { type: 'string' },
    providerReference: { type: 'string' },
    autoVerify: { type: 'boolean', default: true }
  }
};

export const claimDocumentInputSchema = {
  type: 'object',
  properties: {
    documentTypeCode: { type: 'string' },
    documentType: { type: 'string' },
    documentNumber: { type: 'string' },
    issuingAuthority: { type: 'string' },
    fileUrl: { type: 'string' },
    mediaUrl: { type: 'string' },
    fileName: { type: 'string' },
    mimeType: { type: 'string' }
  }
};

export const claimPropertyBodySchema = {
  type: 'object',
  required: ['propertyId'],
  properties: {
    ratepayerId: { type: 'string' },
    propertyId: { type: 'string', minLength: 1 },
    unitId: { type: 'string' },
    relationship: { type: 'string' },
    ownershipType: { type: 'string' },
    ownershipPercentage: { type: 'number' },
    propertyRegistrationSource: { type: 'string' },
    documents: {
      type: 'array',
      items: claimDocumentInputSchema,
      description: 'Mandatory proof of ownership / tenancy documents required to claim property'
    }
  }
};
