import { Router } from 'express';
import { NotificationController } from './notification.controller.js';

const router = Router();
const controller = new NotificationController();

// GET http://localhost:8000/api/notifications?userId=YOUR_ID
router.get('/', (req, res) => controller.getMyNotifications(req, res));

export default router;