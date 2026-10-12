import type { FastifyPluginAsync } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { getDb, IamRepository } from "@croip/db";
import {
  RegisterRatepayerInputSchema,
  ProfileCompletionSchema,
  AccountStatusSchema,
} from "@croip/contracts";
import { hashPassword } from "../utils/auth-token.js";

const ErrorResponseSchema = z.object({
  error: z.string(),
});

export const ratepayerRoutes: FastifyPluginAsync = async (fastify) => {
  const app = fastify.withTypeProvider<ZodTypeProvider>();
  const repo = new IamRepository(getDb());

  // 1. Citizen Self-Registration
  app.post(
    "/v1/ratepayers/register",
    {
      schema: {
        tags: ["Ratepayer"],
        summary: "Register Account",
        description: "Public registration endpoint for citizens and property owners on the Unified Ratepayer App.",
        body: RegisterRatepayerInputSchema,
        response: {
          201: z.object({
            userId: z.string().uuid(),
            userCode: z.string(),
            phoneNumber: z.string(),
            status: AccountStatusSchema,
            profile: z.object({
              ratepayerType: z.enum(["INDIVIDUAL", "ORGANIZATION"]),
              firstName: z.string().nullable(),
              lastName: z.string().nullable(),
              companyName: z.string().nullable(),
              kycStatus: z.string(),
              preferredChannels: z.array(z.string()),
              digitalAddressGhPost: z.string().nullable(),
            }),
            completion: ProfileCompletionSchema,
          }),
          400: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const body = request.body;

      const existing = await repo.getRatepayerByPhone(body.phoneNumber);
      if (existing) {
        return reply.code(400).send({
          error: `An account with phone number '${body.phoneNumber}' is already registered.`,
        });
      }

      try {
        const passwordHash = hashPassword(body.password);
        const { user, profile, completion } = await repo.registerRatepayer({
          phoneNumber: body.phoneNumber,
          passwordHash,
          email: body.email,
          firstName: body.firstName,
          lastName: body.lastName,
          companyName: body.companyName,
          ghanaCardNumber: body.ghanaCardNumber,
          ratepayerType: body.ratepayerType,
          digitalAddressGhPost: body.digitalAddressGhPost,
          preferredLanguage: body.preferredLanguage,
        });

        return reply.code(201).send({
          userId: user.id,
          userCode: user.user_code,
          phoneNumber: user.phone_number ?? body.phoneNumber,
          status: user.status,
          profile: {
            ratepayerType: profile.ratepayer_type,
            firstName: profile.first_name,
            lastName: profile.last_name,
            companyName: profile.company_name,
            kycStatus: profile.kyc_status,
            preferredChannels: profile.preferred_channels,
            digitalAddressGhPost: profile.digital_address_ghpost,
          },
          completion,
        });
      } catch (err: any) {
        if (err?.code === "23505") {
          return reply.code(400).send({
            error: "A ratepayer account with this phone number, email, or Ghana Card already exists.",
          });
        }
        return reply.code(400).send({
          error: err?.message || "Failed to register ratepayer account",
        });
      }
    }
  );

  // 2. Lookup Ratepayer by Phone with Progress Tracking
  app.get(
    "/v1/ratepayers/lookup",
    {
      schema: {
        tags: ["Ratepayer"],
        summary: "Lookup Profile & Completion Progress",
        description: "Finds an existing citizen profile by phone number and returns account completion metrics, checklist, and actionable next steps.",
        querystring: z.object({
          phoneNumber: z.string().min(9).max(20).describe("Citizen phone number"),
        }),
        response: {
          200: z.object({
            id: z.string().uuid(),
            userCode: z.string(),
            phoneNumber: z.string().nullable(),
            status: AccountStatusSchema,
            profile: z.record(z.unknown()).nullable(),
            completion: ProfileCompletionSchema,
          }),
          404: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { phoneNumber } = request.query;
      const ratepayer = await repo.getRatepayerByPhone(phoneNumber);

      if (!ratepayer) {
        return reply.code(404).send({ error: "Ratepayer not found" });
      }

      return reply.code(200).send({
        id: ratepayer.id,
        userCode: ratepayer.user_code,
        phoneNumber: ratepayer.phone_number,
        status: ratepayer.status,
        profile: ratepayer.profile,
        completion: ratepayer.completion,
      });
    }
  );
};
