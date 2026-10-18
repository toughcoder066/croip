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

export const paymentResponseSchema = {
  type: 'object',
  required: ['id', 'billId', 'amount', 'balanceAtPayment', 'status', 'paidAt'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    billId: { type: 'string', format: 'uuid' },
    paymentLinkId: { type: ['string', 'null'], format: 'uuid' },
    paidByRatepayerId: { type: ['string', 'null'], format: 'uuid' },
    clientEventId: { type: 'string', format: 'uuid' },
    externalPaymentRef: { type: 'string' },
    paymentType: { type: 'string' },
    amount: {},
    balanceAtPayment: {},
    status: { type: 'string' },
    paidAt: { type: 'string', format: 'date-time' },
    receivedAt: { type: 'string', format: 'date-time' }
  }
};

export const billResponseSchema = {
  type: 'object',
  required: ['id', 'billNumber', 'propertyId', 'ratepayerId', 'billingPeriod', 'amountDue', 'amountPaid', 'paymentStatus', 'dueDate'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    billNumber: { type: 'string' },
    propertyId: { type: 'string', format: 'uuid' },
    ratepayerId: { type: 'string', format: 'uuid' },
    concessionId: { type: 'string', format: 'uuid' },
    issuedByPersonnelId: { type: ['string', 'null'] },
    supersedesBillId: { type: ['string', 'null'], format: 'uuid' },
    billingPeriod: { type: 'string' },
    billType: { type: 'string' },
    currency: { type: 'string' },
    amountDue: {},
    amountPaid: {},
    paymentStatus: { type: 'string' },
    issuedAt: { type: 'string', format: 'date-time' },
    dueDate: { type: 'string' },
    externalBillRef: { type: 'string' },
    payments: { type: 'array', items: paymentResponseSchema }
  }
};

export const paymentDirectoryItemSchema = {
  type: 'object',
  required: ['id', 'billId', 'amount', 'balanceAtPayment', 'status', 'paidAt'],
  properties: {
    ...paymentResponseSchema.properties,
    bill: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        billNumber: { type: 'string' },
        ratepayerId: { type: 'string', format: 'uuid' },
        propertyId: { type: 'string', format: 'uuid' },
        currency: { type: 'string' }
      }
    }
  }
};

export const paymentDirectoryResponseSchema = {
  type: 'object',
  required: ['items', 'total', 'page', 'pageSize', 'totalPages'],
  properties: {
    items: { type: 'array', items: paymentDirectoryItemSchema },
    total: { type: 'integer' },
    page: { type: 'integer' },
    pageSize: { type: 'integer' },
    totalPages: { type: 'integer' }
  }
};

export const billDirectoryResponseSchema = {
  type: 'object',
  required: ['items', 'total', 'page', 'pageSize', 'totalPages'],
  properties: {
    items: { type: 'array', items: billResponseSchema },
    total: { type: 'integer' },
    page: { type: 'integer' },
    pageSize: { type: 'integer' },
    totalPages: { type: 'integer' }
  }
};

export const issueBillBodySchema = {
  type: 'object',
  required: ['propertyId', 'ratepayerId', 'billingPeriod', 'amountDue', 'dueDate', 'externalBillRef'],
  properties: {
    propertyId: { type: 'string', format: 'uuid' },
    ratepayerId: { type: 'string', format: 'uuid' },
    billingPeriod: { type: 'string', minLength: 1, maxLength: 20 },
    amountDue: { type: 'number', exclusiveMinimum: 0 },
    dueDate: { type: 'string', format: 'date' },
    billType: { type: 'string', enum: ['ASSESSED', 'SUPPLEMENTARY', 'ADJUSTMENT'], default: 'ASSESSED' },
    externalBillRef: { type: 'string', minLength: 1, maxLength: 100 }
  }
};

export const recordPaymentBodySchema = {
  type: 'object',
  required: ['amount', 'externalPaymentRef', 'clientEventId', 'paidAt'],
  properties: {
    amount: { type: 'number', exclusiveMinimum: 0 },
    paidByRatepayerId: { type: 'string', format: 'uuid' },
    externalPaymentRef: { type: 'string', minLength: 1, maxLength: 100 },
    clientEventId: { type: 'string', format: 'uuid' },
    paidAt: { type: 'string', format: 'date-time' }
  }
};

export const paymentLinkBodySchema = {
  type: 'object',
  required: ['billId', 'amountFixed', 'expiresAt', 'gatewayLinkRef'],
  properties: {
    billId: { type: 'string', format: 'uuid' },
    amountFixed: { type: 'number', exclusiveMinimum: 0 },
    expiresAt: { type: 'string', format: 'date-time' },
    gatewayLinkRef: { type: 'string', minLength: 1, maxLength: 100 }
  }
};

export const paymentLinkResponseSchema = {
  type: 'object',
  required: ['id', 'billId', 'amountFixed', 'status', 'expiresAt', 'gatewayLinkRef'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    billId: { type: 'string', format: 'uuid' },
    amountFixed: {},
    status: { type: 'string' },
    expiresAt: { type: 'string', format: 'date-time' },
    gatewayLinkRef: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' }
  }
};
