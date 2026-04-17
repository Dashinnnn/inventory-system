import User, { IUser } from "../../models/User.js";

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email, deleted_at: null });
};

export const createUser = async (data: {
  name: string;
  email: string;
  password_hash: string;
  role?: "Staff" | "Manager" | "Admin";
}) => {
  return await User.create(data);
};

export const findUserById = async (id: string) => {
  return await User.findOne({ _id: id, deleted_at: null }).select("name email role");
};