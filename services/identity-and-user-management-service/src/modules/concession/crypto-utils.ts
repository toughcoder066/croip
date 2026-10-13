import crypto from 'node:crypto';

/**
 * Generates a high-entropy, prefixed Machine-to-Machine Client ID.
 * Example: `crp_live_a1b2c3d4e5f6...`
 */
export function generateClientId(): string {
  const randomBytes = crypto.randomBytes(16).toString('hex');
  return `crp_live_${randomBytes}`;
}

/**
 * Generates a cryptographically secure 32-byte client secret string.
 * Example: `crp_sec_...`
 */
export function generateClientSecret(): string {
  const randomBytes = crypto.randomBytes(32).toString('hex');
  return `crp_sec_${randomBytes}`;
}

/**
 * Computes a SHA-256 digest hash of a client secret.
 * Used for fast, constant-time database matching of API client credentials.
 *
 * @param secret - Raw plaintext client secret.
 * @returns 64-character hexadecimal SHA-256 digest string.
 */
export function hashClientSecret(secret: string): string {
  return crypto.createHash('sha256').update(secret).digest('hex');
}

/**
 * Timing-safe comparison of a raw secret against a stored SHA-256 hash.
 * Mitigates side-channel timing attacks during API client authorization.
 *
 * @param secret - Raw plaintext client secret presented by caller.
 * @param storedHash - Stored SHA-256 hash in database.
 * @returns `true` if secret matches the stored hash, otherwise `false`.
 */
export function verifyClientSecret(secret: string, storedHash: string): boolean {
  const calculatedHash = hashClientSecret(secret);
  if (calculatedHash.length !== storedHash.length) {
    return false;
  }
  return crypto.timingSafeEqual(Buffer.from(calculatedHash), Buffer.from(storedHash));
}
