CREATE SCHEMA IF NOT EXISTS "public";

CREATE TABLE "example_resources" (
    "id" UUID NOT NULL,
    "concessionId" UUID NOT NULL,
    "assemblyId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT NOT NULL,
    CONSTRAINT "example_resources_pkey" PRIMARY KEY ("id")
);

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

CREATE INDEX "example_resources_concessionId_assemblyId_idx" ON "example_resources"("concessionId", "assemblyId");
CREATE INDEX "outbox_events_publishedAt_nextAttemptAt_occurredAt_idx" ON "outbox_events"("publishedAt", "nextAttemptAt", "occurredAt");
CREATE UNIQUE INDEX "inbox_messages_consumerId_messageId_key" ON "inbox_messages"("consumerId", "messageId");
CREATE INDEX "idempotency_records_expiresAt_idx" ON "idempotency_records"("expiresAt");
CREATE UNIQUE INDEX "idempotency_records_concessionId_idempotencyKey_key" ON "idempotency_records"("concessionId", "idempotencyKey");
CREATE INDEX "audit_records_concessionId_assemblyId_occurredAt_idx" ON "audit_records"("concessionId", "assemblyId", "occurredAt");
CREATE INDEX "audit_records_resourceType_resourceId_idx" ON "audit_records"("resourceType", "resourceId");
