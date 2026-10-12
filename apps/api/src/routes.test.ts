import test from "node:test";
import assert from "node:assert/strict";
import { buildApp } from "./app.js";

test("GET /health returns healthy status and service version", async () => {
  const app = await buildApp({ logger: false });
  await app.ready();

  const res = await app.inject({
    method: "GET",
    url: "/health",
  });

  assert.equal(res.statusCode, 200);
  const data = res.json();
  assert.equal(data.status, "healthy");
  assert.equal(data.service, "@croip/api");
  await app.close();
});

test("POST /v1/ratepayers/register validates matching password and confirmPassword", async () => {
  const app = await buildApp({ logger: false });
  await app.ready();

  // 1. Password mismatch fails with HTTP 400
  const resMismatch = await app.inject({
    method: "POST",
    url: "/v1/ratepayers/register",
    headers: { "content-type": "application/json" },
    payload: {
      phoneNumber: "+233241009999",
      password: "StrongPassword123!",
      confirmPassword: "DifferentPassword456!",
      firstName: "Kofi",
      lastName: "Mensah",
    },
  });
  assert.equal(resMismatch.statusCode, 400);

  // 2. Matching passwords passes validation
  const testPhone = `+23324${Math.floor(1000000 + Math.random() * 9000000)}`;
  const resValid = await app.inject({
    method: "POST",
    url: "/v1/ratepayers/register",
    headers: { "content-type": "application/json" },
    payload: {
      phoneNumber: testPhone,
      password: "StrongPassword123!",
      confirmPassword: "StrongPassword123!",
      firstName: "Kofi",
      lastName: "Mensah",
    },
  });
  assert.equal(resValid.statusCode, 201);
  const body = resValid.json();
  assert.equal(body.phoneNumber, testPhone);
  assert.equal(body.status, "ACTIVE");
  assert.ok(body.completion);

  await app.close();
});
