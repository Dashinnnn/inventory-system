import { NotificationRepository } from './notification.repository';
import { io } from '../../index'; // Adjust this path to your main index.ts

export class NotificationService {
  private repo = new NotificationRepository();

  async getUserNotifications(userId: string) {
  return await this.repo.findAllByUserId(userId);
}

  async createNotification(recipientId: string, type: 'STOCK_LOW' | 'APPROVAL_REQ' | 'SYSTEM', message: string) {
    // 1. Save to DB so the user can see it in their history later
    const notification = await this.repo.create({
      recipient: recipientId as any,
      type,
      message
    });

    // 2. Real-time push: This sends the alert to the user's screen immediately
    // Note: We use the recipientId as the "Room Name"
    io.to(recipientId).emit('new_notification', notification);

    return notification;
  }

  async getHistory(userId: string) {
    return await this.repo.getNotificationsByUserId(userId);
  }
}