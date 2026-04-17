import { Request, Response } from "express";
import {
  createWorkspace,
  checkWorkspaceAccess,
  searchWorkspaces,
  requestWorkspaceAccess,
  resolveAccessRequest,
  getPendingRequests,
  joinViaInviteToken,
} from "./organization.service";

export const createOrg = async (req: Request, res: Response) => {
  try {
    const { name, timezone, currency, country, business_type } = req.body;
    const userId = req.user!.id;

    const org = await createWorkspace(userId, {
      name,
      timezone,
      currency,
      country,
      business_type,
    });

    return res.status(201).json({
      status: "success",
      message: "Workspace created successfully",
      organization: org,
    });
  } catch (err: any) {
    if (err.message === "A workspace with this name already exists") {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

export const getMyWorkspaces = async (req: Request, res: Response) => {
  try {
    const result = await checkWorkspaceAccess(req.user!.id);
    return res.status(200).json({ status: "success", ...result });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const searchOrgs = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    const results = await searchWorkspaces(name as string);
    return res.status(200).json({
      status: "success",
      count: results.length,
      organizations: results,
    });
  } catch (err: any) {
    if (err.message.includes("at least 2 characters")) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

export const requestAccess = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const membership = await requestWorkspaceAccess(userId, id);
    return res.status(201).json({
      status: "success",
      message: "Access request submitted. Awaiting admin approval.",
      membership,
    });
  } catch (err: any) {
    if (err.message === "Workspace not found") {
      return res.status(404).json({ message: err.message });
    }
    if (
      err.message.includes("already a member") ||
      err.message.includes("pending request") ||
      err.message.includes("previously denied")
    ) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

export const getAccessRequests = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const adminId = req.user!.id;

    const requests = await getPendingRequests(adminId, id);
    return res.status(200).json({
      status: "success",
      count: requests.length,
      requests,
    });
  } catch (err: any) {
    if (err.message.includes("Forbidden")) {
      return res.status(403).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

export const resolveRequest = async (req: Request, res: Response) => {
  try {
    const { id, requestId } = req.params;
    const { status } = req.body;
    const adminId = req.user!.id;

    const updated = await resolveAccessRequest(adminId, id, requestId, status);
    return res.status(200).json({
      status: "success",
      message: `Request ${status === "active" ? "approved" : "denied"} successfully`,
      membership: updated,
    });
  } catch (err: any) {
    if (err.message.includes("Forbidden") || err.message.includes("not belong")) {
      return res.status(403).json({ message: err.message });
    }
    if (
      err.message === "Access request not found" ||
      err.message.includes("already been resolved")
    ) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

export const joinWithToken = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { invite_token } = req.body;
    const userId = req.user!.id;

    const membership = await joinViaInviteToken(userId, id, invite_token);
    return res.status(200).json({
      status: "success",
      message: "Successfully joined the workspace",
      membership,
    });
  } catch (err: any) {
    if (
      err.message.includes("Invalid or expired") ||
      err.message.includes("not belong") ||
      err.message.includes("not sent to your account") ||
      err.message.includes("already joined")
    ) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};
