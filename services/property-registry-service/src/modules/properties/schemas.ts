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

export const propertyResponseSchema = {
  type: 'object',
  required: ['id', 'code', 'assemblyId', 'verificationStatus', 'createdAt'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    code: { type: 'string' },
    accountNumber: { type: ['string', 'null'] },
    propertyName: { type: ['string', 'null'] },
    assemblyId: { type: 'string', format: 'uuid' },
    propertyClass: { type: 'string' },
    buildingStatus: { type: 'string' },
    propertyStatus: { type: 'string' },
    propertyUse: { type: 'string' },
    tenureType: { type: 'string' },
    structureType: { type: 'string' },
    verificationStatus: { type: 'string' },
    registrationSource: { type: 'string', enum: ['CONCESSION', 'RATEPAYER'] },
    registeredByConcessionId: { type: ['string', 'null'], format: 'uuid' },
    createdByRatepayerId: { type: ['string', 'null'], format: 'uuid' },
    polygonGeoJson: { type: 'object', additionalProperties: true },
    createdAt: { type: 'string', format: 'date-time' }
  }
};

export const propertyDocumentInputSchema = {
  type: 'object',
  required: ['documentType', 'mediaUrl'],
  properties: {
    documentType: {
      type: 'string',
      enum: [
        'LAND_TITLE_CERTIFICATE',
        'INDENTURE',
        'BUILDING_PERMIT',
        'SITE_PLAN',
        'PURCHASE_AGREEMENT',
        'UTILITY_BILL',
        'STATUTORY_DECLARATION',
        'TENANCY_AGREEMENT'
      ]
    },
    documentNumber: { type: 'string', maxLength: 100 },
    issuingAuthority: { type: 'string', maxLength: 150 },
    issueDate: { type: 'string' },
    mediaUrl: { type: 'string' },
    fileSizeBytes: { type: 'integer' },
    mimeType: { type: 'string' }
  }
};

export const createPropertyBodySchema = {
  type: 'object',
  required: ['polygonGeoJson'],
  properties: {
    code: { type: 'string', maxLength: 50 },
    accountNumber: { type: 'string', maxLength: 50 },
    propertyName: { type: 'string', maxLength: 150 },
    propertyClass: { type: 'string' },
    buildingStatus: { type: 'string' },
    propertyStatus: { type: 'string' },
    propertyUse: { type: 'string' },
    tenureType: { type: 'string' },
    structureType: { type: 'string' },
    registrationSource: { type: 'string', enum: ['CONCESSION', 'RATEPAYER'], default: 'CONCESSION' },
    createdByRatepayerId: { type: 'string', format: 'uuid' },
    assemblyId: {
      type: 'string',
      format: 'uuid',
      description: 'Ratepayer self-service only — overrides the ratepayer\'s own registered assembly if the property is elsewhere. Ignored (and taken from the caller\'s own context) for staff/concession requests.'
    },
    documents: {
      type: 'array',
      items: propertyDocumentInputSchema,
      description: 'Mandatory ownership verification documents when registered from ratepayer end'
    },
    polygonGeoJson: { type: 'object' }
  }
};

export const createBatchPropertiesBodySchema = {
  type: 'object',
  required: ['properties'],
  properties: {
    properties: {
      type: 'array',
      minItems: 1,
      maxItems: 500,
      items: createPropertyBodySchema
    }
  }
};

export const batchPropertiesResponseSchema = {
  type: 'object',
  required: ['success', 'count', 'properties'],
  properties: {
    success: { type: 'boolean' },
    count: { type: 'integer' },
    properties: {
      type: 'array',
      items: propertyResponseSchema
    }
  }
};

export const uploadPremisesDocumentBodySchema = {
  type: 'object',
  required: ['documentType', 'mediaUrl', 'staffRef', 'deviceId', 'premisesCoordinates'],
  properties: {
    ratepayerId: { type: 'string', format: 'uuid' },
    documentType: {
      type: 'string',
      enum: [
        'LAND_TITLE_CERTIFICATE',
        'INDENTURE',
        'BUILDING_PERMIT',
        'SITE_PLAN',
        'PURCHASE_AGREEMENT',
        'UTILITY_BILL',
        'STATUTORY_DECLARATION',
        'TENANCY_AGREEMENT'
      ]
    },
    documentNumber: { type: 'string', maxLength: 100 },
    issuingAuthority: { type: 'string', maxLength: 150 },
    issueDate: { type: 'string' },
    mediaUrl: { type: 'string' },
    staffRef: { type: 'string', minLength: 2, maxLength: 50 },
    deviceId: { type: 'string', minLength: 2, maxLength: 50 },
    premisesCoordinates: {
      type: 'object',
      required: ['latitude', 'longitude'],
      properties: {
        latitude: { type: 'number', minimum: -90, maximum: 90 },
        longitude: { type: 'number', minimum: -180, maximum: 180 },
        accuracyMeters: { type: 'number', minimum: 0 }
      }
    }
  }
};

export const createUnitBodySchema = {
  type: 'object',
  required: ['unitIdentifier'],
  properties: {
    unitIdentifier: { type: 'string', minLength: 1, maxLength: 50 },
    unitType: { type: 'string', default: 'WHOLE_BUILDING' },
    floorLevel: { type: 'integer', default: 0 }
  }
};

export const submitVerificationBodySchema = {
  type: 'object',
  required: ['verifiedByPersonnelId', 'verifierCoordinates', 'isWithinPolygon', 'verifiedSnapshot', 'capturedAt', 'outcome'],
  properties: {
    verifiedByPersonnelId: { type: 'string', format: 'uuid' },
    verifierCoordinates: {
      type: 'object',
      required: ['latitude', 'longitude'],
      properties: {
        latitude: { type: 'number', minimum: -90, maximum: 90 },
        longitude: { type: 'number', minimum: -180, maximum: 180 }
      }
    },
    isWithinPolygon: { type: 'boolean' },
    verifiedSnapshot: { type: 'object' },
    capturedAt: { type: 'string', format: 'date-time' },
    outcome: { type: 'string', enum: ['VERIFIED', 'DISPUTED_LOCATION', 'NOT_FOUND', 'ACCESS_DENIED'] },
    notes: { type: 'string', maxLength: 2000 }
  }
};

export const reviewVerificationBodySchema = {
  type: 'object',
  required: ['reviewStatus', 'reviewedByPersonnelId'],
  properties: {
    reviewStatus: { type: 'string', enum: ['APPROVED', 'REJECTED'] },
    reviewedByPersonnelId: { type: 'string', format: 'uuid' },
    reviewNotes: { type: 'string', maxLength: 2000 }
  }
};

export const verificationResponseSchema = {
  type: 'object',
  required: ['id', 'propertyId', 'outcome', 'reviewStatus', 'capturedAt'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    propertyId: { type: 'string', format: 'uuid' },
    verifiedByPersonnelId: { type: 'string', format: 'uuid' },
    isWithinPolygon: { type: 'boolean' },
    outcome: { type: 'string' },
    notes: { type: ['string', 'null'] },
    reviewStatus: { type: 'string' },
    reviewedByPersonnelId: { type: ['string', 'null'] },
    reviewedAt: { type: ['string', 'null'], format: 'date-time' },
    reviewNotes: { type: ['string', 'null'] },
    capturedAt: { type: 'string', format: 'date-time' }
  }
};

export const updatePropertyBodySchema = {
  type: 'object',
  properties: {
    propertyName: { type: 'string', maxLength: 150 },
    accountNumber: { type: 'string', maxLength: 50 },
    propertyUse: { type: 'string' },
    structureType: { type: 'string' },
    buildingStatus: { type: 'string' },
    propertyClass: { type: 'string' },
    tenureType: { type: 'string' },
    numberOfFloors: { type: 'integer', minimum: 1 },
    landAreaSqm: { type: 'number', minimum: 0 },
    leaseDurationYears: { type: 'integer', minimum: 0 },
    polygonGeoJson: { type: 'object' },
    claimedByRatepayerId: { type: 'string', format: 'uuid' },
    createdByRatepayerId: { type: 'string', format: 'uuid' }
  }
};
