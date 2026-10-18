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

export const providerEvidenceInputSchema = {
  type: 'object',
  required: ['providerId', 'providerRef', 'channel', 'grossMinor', 'netMinor', 'paymentTime', 'rawFeed'],
  properties: {
    providerId: { type: 'string', minLength: 2 },
    providerRef: { type: 'string', minLength: 2 },
    channel: { type: 'string', enum: ['MOMO', 'BANK_TRANSFER', 'CARD', 'TREASURY'] },
    currency: { type: 'string', default: 'GHS' },
    grossMinor: { type: 'integer', minimum: 0 },
    feeMinor: { type: 'integer', minimum: 0 },
    netMinor: { type: 'integer', minimum: 0 },
    paymentTime: { type: 'string', format: 'date-time' },
    declaredOutcome: { type: 'string', enum: ['CONFIRMED', 'FAILED', 'REVERSED'] },
    accountRef: { type: 'string' },
    rawFeed: { type: 'object' }
  }
};

export const providerEvidenceResponseSchema = {
  type: 'object',
  required: ['id', 'providerId', 'providerRef', 'channel', 'grossMinor', 'declaredOutcome', 'createdAt'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    providerId: { type: 'string' },
    providerRef: { type: 'string' },
    channel: { type: 'string' },
    grossMinor: { type: 'integer' },
    declaredOutcome: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' }
  }
};

export const controlTotalInputSchema = {
  type: 'object',
  required: ['authorityCode', 'periodStart', 'periodEnd', 'transactionCount', 'totalAmountMinor', 'manifestRef'],
  properties: {
    authorityCode: { type: 'string', minLength: 2 },
    periodStart: { type: 'string', format: 'date-time' },
    periodEnd: { type: 'string', format: 'date-time' },
    transactionCount: { type: 'integer', minimum: 0 },
    totalAmountMinor: { type: 'integer', minimum: 0 },
    manifestRef: { type: 'string', minLength: 1 }
  }
};

export const controlTotalResponseSchema = {
  type: 'object',
  required: ['id', 'concessionId', 'authorityCode', 'periodStart', 'periodEnd', 'transactionCount', 'totalAmountMinor', 'manifestRef', 'status', 'createdAt'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    concessionId: { type: 'string', format: 'uuid' },
    authorityCode: { type: 'string' },
    periodStart: { type: 'string', format: 'date-time' },
    periodEnd: { type: 'string', format: 'date-time' },
    transactionCount: { type: 'integer' },
    totalAmountMinor: { type: 'integer' },
    manifestRef: { type: 'string' },
    status: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' }
  }
};
