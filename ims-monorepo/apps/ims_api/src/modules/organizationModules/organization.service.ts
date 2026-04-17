import crypto from "crypto";
import mongoose from "mongoose";
import {
  createOrganization,
  findOrganizationByName,
  findOrganizationById,
  searchOrganizationsByName,
  createMembership,
  findMembership,
  findActiveMembershipsByUser,
  findPendingRequestsByOrg,
  findMembershipById,
  updateMembershipStatus,
  findMembershipByInviteToken,
} from "./organization.repository";

export const createWorkspace = async (
  userId: string,
  data: {
    name: string;
    timezone: string;
    currency: string;
    country: string;
    business_type: string;
  }
) => {
  const existing = await findOrganizationByName(data.name);
  if (existing) throw new Error("A workspace with this name already exists");

  const org = await createOrganization({
    ...data,
    owner_id: new mongoose.Types.ObjectId(userId),
  });

  await createMembership({
    user_id: new mongoose.Types.ObjectId(userId),
    organization_id: org._id as mongoose.Types.ObjectId,
    role: "Admin",
    status: "active",
  });

  return org;
};

export const checkWorkspaceAccess = async (userId: string) => {
  const memberships = await findActiveMembershipsByUser(userId);
  return {
    hasAccess: memberships.length > 0,
    workspaces: memberships.map((m: any) => ({
      membershipId: m._id,
      role: m.role,
      organization: m.organization_id,
    })),
  };
};

export const searchWorkspaces = async (name: string) => {
  if (!name || name.trim().length < 2) {
    throw new Error("Search term must be at least 2 characters");
  }
  return await searchOrganizationsByName(name.trim());
};

export const requestWorkspaceAccess = async (
  userId: string,
  organizationId: string
) => {
  const org = await findOrganizationById(organizationId);
  if (!org) throw new Error("Workspace not found");

  const existing = await findMembership(userId, organizationId);
  if (existing) {
    if (existing.status === "active")
      throw new Error("You are already a member of this workspace");
    if (existing.status === "pending")
      throw new Error("You already have a pending request for this workspace");
    if (existing.status === "denied")
      throw new Error(
        "Your request was previously denied. Contact the workspace admin."
      );
  }

  const membership = await createMembership({
    user_id: new mongoose.Types.ObjectId(userId),
    organization_id: new mongoose.Types.ObjectId(organizationId),
    role: "Staff", // default role for access requests
    status: "pending",
  });

  return membership;
};

export const resolveAccessRequest = async (
  adminId: string,
  organizationId: string,
  membershipId: string,
  action: "active" | "denied"
) => {
  const adminMembership = await findMembership(adminId, organizationId);
  if (!adminMembership || adminMembership.status !== "active") {
    throw new Error("Forbidden: You are not an active member of this workspace");
  }

  const membership = await findMembershipById(membershipId);
  if (!membership) throw new Error("Access request not found");

  if (membership.organization_id.toString() !== organizationId) {
    throw new Error("This request does not belong to your workspace");
  }

  if (membership.status !== "pending") {
    throw new Error("This request has already been resolved");
  }

  return await updateMembershipStatus(membershipId, action);
};

export const getPendingRequests = async (
  adminId: string,
  organizationId: string
) => {
  const adminMembership = await findMembership(adminId, organizationId);
  if (!adminMembership || adminMembership.status !== "active") {
    throw new Error("Forbidden: You are not an active member of this workspace");
  }

  return await findPendingRequestsByOrg(organizationId);
};

export const joinViaInviteToken = async (
  userId: string,
  organizationId: string,
  token: string
) => {
  const membership = await findMembershipByInviteToken(token);

  if (!membership) {
    throw new Error("Invalid or expired invite token");
  }

  if (membership.organization_id.toString() !== organizationId) {
    throw new Error("This token does not belong to this workspace");
  }

  if (membership.user_id.toString() !== userId) {
    throw new Error("This invite was not sent to your account");
  }

  if (membership.status === "active") {
    throw new Error("You have already joined this workspace");
  }

  membership.status = "active";
  membership.invite_token = undefined;
  membership.invite_token_expires_at = undefined;
  await membership.save();

  return membership;
};

export const generateInviteToken = () => {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 48 * 60 * 60 * 1000); 
  return { token, expires };
};
