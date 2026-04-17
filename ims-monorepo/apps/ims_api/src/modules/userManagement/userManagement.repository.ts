import User, { IUser } from "../../models/User.js";
import mongoose from "mongoose";

export interface UserListFilters {
  role?: "Staff" | "Manager" | "Admin";
  status?: "active" | "inactive";
  search?: string;
  warehouseId?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export const findAllUsers = async (
  filters: UserListFilters,
  pagination: PaginationOptions
) => {
  const query: Record<string, any> = { deleted_at: null };

  if (filters.role) query.role = filters.role;
  if (filters.status === "active") query.deleted_at = null;
  if (filters.status === "inactive") query.deleted_at = { $ne: null };

  if (filters.search) {
    query.$or = [
      { name: { $regex: filters.search, $options: "i" } },
      { email: { $regex: filters.search, $options: "i" } },
    ];
  }

  const skip = (pagination.page - 1) * pagination.limit;

  const [users, total] = await Promise.all([
    User.find(query)
      .select("name email role created_at updated_at deleted_at")
      .skip(skip)
      .limit(pagination.limit)
      .sort({ created_at: -1 }),
    User.countDocuments(query),
  ]);

  return { users, total };
};

export const findUserByIdFull = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await User.findOne({ _id: id, deleted_at: null }).select(
    "name email role created_at updated_at"
  );
};

export const updateUserById = async (
  id: string,
  data: Partial<Pick<IUser, "name" | "email" | "role">>
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await User.findOneAndUpdate(
    { _id: id, deleted_at: null },
    { ...data, updated_at: new Date() },
    { new: true, runValidators: true }
  ).select("name email role created_at updated_at");
};

export const softDeleteUserById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await User.findOneAndUpdate(
    { _id: id, deleted_at: null },
    { deleted_at: new Date() },
    { new: true }
  ).select("name email role deleted_at");
};

export const getUserCountByRole = async () => {
  return await User.aggregate([
    { $match: { deleted_at: null } },
    { $group: { _id: "$role", count: { $sum: 1 }, activeNow: { $sum: 1 } } },
  ]);
};

export const findUserByEmailExcluding = async (email: string, excludeId: string) => {
  return await User.findOne({
    email,
    deleted_at: null,
    _id: { $ne: excludeId },
  });
};

export const inviteUserByEmail = async (data: {
  name: string;
  email: string;
  password_hash: string;
  role: "Staff" | "Manager" | "Admin";
}) => {
  return await User.create(data);
};
