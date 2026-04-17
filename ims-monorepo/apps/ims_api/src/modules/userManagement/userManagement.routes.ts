import { Router } from "express";
import {
  getUsers,
  getOverview,
  getUserById,
  updateUser,
  deleteUser,
  inviteNewUser,
} from "./userManagement.controller.js";
import { authenticate } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { apiLimiter } from "../../middlewares/rateLimiter.middleware";
import { requireRole, requireMinRole } from "./role.middleware.js";
import { requireWorkspaceAccess } from "../../middlewares/workspace.middleware"; 
import {
  inviteUserSchema,
  updateUserSchema,
  listUsersSchema,
  userIdParamSchema,
} from "./userManagement.validators.js";

const router = Router();

router.use(authenticate);
router.use(apiLimiter);
router.use(requireWorkspaceAccess); 

// GET /api/users/overview Access: Admin, Manager
router.get(
  "/overview",
  requireMinRole("Manager"),
  getOverview
);

// GET /api/users Access: Admin, Manager
router.get(
  "/",
  requireMinRole("Manager"),
  validate(listUsersSchema),
  getUsers
);

// POST /api/users/invite Access: Admin
router.post(
  "/invite",
  requireRole("Admin"),
  validate(inviteUserSchema),
  inviteNewUser
);

// GET /api/users/:id Access: Admin, Manager (any user); Staff (own profile only)
router.get(
  "/:id",
  validate(userIdParamSchema),
  getUserById
);

// PUT /api/users/:id Access: Admin only
router.put(
  "/:id",
  requireRole("Admin"),
  validate(updateUserSchema),
  updateUser
);

// DELETE /api/users/:id Access: Admin only
router.delete(
  "/:id",
  requireRole("Admin"),
  validate(userIdParamSchema),
  deleteUser
);

export default router;
