import type { FastifyPluginAsync } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { getDb, IamRepository } from "@croip/db";
import {
  RatepayerLoginInputSchema,
  RatepayerLoginStep1ResponseSchema,
  VerifyOtpSchema,
  RequestOtpSchema,
  StaffLoginSchema,
  AuthTokenResponseSchema,
  ProfileCompletionSchema,
  UserTypeSchema,
} from "@croip/contracts";
import {
  verifyPassword,
  hashOtp,
  generateOtp,
  signToken,
  verifyToken,
} from "../utils/auth-token.js";

const ErrorResponseSchema = z.object({
  error: z.string(),
});

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  const app = fastify.withTypeProvider<ZodTypeProvider>();
  const repo = new IamRepository(getDb());

  // 1. Ratepayer Login Step 1: Phone + Password Verification
  app.post(
    "/v1/auth/ratepayer/login",
    {
      schema: {
        tags: ["Ratepayer"],
        summary: "Login - Step 1: Password",
        description: "Validates citizen registered phone number and password. On success, generates and dispatches a 6-digit OTP code to the citizen's mobile phone.",
        body: RatepayerLoginInputSchema,
        response: {
          200: RatepayerLoginStep1ResponseSchema,
          401: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { phoneNumber, password } = request.body;
      const ratepayer = await repo.getRatepayerByPhone(phoneNumber);

      if (!ratepayer || !ratepayer.password_hash || !verifyPassword(password, ratepayer.password_hash)) {
        return reply.code(401).send({ error: "Invalid phone number or password credentials" });
      }

      if (ratepayer.status !== "ACTIVE") {
        return reply.code(401).send({ error: `Account is currently ${ratepayer.status}. Contact support.` });
      }

      const otpCode = generateOtp();
      const hashedCode = hashOtp(otpCode);
      await repo.createOtp(phoneNumber, hashedCode, "RATEPAYER_LOGIN");

      return reply.code(200).send({
        status: "OTP_REQUIRED" as const,
        message: "Password verified. A 6-digit verification code has been dispatched to your mobile phone.",
        phoneNumber,
        expiresInSeconds: 600,
        devOtpCode: otpCode,
      });
    }
  );

  // 2. Ratepayer Login Step 2: OTP Verification & Bearer Token Issuance
  app.post(
    "/v1/auth/ratepayer/verify-otp",
    {
      schema: {
        tags: ["Ratepayer"],
        summary: "Login - Step 2: Verify OTP",
        description: "Validates the one-time verification code dispatched during Step 1 and issues a signed bearer access token with real-time account progress metrics.",
        body: VerifyOtpSchema,
        response: {
          200: AuthTokenResponseSchema,
          400: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { phoneNumber, otpCode } = request.body;
      const hashedCode = hashOtp(otpCode);

      const verification = await repo.verifyOtp(phoneNumber, hashedCode, "RATEPAYER_LOGIN");
      if (!verification.valid) {
        return reply.code(400).send({ error: "Invalid or expired OTP verification code" });
      }

      const ratepayer = await repo.getRatepayerByPhone(phoneNumber);
      if (!ratepayer) {
        return reply.code(400).send({ error: "Ratepayer account not found" });
      }

      const token = signToken(
        {
          sub: ratepayer.id,
          userCode: ratepayer.user_code,
          userType: "RATEPAYER",
          phoneNumber: ratepayer.phone_number,
        },
        86400
      );

      return reply.code(200).send({
        accessToken: token,
        tokenType: "Bearer" as const,
        expiresInSeconds: 86400,
        user: {
          id: ratepayer.id,
          userCode: ratepayer.user_code,
          userType: "RATEPAYER" as const,
          phoneNumber: ratepayer.phone_number,
          email: ratepayer.email,
          roles: [],
        },
        completion: ratepayer.completion,
      });
    }
  );

  // 3. Resend OTP for Citizen
  app.post(
    "/v1/auth/ratepayer/request-otp",
    {
      schema: {
        tags: ["Ratepayer"],
        summary: "Resend OTP",
        description: "Dispatches a new 6-digit one-time verification code to the citizen's mobile phone number.",
        body: RequestOtpSchema,
        response: {
          200: z.object({
            message: z.string(),
            phoneNumber: z.string(),
            expiresInSeconds: z.number(),
            devOtpCode: z.string().optional(),
          }),
          400: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { phoneNumber, purpose } = request.body;
      const ratepayer = await repo.getRatepayerByPhone(phoneNumber);

      if (!ratepayer) {
        return reply.code(400).send({ error: "Ratepayer account not found for this phone number" });
      }

      const otpCode = generateOtp();
      const hashedCode = hashOtp(otpCode);
      await repo.createOtp(phoneNumber, hashedCode, purpose);

      return reply.code(200).send({
        message: "OTP generated and dispatched successfully",
        phoneNumber,
        expiresInSeconds: 600,
        devOtpCode: otpCode,
      });
    }
  );

  // 4. Government Staff & Admin Login (Email + Password)
  app.post(
    "/v1/auth/staff/login",
    {
      schema: {
        tags: ["Government & Admin"],
        summary: "Staff Login",
        description: "Authenticates government officials, auditors, and platform administrators with email and password credentials, returning scoped RBAC claims.",
        body: StaffLoginSchema,
        response: {
          200: AuthTokenResponseSchema,
          401: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;
      const staff = await repo.getStaffByEmail(email);

      if (!staff || !staff.password_hash || !verifyPassword(password, staff.password_hash)) {
        return reply.code(401).send({ error: "Invalid official email or password credentials" });
      }

      if (staff.status !== "ACTIVE") {
        return reply.code(401).send({ error: `Account is currently ${staff.status}. Contact CROIP Administrator.` });
      }

      const token = signToken(
        {
          sub: staff.id,
          userCode: staff.user_code,
          userType: staff.user_type,
          email: staff.email,
          roles: staff.roles,
        },
        28800
      );

      return reply.code(200).send({
        accessToken: token,
        tokenType: "Bearer" as const,
        expiresInSeconds: 28800,
        user: {
          id: staff.id,
          userCode: staff.user_code,
          userType: staff.user_type,
          email: staff.email,
          phoneNumber: staff.phone_number,
          roles: staff.roles,
        },
      });
    }
  );

  // 5. Session Introspection (Active Token Claims)
  app.get(
    "/v1/auth/me",
    {
      schema: {
        tags: ["Government & Admin"],
        summary: "Active Session & Profile",
        description: "Validates bearer token and returns current user identity, profile details, active roles, and completion metrics.",
        response: {
          200: z.object({
            id: z.string().uuid(),
            userCode: z.string(),
            userType: UserTypeSchema,
            email: z.string().nullable().optional(),
            phoneNumber: z.string().nullable().optional(),
            profile: z.record(z.unknown()).nullable(),
            roles: z.array(z.record(z.unknown())),
            completion: ProfileCompletionSchema.optional(),
          }),
          401: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const authHeader = request.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return reply.code(401).send({ error: "Missing or invalid Bearer authorization token" });
      }

      const token = authHeader.substring(7);
      const payload = verifyToken<{ sub: string }>(token);
      if (!payload || !payload.sub) {
        return reply.code(401).send({ error: "Session token is invalid or has expired" });
      }

      const user = await repo.getUserById(payload.sub);
      if (!user) {
        return reply.code(401).send({ error: "Authenticated user no longer exists" });
      }

      return reply.code(200).send({
        id: user.id,
        userCode: user.user_code,
        userType: user.user_type,
        email: user.email,
        phoneNumber: user.phone_number,
        profile: user.profile,
        roles: user.roles,
        completion: user.completion,
      });
    }
  );
};
