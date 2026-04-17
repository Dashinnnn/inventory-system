import mongoose, { Document, Schema } from "mongoose";

export interface IOrganization extends Document {
  name: string;
  owner_id: mongoose.Types.ObjectId;
  timezone: string;
  currency: string;
  country: string;
  business_type: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

const OrganizationSchema = new Schema<IOrganization>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    owner_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    timezone: { type: String, required: true },
    currency: { type: String, required: true },
    country: { type: String, required: true },
    business_type: { type: String, required: true },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model<IOrganization>("Organization", OrganizationSchema);
