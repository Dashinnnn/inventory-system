import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../src/models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, "../.env") });

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ims_db";

const seed = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  const existing = await User.findOne({ email: "admin@ims.com" });
  if (existing) {
    console.log("Admin user already exists. Skipping seed.");
    await mongoose.disconnect();
    return;
  }

  const password_hash = await bcrypt.hash("Admin@1234", 10);
  await User.create({
    name: "Super Admin",
    email: "admin@ims.com",
    password_hash,
    role: "Admin",
  });

  console.log("Admin user seeded successfully.");
  console.log("Email:    admin@ims.com");
  console.log("Password: Admin@1234");

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
};

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});