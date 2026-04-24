import { Router } from 'express';
import { TaskController } from './task.controller.js';


const router = Router();
const _taskController = new TaskController();

router.get('/', _taskController.getAll);

// Assign a task: POST /api/tasks
router.post('/', _taskController.assign);

// Update status: PATCH /api/tasks/:id/status
router.patch('/:id/status', _taskController.updateStatus);

export { router as taskRoutes };