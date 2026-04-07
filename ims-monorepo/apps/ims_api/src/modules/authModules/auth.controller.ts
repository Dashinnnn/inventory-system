import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service.js";
import { findUserById } from "./auth.repository.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Name, Email, and Password are required" });

    const user = await registerUser(name, email, password);
    return res.status(201).json({ message: "User registered successfully", user });
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const result = await loginUser(email, password);
    return res.status(200).json({ message: "Login successful", ...result });
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await findUserById(req.user!.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ user });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};