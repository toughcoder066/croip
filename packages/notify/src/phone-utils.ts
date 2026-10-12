/**
 * Normalizes a phone number to standard Ghana E.164 format without leading '+'
 * e.g. '0241002000' -> '233241002000'
 *      '+233241002000' -> '233241002000'
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
