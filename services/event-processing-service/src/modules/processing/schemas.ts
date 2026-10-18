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

export const quarantineItemSchema = {
  type: 'object',
  required: ['id', 'eventId', 'eventType', 'reason', 'status', 'createdAt'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    concessionId: { type: 'string', format: 'uuid' },
    assemblyId: { type: 'string', format: 'uuid' },
    eventId: { type: 'string' },
    eventType: { type: 'string' },
    reason: { type: 'string' },
    status: { type: 'string' },
    payload: { type: 'object' },
    resolvedBy: { type: ['string', 'null'] },
    resolutionNotes: { type: ['string', 'null'] },
    createdAt: { type: 'string', format: 'date-time' },
    resolvedAt: { type: ['string', 'null'], format: 'date-time' }
  }
};

export const resolveQuarantineBodySchema = {
  type: 'object',
  required: ['resolutionNotes'],
  properties: {
    resolutionNotes: { type: 'string', minLength: 3, maxLength: 500 }
  }
};

export const operationalViewSchema = {
  type: 'object',
  required: ['id', 'aggregateType', 'aggregateId', 'currentVersion', 'state', 'updatedAt'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    aggregateType: { type: 'string' },
    aggregateId: { type: 'string' },
    concessionId: { type: 'string', format: 'uuid' },
    assemblyId: { type: 'string', format: 'uuid' },
    currentVersion: { type: 'integer' },
    lastEventId: { type: 'string' },
    state: { type: 'object' },
    updatedAt: { type: 'string', format: 'date-time' }
  }
};
