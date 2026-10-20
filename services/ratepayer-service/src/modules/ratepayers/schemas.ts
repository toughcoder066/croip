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

export const ratepayerResponseSchema = {
  type: 'object',
  required: ['id', 'code', 'ratepayerType', 'legalName', 'phone', 'regionId', 'assemblyId', 'createdAt'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    code: { type: 'string' },
    ratepayerType: { type: 'string' },
    legalName: { type: 'string' },
    phone: { type: 'string' },
    email: { type: ['string', 'null'] },
    regionId: { type: 'string', format: 'uuid' },
    assemblyId: { type: 'string', format: 'uuid' },
    status: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' }
  }
};

export const registerRatepayerBodySchema = {
  type: 'object',
  required: ['legalName', 'phone', 'regionId', 'assemblyId', 'locationGeo', 'password'],
  properties: {
    ratepayerType: { type: 'string', enum: ['INDIVIDUAL', 'ORGANIZATION'], default: 'INDIVIDUAL' },
    legalName: { type: 'string', minLength: 2, maxLength: 200 },
    phone: { type: 'string', minLength: 9, maxLength: 30 },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 8, maxLength: 100, description: 'Sets the login password for phone/email + password + OTP self-service login' },
    regionId: { type: 'string', format: 'uuid' },
    assemblyId: { type: 'string', format: 'uuid' },
    locationGeo: { type: 'object' }
  }
};

export const loginBodySchema = {
  type: 'object',
  required: ['identifier', 'password'],
  properties: {
    identifier: { type: 'string', description: 'Phone or email used at registration' },
    password: { type: 'string' }
  }
};

export const otpRequiredResponseSchema = {
  type: 'object',
  required: ['status', 'destination', 'expiresInSeconds'],
  properties: {
    status: { type: 'string', enum: ['OTP_REQUIRED'] },
    destination: { type: 'string', description: 'Masked phone number the OTP was sent to' },
    expiresInSeconds: { type: 'integer' },
    devOtpCode: { type: 'string', description: 'Dev-only: the real OTP, returned since no SMS provider is configured. Never present in production.' }
  }
};

export const verifyOtpBodySchema = {
  type: 'object',
  required: ['identifier', 'otpCode'],
  properties: {
    identifier: { type: 'string' },
    otpCode: { type: 'string', minLength: 6, maxLength: 6 }
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
    legalName: { type: 'string', minLength: 2, maxLength: 200 },
    email: { type: 'string', format: 'email' },
    locationGeo: { type: 'object' }
  }
};

export const linkOwnPropertyBodySchema = {
  type: 'object',
  required: ['propertyId', 'unitId'],
  properties: {
    propertyId: { type: 'string', format: 'uuid' },
    unitId: { type: 'string', format: 'uuid' },
    ownershipType: { type: 'string', default: 'OWNER' }
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
