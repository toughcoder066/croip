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

export const propertyUpdateHistoryEntrySchema = {
  type: 'object',
  required: ['id', 'performedAt', 'performedByRef', 'action'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    performedAt: { type: 'string', format: 'date-time' },
    performedByRef: { type: 'string' },
    action: { type: 'string', enum: ['CREATED', 'METADATA_UPDATE', 'STRUCTURAL_UPDATE'] },
    changedFields: {}
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
    propertyClass: { type: ['string', 'null'] },
    buildingStatus: { type: ['string', 'null'] },
    propertyStatus: { type: 'string' },
    propertyUse: { type: ['string', 'null'] },
    tenureType: { type: ['string', 'null'] },
    structureType: { type: ['string', 'null'] },
    verificationStatus: { type: 'string' },
    registrationSource: { type: 'string', enum: ['CONCESSION', 'RATEPAYER'] },
    registeredByConcessionId: { type: ['string', 'null'], format: 'uuid' },
    createdByRatepayerId: { type: ['string', 'null'], format: 'uuid' },
    version: { type: 'integer' },
    ghanaPostGps: { type: ['string', 'null'] },
    createdBy: { type: ['string', 'null'] },
    verifiedBy: { type: ['string', 'null'] },
    verifiedAt: { type: ['string', 'null'], format: 'date-time' },
    polygonGeoJson: { type: 'object', additionalProperties: true },
    createdAt: { type: 'string', format: 'date-time' },
    // Most recent entry first. listProperties only returns the latest one (take: 1);
    // getProperty returns the full trail.
    updateHistory: { type: 'array', items: propertyUpdateHistoryEntrySchema }
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

// Opaque reference to the concession's own staff member who performed this action (see
// ConcessionPersonnel.externalStaffRef in platform-governance-service) — not validated or
// resolved here, just recorded, so every property has a genuinely attributable history.
export const staffRefSchema = { type: 'string', minLength: 1, maxLength: 100 };

export const createPropertyBodySchema = {
  type: 'object',
  required: ['polygonGeoJson'],
  properties: {
    code: { type: 'string', maxLength: 50 },
    accountNumber: { type: 'string', maxLength: 50 },
    propertyClass: { type: 'string' },
    buildingStatus: { type: 'string' },
    propertyStatus: { type: 'string' },
    propertyUse: { type: 'string' },
    tenureType: { type: 'string' },
    structureType: { type: 'string' },
    numberOfFloors: { type: 'integer', minimum: 1 },
    ghanaPostGps: { type: 'string', maxLength: 50 },
    createdBy: { type: 'string', maxLength: 150 },
    documents: {
      type: 'array',
      items: propertyDocumentInputSchema,
      description: 'Optional ownership verification documents'
    },
    polygonGeoJson: { type: 'object' },
    idempotencyKey: { type: 'string', minLength: 1, maxLength: 200 },
    staffRef: staffRefSchema
  }
};

// Single-property registration requires staffRef on the request itself; a batch instead
// requires one staffRef for the whole batch (see createBatchPropertiesBodySchema) — the
// field is declared on the shared per-property shape above (also reused as each batch
// item's shape) but only required here.
export const createSinglePropertyBodySchema = {
  ...createPropertyBodySchema,
  required: [...createPropertyBodySchema.required, 'staffRef']
};

// Field-agent offline sync: a concession's agent generates this once, locally, when the
// property is first captured in the field — resending the same key on every sync retry
// makes re-syncing after a connectivity gap safe to repeat. See lib/idempotency.ts.
export const idempotencyKeySchema = { type: 'string', minLength: 1, maxLength: 200 };

export const createBatchPropertiesBodySchema = {
  type: 'object',
  required: ['properties', 'staffRef'],
  properties: {
    properties: {
      type: 'array',
      minItems: 1,
      maxItems: 500,
      items: createPropertyBodySchema
    },
    idempotencyKey: idempotencyKeySchema,
    staffRef: staffRefSchema
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

// propertyName deliberately excluded — only the owning ratepayer can rename a property,
// never a concession or staff via this endpoint (see renamePropertyBodySchema below).
export const updatePropertyBodySchema = {
  type: 'object',
  required: ['staffRef'],
  properties: {
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
    ghanaPostGps: { type: 'string', maxLength: 50 },
    staffRef: staffRefSchema
  }
};

export const renamePropertyBodySchema = {
  type: 'object',
  required: ['propertyName'],
  properties: {
    propertyName: { type: 'string', minLength: 1, maxLength: 150 }
  }
};
