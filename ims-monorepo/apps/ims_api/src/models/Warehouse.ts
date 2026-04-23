import { Schema, model, Document } from 'mongoose';

export interface IWarehouse extends Document {
  name: string;
  location?: string;
  isDefault: boolean;
}

const WarehouseSchema = new Schema<IWarehouse>({
  name: { type: String, required: true, unique: true },
  location: { type: String },
  isDefault: { type: Boolean, default: false }
}, { timestamps: true });

export const Warehouse = model<IWarehouse>('Warehouse', WarehouseSchema);