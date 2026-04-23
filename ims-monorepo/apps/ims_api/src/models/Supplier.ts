import { Schema, model, Document } from 'mongoose';

export interface ISupplier extends Document {
  name: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
}

const SupplierSchema = new Schema<ISupplier>({
  name: { type: String, required: true, unique: true },
  contactPerson: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String }
}, { timestamps: true });

export const Supplier = model<ISupplier>('Supplier', SupplierSchema);