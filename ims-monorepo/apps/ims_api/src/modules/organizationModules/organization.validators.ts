import { z } from "zod";

export const createWorkspaceSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Workspace name is required" })
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be at most 100 characters")
      .trim(),

    timezone: z
      .string({ required_error: "Timezone is required" })
      .min(1, "Timezone is required"),

    currency: z
      .string({ required_error: "Currency is required" })
      .length(3, "Currency must be a 3-letter code (e.g. PHP, USD)"),

    country: z
      .string({ required_error: "Country is required" })
      .min(2, "Country is required"),

    business_type: z
      .string({ required_error: "Business type is required" })
      .min(2, "Business type is required"),
  }),
});

export const searchWorkspaceSchema = z.object({
  query: z.object({
    name: z
      .string({ required_error: "Search term is required" })
      .min(2, "Search term must be at least 2 characters"),
  }),
});

export const orgIdParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Organization ID is required"),
  }),
});

export const resolveRequestSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Organization ID is required"),
    requestId: z.string().min(1, "Request ID is required"),
  }),
  body: z.object({
    status: z.enum(["active", "denied"], {
      required_error: "Status must be 'active' or 'denied'",
    }),
  }),
});

export const joinWithTokenSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Organization ID is required"),
  }),
  body: z.object({
    invite_token: z
      .string({ required_error: "Invite token is required" })
      .min(1, "Invite token is required"),
  }),
});
