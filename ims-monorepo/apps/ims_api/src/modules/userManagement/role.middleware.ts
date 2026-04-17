import { Request, Response, NextFunction } from "express";
import { AuthPayload } from "../../middlewares/auth.middleware.js";

type Role = "Staff" | "Manager" | "Admin";

const roleHierarchy: Record<Role, number> = {
  Staff: 1,
  Manager: 2,
  Admin: 3,
};

// Restricts access to users with at least the given role level.
// requireRole("Manager") allows Manager and Admin, blocks Staff
export const requireRole = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user as AuthPayload | undefined;

    if (!user) {
      res.status(401).json({ message: "Unauthorized: No authenticated user" });
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      res.status(403).json({
        message: `Forbidden: Requires one of [${allowedRoles.join(", ")}] role`,
      });
      return;
    }

    next();
  };
};

// Requires a minimum role level
// requireMinRole("Manager") allows Manager and Admin.
export const requireMinRole = (minRole: Role) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user as AuthPayload | undefined;

    if (!user) {
      res.status(401).json({ message: "Unauthorized: No authenticated user" });
      return;
    }

    if (roleHierarchy[user.role] < roleHierarchy[minRole]) {
      res.status(403).json({
        message: `Forbidden: Requires at least ${minRole} role`,
      });
      return;
    }

    next();
  };
};
