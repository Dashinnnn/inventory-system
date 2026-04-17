import mongoose from "mongoose";
import Organization, { IOrganization } from "../../models/Organization";
import Membership, { MemberRole, MembershipStatus } from "../../models/Membership";

export const createOrganization = async (data: {
  name: string;
  owner_id: mongoose.Types.ObjectId;
  timezone: string;
  currency: string;
  country: string;
  business_type: string;
}) => {
  return await Organization.create(data);
};

export const findOrganizationByName = async (name: string) => {
  return await Organization.findOne({ name, deleted_at: null });
};

export const searchOrganizationsByName = async (name: string) => {
  return await Organization.find({
    name: { $regex: name, $options: "i" },
    deleted_at: null,
  }).select("name country business_type timezone currency owner_id");
};

export const findOrganizationById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Organization.findOne({ _id: id, deleted_at: null });
};

export const createMembership = async (data: {
  user_id: mongoose.Types.ObjectId;
  organization_id: mongoose.Types.ObjectId;
  role: MemberRole;
  status: MembershipStatus;
  invited_by?: mongoose.Types.ObjectId;
  invite_token?: string;
  invite_token_expires_at?: Date;
}) => {
  return await Membership.create(data);
};

export const findMembership = async (userId: string, organizationId: string) => {
  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(organizationId)
  )
    return null;

  return await Membership.findOne({
    user_id: userId,
    organization_id: organizationId,
  });
};

export const findActiveMembershipsByUser = async (userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) return [];
  return await Membership.find({ user_id: userId, status: "active" }).populate(
    "organization_id",
    "name timezone currency country business_type"
  );
};

export const findPendingRequestsByOrg = async (organizationId: string) => {
  if (!mongoose.Types.ObjectId.isValid(organizationId)) return [];
  return await Membership.find({
    organization_id: organizationId,
    status: "pending",
  }).populate("user_id", "name email");
};

export const findMembershipById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Membership.findById(id);
};

export const updateMembershipStatus = async (
  membershipId: string,
  status: MembershipStatus
) => {
  if (!mongoose.Types.ObjectId.isValid(membershipId)) return null;
  return await Membership.findByIdAndUpdate(
    membershipId,
    { status },
    { new: true }
  );
};

export const findMembershipByInviteToken = async (token: string) => {
  return await Membership.findOne({
    invite_token: token,
    invite_token_expires_at: { $gt: new Date() },
  });
};
