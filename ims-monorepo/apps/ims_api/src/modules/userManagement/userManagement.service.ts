// USER MANAGEMENT SERVICE
import bcrypt from "bcrypt";
import {
  findAllUsers,
  findUserByIdFull,
  updateUserById,
  softDeleteUserById,
  getUserCountByRole,
  findUserByEmailExcluding,
  inviteUserByEmail,
  UserListFilters,
  PaginationOptions,
} from "./userManagement.repository.js";

// List users with optional filters and pagination.
// Admins and Managers can list users which is enforced in controller via middleware
export const listUsers = async (
  filters: UserListFilters,
  pagination: PaginationOptions
) => {
  const { users, total } = await findAllUsers(filters, pagination);
  const totalPages = Math.ceil(total / pagination.limit);

  return {
    users,
    pagination: {
      total,
      page: pagination.page,
      limit: pagination.limit,
      totalPages,
    },
  };
};

// Get a summary count of users by role for the overview panel
export const getUserOverview = async () => {
  const counts = await getUserCountByRole();

  const overview: Record<string, { count: number; activeNow: number }> = {
    Admin: { count: 0, activeNow: 0 },
    Manager: { count: 0, activeNow: 0 },
    Staff: { count: 0, activeNow: 0 },
  };

  for (const item of counts) {
    if (item._id && overview[item._id]) {
      overview[item._id] = {
        count: item.count,
        activeNow: item.activeNow,
      };
    }
  }

  return overview;
};

// Get a single user profile by ID
export const getUserProfile = async (id: string) => {
  const user = await findUserByIdFull(id);
  if (!user) throw new Error("User not found");
  return user;
};

// Update user details: name, email, role
// Admin operation enforced via middleware.
// Cannot update their own role.
export const editUserDetails = async (
  targetId: string,
  requesterId: string,
  data: { name?: string; email?: string; role?: "Staff" | "Manager" | "Admin" }
) => {
  if (targetId === requesterId && data.role) {
    throw new Error("You cannot change your own role");
  }

  if (data.email) {
    const existing = await findUserByEmailExcluding(data.email, targetId);
    if (existing) throw new Error("Email already in use by another user");
  }

  const updated = await updateUserById(targetId, data);
  if (!updated) throw new Error("User not found or already removed");

  return updated;
};

// Soft-delete or remove a user from the system
// Admin-only. Cannot remove self.
export const removeUser = async (targetId: string, requesterId: string) => {
  if (targetId === requesterId) {
    throw new Error("You cannot remove your own account");
  }

  const deleted = await softDeleteUserById(targetId);
  if (!deleted) throw new Error("User not found or already removed");

  return deleted;
};

// Invite a new user by email
// Admins can invite with any role. Managers can only invite Staff.
export const inviteUser = async (
  data: {
    name: string;
    email: string;
    role: "Staff" | "Manager" | "Admin";
    temporaryPassword: string;
  }
) => {
  
  const { findUserByEmail } = await import("../authModules/auth.repository.js");
  const existing = await findUserByEmail(data.email);
  if (existing) throw new Error("A user with this email already exists");

  const password_hash = await bcrypt.hash(data.temporaryPassword, 10);

  const user = await inviteUserByEmail({
    name: data.name,
    email: data.email,
    password_hash,
    role: data.role,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};
