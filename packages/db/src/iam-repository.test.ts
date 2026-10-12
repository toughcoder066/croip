import test from "node:test";
import assert from "node:assert/strict";
import { calculateRatepayerCompletion } from "./iam-repository.js";

test("calculateRatepayerCompletion - empty profile yields 0%", () => {
  const result = calculateRatepayerCompletion(null);
  assert.equal(result.percentage, 0);
  assert.equal(result.isComplete, false);
  assert.equal(result.checklist.phoneVerified, false);
  assert.equal(result.checklist.nameProvided, false);
  assert.equal(result.checklist.emailProvided, false);
  assert.equal(result.checklist.ghanaCardProvided, false);
  assert.equal(result.checklist.digitalAddressProvided, false);
  assert.equal(result.missingFields.length, 5);
  assert.equal(result.nextSteps.length, 5);
});

test("calculateRatepayerCompletion - phone-only verified yields 20%", () => {
  const profile = {
    primary_phone: "+233241002000",
    kyc_status: "PHONE_VERIFIED",
  };
  const result = calculateRatepayerCompletion(profile);
  assert.equal(result.percentage, 20);
  assert.equal(result.isComplete, false);
  assert.equal(result.checklist.phoneVerified, true);
  assert.equal(result.checklist.nameProvided, false);
  assert.ok(result.missingFields.includes("name"));
});

test("calculateRatepayerCompletion - fully verified citizen yields 100%", () => {
  const profile = {
    primary_phone: "+233241002000",
    first_name: "Kwame",
    last_name: "Mensah",
    primary_email: "kwame.mensah@example.com",
    ghana_card_number: "GHA-712891028-1",
    digital_address_ghpost: "AK-039-5028",
    kyc_status: "GHANA_CARD_VERIFIED",
  };
  const result = calculateRatepayerCompletion(profile);
  assert.equal(result.percentage, 100);
  assert.equal(result.isComplete, true);
  assert.equal(result.checklist.phoneVerified, true);
  assert.equal(result.checklist.nameProvided, true);
  assert.equal(result.checklist.emailProvided, true);
  assert.equal(result.checklist.ghanaCardProvided, true);
  assert.equal(result.checklist.digitalAddressProvided, true);
  assert.equal(result.missingFields.length, 0);
  assert.equal(result.nextSteps.length, 0);
});
