-- CreateTable
CREATE TABLE "property_bills" (
    "id" UUID NOT NULL,
    "bill_number" VARCHAR(50) NOT NULL,
    "property_id" UUID NOT NULL,
    "ratepayer_id" UUID NOT NULL,
    "concession_id" UUID NOT NULL,
    "supersedes_bill_id" UUID,
    "billing_period" VARCHAR(20) NOT NULL,
    "bill_type" VARCHAR(20) NOT NULL DEFAULT 'ASSESSED',
    "currency" CHAR(3) NOT NULL DEFAULT 'GHS',
    "amount_due" DECIMAL(14,2) NOT NULL,
    "amount_paid" DECIMAL(14,2) NOT NULL DEFAULT 0.00,
    "payment_status" VARCHAR(20) NOT NULL DEFAULT 'UNPAID',
    "issued_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due_date" DATE NOT NULL,
    "external_bill_ref" VARCHAR(100) NOT NULL,

    CONSTRAINT "property_bills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_links" (
    "id" UUID NOT NULL,
    "bill_id" UUID NOT NULL,
    "amount_fixed" DECIMAL(14,2) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    "expires_at" TIMESTAMPTZ NOT NULL,
    "gateway_link_ref" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bill_payments" (
    "id" UUID NOT NULL,
    "bill_id" UUID NOT NULL,
    "payment_link_id" UUID,
    "paid_by_ratepayer_id" UUID,
    "client_event_id" UUID NOT NULL,
    "external_payment_ref" VARCHAR(100) NOT NULL,
    "payment_type" VARCHAR(20) NOT NULL DEFAULT 'PAYMENT',
    "amount" DECIMAL(14,2) NOT NULL,
    "balance_at_payment" DECIMAL(14,2) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'CONFIRMED',
    "paid_at" TIMESTAMPTZ NOT NULL,
    "received_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bill_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outbox_events" (
    "id" UUID NOT NULL,
    "eventType" TEXT NOT NULL,
    "eventVersion" INTEGER NOT NULL DEFAULT 1,
    "aggregateType" TEXT NOT NULL,
    "aggregateId" TEXT NOT NULL,
    "aggregateVersion" INTEGER NOT NULL,
    "routingKey" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "headers" JSONB NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedAt" TIMESTAMP(3),
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "nextAttemptAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lockedAt" TIMESTAMP(3),
    "lastError" TEXT,

    CONSTRAINT "outbox_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inbox_messages" (
    "id" UUID NOT NULL,
    "consumerId" TEXT NOT NULL,
    "messageId" UUID NOT NULL,
    "eventType" TEXT NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),
    "result" JSONB,

    CONSTRAINT "inbox_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "idempotency_records" (
    "id" UUID NOT NULL,
    "concessionId" UUID NOT NULL,
    "idempotencyKey" TEXT NOT NULL,
    "requestHash" TEXT NOT NULL,
    "responseStatus" INTEGER,
    "responseBody" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "idempotency_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_records" (
    "id" UUID NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" TEXT NOT NULL,
    "actorType" TEXT NOT NULL,
    "concessionId" UUID,
    "assemblyId" UUID,
    "action" TEXT NOT NULL,
    "resourceType" TEXT NOT NULL,
    "resourceId" TEXT,
    "requestId" TEXT NOT NULL,
    "sourceIp" TEXT,
    "outcome" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "audit_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "property_bills_bill_number_key" ON "property_bills"("bill_number");

-- CreateIndex
CREATE INDEX "property_bills_property_id_billing_period_idx" ON "property_bills"("property_id", "billing_period");

-- CreateIndex
CREATE INDEX "property_bills_ratepayer_id_idx" ON "property_bills"("ratepayer_id");

-- CreateIndex
CREATE INDEX "property_bills_payment_status_idx" ON "property_bills"("payment_status");

-- CreateIndex
CREATE UNIQUE INDEX "property_bills_concession_id_external_bill_ref_key" ON "property_bills"("concession_id", "external_bill_ref");

-- CreateIndex
CREATE UNIQUE INDEX "payment_links_gateway_link_ref_key" ON "payment_links"("gateway_link_ref");

-- CreateIndex
CREATE INDEX "payment_links_bill_id_idx" ON "payment_links"("bill_id");

-- CreateIndex
CREATE INDEX "payment_links_status_expires_at_idx" ON "payment_links"("status", "expires_at");

-- CreateIndex
CREATE UNIQUE INDEX "bill_payments_client_event_id_key" ON "bill_payments"("client_event_id");

-- CreateIndex
CREATE INDEX "bill_payments_bill_id_idx" ON "bill_payments"("bill_id");

-- CreateIndex
CREATE INDEX "bill_payments_paid_at_idx" ON "bill_payments"("paid_at");

-- CreateIndex
CREATE INDEX "outbox_events_publishedAt_nextAttemptAt_occurredAt_idx" ON "outbox_events"("publishedAt", "nextAttemptAt", "occurredAt");

-- CreateIndex
CREATE UNIQUE INDEX "inbox_messages_consumerId_messageId_key" ON "inbox_messages"("consumerId", "messageId");

-- CreateIndex
CREATE INDEX "idempotency_records_expiresAt_idx" ON "idempotency_records"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "idempotency_records_concessionId_idempotencyKey_key" ON "idempotency_records"("concessionId", "idempotencyKey");

-- CreateIndex
CREATE INDEX "audit_records_concessionId_assemblyId_occurredAt_idx" ON "audit_records"("concessionId", "assemblyId", "occurredAt");

-- CreateIndex
CREATE INDEX "audit_records_resourceType_resourceId_idx" ON "audit_records"("resourceType", "resourceId");

-- AddForeignKey
ALTER TABLE "property_bills" ADD CONSTRAINT "property_bills_supersedes_bill_id_fkey" FOREIGN KEY ("supersedes_bill_id") REFERENCES "property_bills"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_links" ADD CONSTRAINT "payment_links_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "property_bills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_payments" ADD CONSTRAINT "bill_payments_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "property_bills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_payments" ADD CONSTRAINT "bill_payments_payment_link_id_fkey" FOREIGN KEY ("payment_link_id") REFERENCES "payment_links"("id") ON DELETE SET NULL ON UPDATE CASCADE;
