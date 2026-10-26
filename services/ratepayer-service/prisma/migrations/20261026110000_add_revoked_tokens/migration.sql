-- Logged-out ratepayer session tokens, by jti. A row only needs to exist until the token
-- would have expired naturally anyway, making it safe to prune past expires_at.
CREATE TABLE "ratepayer_revoked_tokens" (
    "jti" UUID NOT NULL,
    "ratepayer_id" UUID NOT NULL,
    "revoked_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "ratepayer_revoked_tokens_pkey" PRIMARY KEY ("jti")
);

CREATE INDEX "ratepayer_revoked_tokens_expires_at_idx" ON "ratepayer_revoked_tokens"("expires_at");
