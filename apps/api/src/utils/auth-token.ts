import crypto from "node:crypto";

const JWT_SECRET = process.env.JWT_SECRET || "croip-default-jwt-secret-key-change-in-production-2026";

function base64urlEncode(str: string): string {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64urlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return Buffer.from(base64, "base64").toString("utf8");
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(":");
    if (!salt || !key) return false;
    const derivedKey = crypto.scryptSync(password, salt, 64);
    const keyBuffer = Buffer.from(key, "hex");
    return crypto.timingSafeEqual(derivedKey, keyBuffer);
  } catch {
    return false;
  }
}

export function hashOtp(code: string): string {
  return crypto.createHash("sha256").update(code).digest("hex");
}

export function generateOtp(): string {
  // 6-digit numeric OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function signToken<T extends Record<string, unknown>>(
  payload: T,
  expiresInSeconds: number = 86400
): string {
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = base64urlEncode(JSON.stringify(header));
  
  const now = Math.floor(Date.now() / 1000);
  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  };
  const encodedPayload = base64urlEncode(JSON.stringify(fullPayload));

  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function verifyToken<T = any>(token: string): T | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, signature] = parts;
    if (!encodedHeader || !encodedPayload || !signature) return null;

    const expectedSignature = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature, "utf8"),
        Buffer.from(expectedSignature, "utf8")
      )
    ) {
      return null;
    }

    const payload = JSON.parse(base64urlDecode(encodedPayload));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp && typeof payload.exp === "number" && payload.exp < now) {
      return null;
    }

    return payload as T;
  } catch {
    return null;
  }
}
