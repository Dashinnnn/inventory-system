import { z } from "zod";

const roleEnum = z.enum(["Staff", "Manager", "Admin"]);

// When inviting a new user, requires: name, email, role, & temporary password
export const inviteUserSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name is required" })
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be at most 100 characters")
      .trim(),

    email: z
      .string({ required_error: "Email is required" })
      .email("Please provide a valid email address")
      .toLowerCase()
      .trim(),

    role: roleEnum.default("Staff"),

    temporaryPassword: z
      .string({ required_error: "Temporary password is required" })
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must contain uppercase, lowercase, number, and special character"
      ),
  }),
});

// When updating a user's details: all fields optional
export const updateUserSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must be at most 100 characters")
        .trim()
        .optional(),

      email: z
        .string()
        .email("Please provide a valid email address")
        .toLowerCase()
        .trim()
        .optional(),

      role: roleEnum.optional(),
    })
    .refine(
      (data) => Object.keys(data).length > 0,
      "At least one field (name, email, or role) must be provided"
    ),

  params: z.object({
    id: z.string().min(1, "User ID is required"),
  }),
});

// For query params when listing users
export const listUsersSchema = z.object({
  query: z.object({
    role: roleEnum.optional(),
    status: z.enum(["active", "inactive"]).optional(),
    search: z.string().max(100).optional(),
    page: z
      .string()
      .regex(/^\d+$/, "Page must be a positive integer")
      .optional(),
    limit: z
      .string()
      .regex(/^\d+$/, "Limit must be a positive integer")
      .optional(),
  }),
});

// For user ID in route params
export const userIdParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, "User ID is required"),
  }),
});
