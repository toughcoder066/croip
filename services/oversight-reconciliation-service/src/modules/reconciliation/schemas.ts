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

export const runReconciliationInputSchema = {
  type: 'object',
  required: ['periodStart', 'periodEnd'],
  properties: {
    periodStart: { type: 'string', format: 'date-time' },
    periodEnd: { type: 'string', format: 'date-time' }
  }
};

export const runReconciliationResponseSchema = {
  type: 'object',
  required: ['id', 'concessionId', 'periodStart', 'periodEnd', 'status', 'matchedCount', 'unmatchedCount', 'createdAt'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    concessionId: { type: 'string', format: 'uuid' },
    periodStart: { type: 'string', format: 'date-time' },
    periodEnd: { type: 'string', format: 'date-time' },
    status: { type: 'string' },
    totalReportedMinor: { type: 'integer' },
    totalEvidenceMinor: { type: 'integer' },
    totalSettledMinor: { type: 'integer' },
    matchedCount: { type: 'integer' },
    unmatchedCount: { type: 'integer' },
    createdAt: { type: 'string', format: 'date-time' }
  }
};

export const exceptionItemSchema = {
  type: 'object',
  required: ['id', 'runId', 'concessionId', 'severity', 'status', 'varianceMinor', 'reasonCode', 'createdAt'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    runId: { type: 'string', format: 'uuid' },
    concessionId: { type: 'string', format: 'uuid' },
    severity: { type: 'string' },
    status: { type: 'string' },
    reportedRef: { type: ['string', 'null'] },
    evidenceRef: { type: ['string', 'null'] },
    varianceMinor: { type: 'integer' },
    reasonCode: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' }
  }
};

export const actionExceptionBodySchema = {
  type: 'object',
  required: ['action', 'notes'],
  properties: {
    action: { type: 'string', enum: ['APPROVE', 'OVERRIDE', 'DISPUTE'] },
    notes: { type: 'string', minLength: 3, maxLength: 500 }
  }
};
