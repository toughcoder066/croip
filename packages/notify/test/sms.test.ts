import test from "node:test";
import assert from "node:assert/strict";
import { normalizeGhanaPhoneNumber } from "../src/phone-utils.js";
import { MockSmsProvider } from "../src/mock-provider.js";
import { ArkeselSmsProvider } from "../src/arkesel-provider.js";
import { getSmsProvider } from "../src/index.js";

test("normalizeGhanaPhoneNumber formats Ghanaian mobile numbers to standard E.164 without plus", () => {
  assert.equal(normalizeGhanaPhoneNumber("0241002000"), "233241002000");
  assert.equal(normalizeGhanaPhoneNumber("+233241002000"), "233241002000");
  assert.equal(normalizeGhanaPhoneNumber("233241002000"), "233241002000");
  assert.equal(normalizeGhanaPhoneNumber("055 123 4567"), "233551234567");
});

test("MockSmsProvider records and confirms OTP message dispatch", async () => {
  const provider = new MockSmsProvider();
  
  const result = await provider.sendOtp({
    phoneNumber: "0241002000",
    code: "839201",
    expiresInMinutes: 10,
    appName: "CROIP",
  });

  assert.equal(result.success, true);
  assert.ok(result.messageId);
  assert.equal(provider.sentMessages.length, 1);

  const sent = provider.sentMessages[0]!;
  assert.deepEqual(sent.to, ["233241002000"]);
  assert.equal(sent.sender, "CROIP");
  assert.ok(sent.message.includes("839201"));
  assert.ok(sent.message.includes("10 minutes"));
});

test("ArkeselSmsProvider formats and sends payload correctly to gateway URL", async () => {
  let capturedUrl = "";
  let capturedHeaders: Record<string, string> = {};
  let capturedBody: any = null;

  // Intercept fetch for isolated mock testing
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    capturedUrl = url.toString();
    capturedHeaders = (init?.headers as Record<string, string>) || {};
    capturedBody = JSON.parse(init?.body as string);

    return new Response(
      JSON.stringify({
        status: "success",
        data: { message_id: "arkesel-tx-999" },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;

  try {
    const provider = new ArkeselSmsProvider({
      apiKey: "test-arkesel-key-12345",
      senderId: "CROIP-GOV",
    });

    const result = await provider.sendOtp({
      phoneNumber: "0201234567",
      code: "112233",
    });

    assert.equal(result.success, true);
    assert.equal(result.messageId, "arkesel-tx-999");
    assert.equal(capturedUrl, "https://sms.arkesel.com/api/v2/sms/send");
    assert.equal(capturedHeaders["api-key"], "test-arkesel-key-12345");
    assert.deepEqual(capturedBody.recipients, ["233201234567"]);
    assert.equal(capturedBody.sender, "CROIP-GOV");
    assert.ok(capturedBody.message.includes("112233"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("getSmsProvider defaults to MockSmsProvider when ARKESEL_API_KEY is not set", () => {
  const provider = getSmsProvider({ forceMock: true });
  assert.equal(provider.name, "MockSms");
});
