/**
 * Normalizes a Ghanaian mobile telephone number into standard E.164 numerical format without leading plus (`+`).
 *
 * Supported formats:
 * - National leading zero: `'0241002000'` -> `'233241002000'`
 * - International leading plus: `'+233241002000'` -> `'233241002000'`
 * - Raw numerical format: `'233241002000'` -> `'233241002000'`
 * - Strip punctuation: `'024-100-2000'` -> `'233241002000'`
 *
 * @param phone - Raw telephone input string
 * @returns 12-digit standard Ghanaian E.164 MSISDN string or stripped digits.
 * @example
 * ```ts
 * normalizeGhanaPhoneNumber("0241002000");  // "233241002000"
 * normalizeGhanaPhoneNumber("+233501234567"); // "233501234567"
 * ```
 */
export function normalizeGhanaPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("0") && digits.length === 10) {
    return `233${digits.substring(1)}`;
  }

  if (digits.startsWith("233") && digits.length === 12) {
    return digits;
  }

  return digits;
}
