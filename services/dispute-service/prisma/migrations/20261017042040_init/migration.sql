-- CreateTable
CREATE TABLE "disputes" (
    "id" UUID NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "dispute_type" VARCHAR(20) NOT NULL,
    "property_id" UUID,
    "bill_id" UUID,
    "raised_by_ratepayer_id" UUID NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'OPEN',
    "assigned_to_personnel_id" UUID,
    "sla_due_at" TIMESTAMPTZ,
    "resolution" TEXT,
    "resolved_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "disputes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dispute_evidence" (
    "id" UUID NOT NULL,
    "dispute_id" UUID NOT NULL,
    "media_url" VARCHAR(500) NOT NULL,
    "uploaded_by_actor_type" VARCHAR(30) NOT NULL,
    "uploaded_by_actor_id" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dispute_evidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dispute_comments" (
    "id" UUID NOT NULL,
    "dispute_id" UUID NOT NULL,
    "actor_type" VARCHAR(30) NOT NULL,
    "actor_id" VARCHAR(100) NOT NULL,
    "body" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dispute_comments_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "disputes_code_key" ON "disputes"("code");

-- CreateIndex
CREATE INDEX "disputes_property_id_idx" ON "disputes"("property_id");

-- CreateIndex
CREATE INDEX "disputes_bill_id_idx" ON "disputes"("bill_id");

-- CreateIndex
CREATE INDEX "disputes_raised_by_ratepayer_id_idx" ON "disputes"("raised_by_ratepayer_id");

-- CreateIndex
CREATE INDEX "disputes_status_sla_due_at_idx" ON "disputes"("status", "sla_due_at");

-- CreateIndex
CREATE INDEX "dispute_evidence_dispute_id_idx" ON "dispute_evidence"("dispute_id");

-- CreateIndex
CREATE INDEX "dispute_comments_dispute_id_idx" ON "dispute_comments"("dispute_id");

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
ALTER TABLE "dispute_evidence" ADD CONSTRAINT "dispute_evidence_dispute_id_fkey" FOREIGN KEY ("dispute_id") REFERENCES "disputes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispute_comments" ADD CONSTRAINT "dispute_comments_dispute_id_fkey" FOREIGN KEY ("dispute_id") REFERENCES "disputes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
