import { randomInt, createHash } from 'node:crypto';

export function generateOtpCode(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, '0');
}

// OTP codes are short-lived (minutes) and rate-limited by the `attempts` counter, so a
// fast hash is fine here — scrypt's deliberate slowness is for passwords that live
// indefinitely, not six-digit codes that expire shortly after issuance.
export function hashOtpCode(code: string): string {
  return createHash('sha256').update(code).digest('hex');
}
