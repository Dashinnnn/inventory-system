import { Request, Response } from 'express';
import { NotificationService } from './notification.service.js';

export class NotificationController {
  private service = new NotificationService();

  async getMyNotifications(req: Request, res: Response) {
    try {
      // For now, we'll assume you pass the userId in the query or body
      // Later, you'll get this from your 'req.user' after adding auth middleware
      const { userId } = req.query;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const notifications = await this.service.getUserNotifications(userId as string);
      
      return res.status(200).json(notifications);
    } catch (error) {
      return res.status(500).json({ 
        message: "Error fetching notifications", 
        error: (error as Error).message 
      });
    }
  }
}