import crypto from 'node:crypto';
import { SignJWT, jwtVerify } from 'jose';

export interface RatepayerTokenClaims {
  sub: string;
  code: string;
  phone: string;
  assemblyId: string;
  regionId: string;
  actorType: 'RATEPAYER';
  // Unique per issued token — lets a specific session be revoked (logout) without
  // invalidating every other device/session the ratepayer is signed into, and without
  // needing any server-side session store for the common case (verification is still a
  // pure signature/expiry check; only logout needs to consult the revocation table).
  jti: string;
  // Seconds-since-epoch expiry, carried through so a revocation record can be pruned once
  // the token would have expired naturally anyway — never kept longer than the token itself
  // could have been valid for.
  exp: number;
}

const ISSUER = 'croip-ratepayer-service';
const AUDIENCE = 'croip-platform';
const EXPIRES_IN = '7d';

// Ratepayers are a separate identity population from staff (who authenticate via
// Zitadel/OIDC) — this is a small self-signed HS256 token, not a second OIDC provider,
// since citizen-facing auth doesn't need enterprise IdP machinery.
export async function issueRatepayerToken(
  claims: Omit<RatepayerTokenClaims, 'jti' | 'exp'>,
  secret: string
): Promise<string> {
  const key = new TextEncoder().encode(secret);
  return new SignJWT({ code: claims.code, phone: claims.phone, assemblyId: claims.assemblyId, regionId: claims.regionId, actorType: claims.actorType })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(claims.sub)
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setJti(crypto.randomUUID())
    .setIssuedAt()
    .setExpirationTime(EXPIRES_IN)
    .sign(key);
}

// Pure signature/expiry check only — does NOT consult the revocation table, since that
// needs database access this lib module deliberately doesn't have. authenticateRatepayer
// (plugins/auth.ts) is what rejects a revoked (logged-out) token's jti after this succeeds.
export async function verifyRatepayerToken(token: string, secret: string): Promise<RatepayerTokenClaims> {
  const key = new TextEncoder().encode(secret);
  const { payload } = await jwtVerify(token, key, { issuer: ISSUER, audience: AUDIENCE, algorithms: ['HS256'] });
  if (!payload.jti || !payload.exp) {
    throw new Error('Token is missing required jti/exp claims');
  }
  return {
    sub: String(payload.sub),
    code: String(payload.code),
    phone: String(payload.phone),
    assemblyId: String(payload.assemblyId),
    regionId: String(payload.regionId),
    actorType: 'RATEPAYER',
    jti: payload.jti,
    exp: payload.exp
  };
}
