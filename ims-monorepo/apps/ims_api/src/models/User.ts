import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password_hash: string;
  role: "Staff" | "Manager" | "Admin";
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    role: { type: String, enum: ["Staff", "Manager", "Admin"], default: "Staff" },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model<IUser>("User", UserSchema);