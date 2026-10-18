import crypto from 'node:crypto'

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

/**
 * Generates a standard RFC 6238 / RFC 4226 TOTP secret.
 * SHA-1 TOTP recommends a 160-bit (20-byte) key.
 * 20 bytes (160 bits) encodes into exactly 32 Base32 characters with 0 padding/remainder.
 */
export function generateBase32Secret(byteLength = 20): string {
  const bytes = crypto.randomBytes(byteLength)
  let bits = ''
  for (let i = 0; i < bytes.length; i++) {
    bits += bytes[i].toString(2).padStart(8, '0')
  }

  let secret = ''
  for (let i = 0; i + 5 <= bits.length; i += 5) {
    const chunk = parseInt(bits.substring(i, i + 5), 2)
    secret += BASE32_ALPHABET[chunk]
  }

  return secret
}

function base32ToBuffer(base32: string, padZero = false): Buffer {
  const cleanBase32 = base32.toUpperCase().replace(/[\s-=]/g, '')
  let bits = ''
  for (let i = 0; i < cleanBase32.length; i++) {
    const val = BASE32_ALPHABET.indexOf(cleanBase32.charAt(i))
    if (val === -1) continue
    bits += val.toString(2).padStart(5, '0')
  }

  // RFC 4648: if base32 string has partial bits, pad with zeroes to complete the byte
  if (padZero && bits.length % 8 !== 0) {
    bits += '0'.repeat(8 - (bits.length % 8))
  }

  const bytes = []
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.substring(i, i + 8), 2))
  }
  return Buffer.from(bytes)
}

export function generateTotp(secret: string, windowOffset = 0, padZero = false): string {
  const counter = Math.floor(Date.now() / 1000 / 30) + windowOffset
  const buffer = Buffer.alloc(8)
  buffer.writeBigInt64BE(BigInt(counter))

  const key = base32ToBuffer(secret, padZero)
  const hmac = crypto.createHmac('sha1', key)
  hmac.update(buffer)
  const digest = hmac.digest()

  const offset = digest[digest.length - 1] & 0xf
  const binary =
    ((digest[offset] & 0x7f) << 24) |
    ((digest[offset + 1] & 0xff) << 16) |
    ((digest[offset + 2] & 0xff) << 8) |
    (digest[offset + 3] & 0xff)

  const otp = binary % 1000000
  return otp.toString().padStart(6, '0')
}

export function verifyTotp(token: string, secret: string): boolean {
  if (!token || !secret) return false
  const cleanToken = token.trim().replace(/\s+/g, '')
  if (cleanToken.length !== 6) return false

  // Check +/- 15 time steps (7.5 minutes) across both standard and RFC 4648 zero-padded decodings
  for (let offset = -15; offset <= 15; offset++) {
    if (generateTotp(secret, offset, false) === cleanToken) {
      return true
    }
    if (generateTotp(secret, offset, true) === cleanToken) {
      return true
    }
  }
  return false
}

export function generateBackupCodes(count = 6): string[] {
  const codes: string[] = []
  for (let i = 0; i < count; i++) {
    const p1 = crypto.randomBytes(2).toString('hex').toUpperCase()
    const p2 = crypto.randomBytes(2).toString('hex').toUpperCase()
    codes.push(`${p1}-${p2}`)
  }
  return codes
}
