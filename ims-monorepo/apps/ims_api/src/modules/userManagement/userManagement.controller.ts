// USER MANAGEMENT CONTROLLER
import { Request, Response } from "express";
import {
  listUsers,
  getUserOverview,
  getUserProfile,
  editUserDetails,
  removeUser,
  inviteUser,
} from "./userManagement.service.js";

// GET /api/users
// List all users with optional filters (role, status, search).
// Accessible by: Admin, Manager
export const getUsers = async (req: Request, res: Response) => {
  try {
    const { role, status, search, page = "1", limit = "10" } = req.query;

    const filters = {
      role: role as "Staff" | "Manager" | "Admin" | undefined,
      status: status as "active" | "inactive" | undefined,
      search: search as string | undefined,
    };

    const pagination = {
      page: Math.max(1, parseInt(page as string, 10) || 1),
      limit: Math.min(100, Math.max(1, parseInt(limit as string, 10) || 10)),
    };

    const result = await listUsers(filters, pagination);
    return res.status(200).json({ status: "success", ...result });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

// GET /api/users/overview
//  Returns user counts grouped by role for the dashboard panel.
//  Accessible by: Admin, Manager
export const getOverview = async (req: Request, res: Response) => {
  try {
    const overview = await getUserOverview();
    return res.status(200).json({ status: "success", overview });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

// GET /api/users/:id
// Get a user's full profile.
// Accessible by: Admin, Manager (or the user themselves)
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const requester = req.user!;

    // Staff can only view their own profile
    if (requester.role === "Staff" && requester.id !== id) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    const user = await getUserProfile(id);
    return res.status(200).json({ status: "success", user });
  } catch (err: any) {
    if (err.message === "User not found") {
      return res.status(404).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

//  PUT /api/users/:id
//  Edit a user's name, email, or role.
//  Accessible by: Admin only
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;
    const requesterId = req.user!.id;

    const updated = await editUserDetails(id, requesterId, { name, email, role });
    return res.status(200).json({
      status: "success",
      message: "User updated successfully",
      user: updated,
    });
  } catch (err: any) {
    if (err.message === "User not found or already removed") {
      return res.status(404).json({ message: err.message });
    }
    if (
      err.message === "You cannot change your own role" ||
      err.message === "Email already in use by another user"
    ) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

// DELETE /api/users/:id
// Soft-delete (remove) a user.
// Accessible by: Admin only
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const requesterId = req.user!.id;

    const deleted = await removeUser(id, requesterId);
    return res.status(200).json({
      status: "success",
      message: "User removed successfully",
      user: deleted,
    });
  } catch (err: any) {
    if (err.message === "User not found or already removed") {
      return res.status(404).json({ message: err.message });
    }
    if (err.message === "You cannot remove your own account") {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

// POST /api/users/invite
// Invite a new user by email (creates account with temp password).
// Accessible by: Admin, Manager (Manager can only invite Staff)
export const inviteNewUser = async (req: Request, res: Response) => {
  try {
    const { name, email, role, temporaryPassword } = req.body;

    const user = await inviteUser({
      name,
      email,
      role,
      temporaryPassword,
    });

    return res.status(201).json({
      status: "success",
      message: `Invitation sent to ${email}`,
      user,
    });
  } catch (err: any) {
    if (
      err.message === "A user with this email already exists" ||
      err.message.includes("not authorized") ||
      err.message.includes("only invite Staff")
    ) {
      return res.status(400).json({ message: err.message });
    }
    if (err.message.includes("not authorized")) {
      return res.status(403).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};
