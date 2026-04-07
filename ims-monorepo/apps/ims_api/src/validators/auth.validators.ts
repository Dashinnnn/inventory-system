import { z } from 'zod';

// Schema for Registration
export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(Number(process.env.MIN_NAME_LENGTH) || 2),
    password: z.string().min(Number(process.env.MIN_PASSWORD_LENGTH) || 8),
    email: z.string().email(),
  }),
});

// Schema for Login
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
  }),
});