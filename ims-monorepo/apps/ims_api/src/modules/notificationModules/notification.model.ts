import { Schema, model, Document, Types } from 'mongoose';

export interface INotification extends Document {
  recipient: Types.ObjectId; // Use 'Types.ObjectId' specifically
  sender?: Types.ObjectId;
  type: 'STOCK_LOW' | 'APPROVAL_REQ' | 'SYSTEM';
  message: string;
  isRead: boolean;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>({
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['STOCK LOW', 'APPROVAL_REQ', 'SYSTEM'], required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }

});

export const NotificationModel = model<INotification>('Notification', NotificationSchema);

