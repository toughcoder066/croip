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

export const cloudEventSchema = {
  type: 'object',
  required: ['specversion', 'id', 'source', 'type', 'time', 'data'],
  properties: {
    specversion: { type: 'string', enum: ['1.0'] },
    id: { type: 'string', minLength: 1 },
    source: { type: 'string', minLength: 1 },
    type: { type: 'string', minLength: 1 },
    time: { type: 'string' },
    subject: { type: 'string' },
    dataschema: { type: 'string' },
    datacontenttype: { type: 'string' },
    data: { type: 'object' }
  }
};

export const ingestionReceiptSchema = {
  type: 'object',
  required: ['ingestionId', 'status', 'eventId', 'receivedAt', 'statusUrl'],
  properties: {
    ingestionId: { type: 'string', format: 'uuid' },
    status: { type: 'string' },
    eventId: { type: 'string' },
    receivedAt: { type: 'string', format: 'date-time' },
    statusUrl: { type: 'string' }
  }
};

export const batchIngestionResponseSchema = {
  type: 'object',
  required: ['batchCount', 'acceptedCount', 'results'],
  properties: {
    batchCount: { type: 'integer' },
    acceptedCount: { type: 'integer' },
    results: {
      type: 'array',
      items: ingestionReceiptSchema
    }
  }
};
