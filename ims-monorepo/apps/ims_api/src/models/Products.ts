import { Schema, model, Document, Types } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  sku: string;
  warehouse: Types.ObjectId; // Link to Warehouse ID
  quantity: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Archived';
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true, trim: true },
  sku: { type: String, required: true, unique: true, uppercase: true },
  warehouse: { 
    type: Schema.Types.ObjectId, 
    ref: 'Warehouse',
    required: true 
  },
  quantity: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['In Stock', 'Low Stock', 'Out of Stock', 'Archived'],
    default: 'In Stock',
  }
}, { timestamps: true });

export const Product = model<IProduct>('Product', ProductSchema);