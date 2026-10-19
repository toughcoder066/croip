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

export const referenceDataResponseSchema = {
  type: 'array',
  items: {
    type: 'object',
    required: ['id', 'category', 'code', 'name', 'version'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      category: { type: 'string' },
      code: { type: 'string' },
      name: { type: 'string' },
      version: { type: 'integer' },
      metadata: {}
    }
  }
};

export const messageRequestInputSchema = {
  type: 'object',
  required: ['recipientRef', 'channel', 'templateVersion', 'idempotencyKey'],
  properties: {
    recipientRef: { type: 'string', minLength: 3 },
    channel: { type: 'string', enum: ['SMS', 'EMAIL', 'PUSH'] },
    templateVersion: { type: 'string' },
    idempotencyKey: { type: 'string', minLength: 1 }
  }
};

export const messageResponseSchema = {
  type: 'object',
  required: ['id', 'recipientRef', 'channel', 'status', 'createdAt'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    recipientRef: { type: 'string' },
    channel: { type: 'string' },
    status: { type: 'string' },
    deliveryProvider: { type: ['string', 'null'] },
    createdAt: { type: 'string', format: 'date-time' }
  }
};

export const receiptVerificationResponseSchema = {
  type: 'object',
  required: ['receiptNumber', 'billNumber', 'amountPaidMinor', 'currency', 'paidAt', 'status', 'verified'],
  properties: {
    receiptNumber: { type: 'string' },
    billNumber: { type: 'string' },
    amountPaidMinor: { type: 'integer' },
    currency: { type: 'string' },
    paidAt: { type: 'string', format: 'date-time' },
    status: { type: 'string' },
    verified: { type: 'boolean' }
  }
};
