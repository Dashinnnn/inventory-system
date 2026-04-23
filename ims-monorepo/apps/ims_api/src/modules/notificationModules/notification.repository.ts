import { Types } from 'mongoose';
import { NotificationModel } from './notification.model.js';


export class NotificationRepository {
  // ... other methods

  async findAllByUserId(userId: string) {
    // This looks for all notifications where the recipient matches the userId
    // .sort({ createdAt: -1 }) ensures the newest ones appear first
    return await NotificationModel.find({ recipient: userId }).sort({ createdAt: -1 });
  }

  async create(data: any) {
  return await NotificationModel.create(data);
}

  async getNotificationsByUserId(userId: string) {
  // Check if it's a valid MongoDB ID before trying to convert it
  if (!Types.ObjectId.isValid(userId)) {
    console.error("Invalid User ID format provided:", userId);
    return []; // Return empty instead of crashing the server
  }
return await NotificationModel.find({ 
    recipient: new Types.ObjectId(userId)
  }).sort({ createdAt: -1 });
}

  async updateReadStatus(notificationId: string) {
    // 3. Do the same here just to be safe
    return await NotificationModel.findByIdAndUpdate(
      new Types.ObjectId(notificationId), 
      { isRead: true }, 
      { new: true }
    );
  }
}