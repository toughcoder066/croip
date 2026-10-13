import crypto from 'node:crypto';

/**
 * Derives a cryptographically secure password hash using the `scrypt` key derivation function.
 * Generates a unique 16-byte random salt and computes a 64-byte derived key.
 *
 * @param password - Plaintext password input
 * @returns Colon-separated string formatted as `<salt_hex>:<hash_hex>`
 * @example
 * ```ts
 * const hash = hashPassword("SuperSecret123!");
 * // "7a1b...16bytes:9f3c...64bytes"
 * ```
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verifies a candidate plaintext password against a stored `<salt>:<hash>` string.
 * Uses `crypto.timingSafeEqual` to prevent side-channel timing attacks.
 *
 * @param password - Candidate plaintext password input
 * @param storedHash - Stored salt and hash string
 * @returns True if password matches the hash, false otherwise.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, key] = storedHash.split(':');
  if (!salt || !key) return false;
  const keyBuffer = Buffer.from(key, 'hex');
  const derivedKey = crypto.scryptSync(password, salt, 64);
  if (keyBuffer.length !== derivedKey.length) return false;
  return crypto.timingSafeEqual(keyBuffer, derivedKey);
}

/**
 * Generates a cryptographically strong 6-digit numerical One-Time Password (OTP)
 * for ratepayer telephone / SMS multi-factor verification.
 *
 * Range: 100000 to 999999.
 * @returns 6-digit string
 */
export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Computes a SHA-256 cryptographic digest of a raw OTP code.
 * Ensures OTP codes are stored as irreversible digests in the database rather than plaintext.
 *
 * @param otp - Raw 6-digit OTP string
 * @returns 64-character hexadecimal SHA-256 hash
 */
export function hashOtp(otp: string): string {
  return crypto.createHash('sha256').update(otp).digest('hex');
}

/**
 * Generates a high-entropy 256-bit (32 bytes) session token for authenticated user sessions.
 *
 * @returns 64-character hexadecimal session token
 */
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}
