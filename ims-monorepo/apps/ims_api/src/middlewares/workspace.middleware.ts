import { Request, Response, NextFunction } from "express";
import { findActiveMembershipsByUser } from "../modules/organizationModules/organization.repository";

export const requireWorkspaceAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const memberships = await findActiveMembershipsByUser(userId);

    if (memberships.length === 0) {
      res.status(403).json({
        message:
          "No workspace access. Please create or join a workspace first.",
        code: "NO_WORKSPACE_ACCESS",
      });
      return;
    }

    next();
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
