import { Schema, model, Document, Types } from 'mongoose';

export interface IOrder extends Document {
  orderId: string;
  supplier: Types.ObjectId;
  orderedBy: Types.ObjectId;
  orderDate: Date;
  expectedDeliveryDate: Date;
  totalItems: number;
  totalCost: number;
  status: 'Pending' | 'Received' | 'Cancelled' | 'Low Stock';
}

const OrderSchema = new Schema<IOrder>({
  orderId: { type: String, required: true, unique: true },
  supplier: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
  orderedBy: { type: Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  orderDate: { type: Date, required: true },
  expectedDeliveryDate: { type: Date, required: true },
  totalItems: { type: Number, default: 0 },
  totalCost: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['Pending', 'Received', 'Cancelled', 'Low Stock'], 
    default: 'Pending' 
  }
}, { timestamps: true });

export const Order = model<IOrder>('Order', OrderSchema);