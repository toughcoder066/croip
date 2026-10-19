import { SignJWT, jwtVerify } from 'jose';

export interface RatepayerTokenClaims {
  sub: string;
  code: string;
  phone: string;
  assemblyId: string;
  regionId: string;
  actorType: 'RATEPAYER';
}

const ISSUER = 'croip-ratepayer-service';
const AUDIENCE = 'croip-platform';
const EXPIRES_IN = '7d';

// Ratepayers are a separate identity population from staff (who authenticate via
// Zitadel/OIDC) — this is a small self-signed HS256 token, not a second OIDC provider,
// since citizen-facing auth doesn't need enterprise IdP machinery. Verified by this
// service and by property-registry-service's self-service property creation route,
// both holding the same RATEPAYER_JWT_SECRET.
export async function issueRatepayerToken(claims: RatepayerTokenClaims, secret: string): Promise<string> {
  const key = new TextEncoder().encode(secret);
  return new SignJWT({ code: claims.code, phone: claims.phone, assemblyId: claims.assemblyId, regionId: claims.regionId, actorType: claims.actorType })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(claims.sub)
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(EXPIRES_IN)
    .sign(key);
}

export async function verifyRatepayerToken(token: string, secret: string): Promise<RatepayerTokenClaims> {
  const key = new TextEncoder().encode(secret);
  const { payload } = await jwtVerify(token, key, { issuer: ISSUER, audience: AUDIENCE, algorithms: ['HS256'] });
  return {
    sub: String(payload.sub),
    code: String(payload.code),
    phone: String(payload.phone),
    assemblyId: String(payload.assemblyId),
    regionId: String(payload.regionId),
    actorType: 'RATEPAYER'
  };
}
