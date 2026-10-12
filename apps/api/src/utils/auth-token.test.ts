import test from "node:test";
import assert from "node:assert/strict";
import {
  hashPassword,
  verifyPassword,
  hashOtp,
  generateOtp,
  signToken,
  verifyToken,
} from "./auth-token.js";

test("Password hashing and timing-safe verification", () => {
  const password = "SecuredPassword!2026";
  const hash = hashPassword(password);

  assert.notEqual(hash, password);
  assert.ok(hash.includes(":"));
  assert.equal(verifyPassword(password, hash), true);
  assert.equal(verifyPassword("WrongPassword!2026", hash), false);
});

test("OTP code generation and SHA256 hashing", () => {
  const otp = generateOtp();
  assert.equal(otp.length, 6);
  assert.ok(/^\d{6}$/.test(otp));

  const hashed = hashOtp(otp);
  assert.equal(hashed.length, 64);
  assert.equal(hashOtp(otp), hashed);
});

test("HMAC-SHA256 JWT Token signing and verification", () => {
  const payload = {
    sub: "11111111-2222-3333-4444-555555555555",
    userCode: "ADM-2026-X99",
    userType: "CROIP_GOV_ADMIN",
  };

  const token = signToken(payload, 3600);
  assert.ok(typeof token === "string");
  assert.equal(token.split(".").length, 3);

  const decoded = verifyToken<{ sub: string; userCode: string; userType: string }>(token);
  assert.ok(decoded);
  assert.equal(decoded.sub, payload.sub);
  assert.equal(decoded.userCode, payload.userCode);
  assert.equal(decoded.userType, payload.userType);

  // Tampered token fails
  const tampered = token.slice(0, -5) + "abcde";
  assert.equal(verifyToken(tampered), null);
});
