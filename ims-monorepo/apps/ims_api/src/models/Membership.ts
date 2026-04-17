import mongoose, { Document, Schema } from "mongoose";

export type MembershipStatus = "active" | "pending" | "denied";
export type MemberRole = "Staff" | "Manager" | "Admin";

export interface IMembership extends Document {
  user_id: mongoose.Types.ObjectId;
  organization_id: mongoose.Types.ObjectId;
  role: MemberRole;
  status: MembershipStatus;
  invited_by?: mongoose.Types.ObjectId;
  invite_token?: string;
  invite_token_expires_at?: Date;
  created_at: Date;
  updated_at: Date;
}

const MembershipSchema = new Schema<IMembership>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    organization_id: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    role: {
      type: String,
      enum: ["Staff", "Manager", "Admin"],
      default: "Staff",
    },
    status: {
      type: String,
      enum: ["active", "pending", "denied"],
      default: "pending",
    },
    invited_by: { type: Schema.Types.ObjectId, ref: "User", default: null },
    invite_token: { type: String, default: null },
    invite_token_expires_at: { type: Date, default: null },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// One membership record per user per organization
MembershipSchema.index({ user_id: 1, organization_id: 1 }, { unique: true });

export default mongoose.model<IMembership>("Membership", MembershipSchema);
