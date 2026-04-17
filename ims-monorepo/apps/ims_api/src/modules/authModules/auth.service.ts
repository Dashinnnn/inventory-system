import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "./auth.repository.js";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";
// Created Single token only since there's no Refresh/Access token from docs/instructions
const JWT_EXPIRES_IN = "7d";

export const registerUser = async (name: string, email: string, password: string) => {
  const existing = await findUserByEmail(email);
  if (existing) throw new Error("Email already in use");

  const password_hash = await bcrypt.hash(password, 10);
  const user = await createUser({ name, email, password_hash });

  return { id: user._id, name: user.name, email: user.email, role: user.role };
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
};