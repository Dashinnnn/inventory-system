import { Request, Response } from 'express';
import { TaskService } from './task.service.js';

const _taskService = new TaskService();

export class TaskController {
  async assign(req: Request, res: Response) {
    try {
      const result = await _taskService.assignTask(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await _taskService.updateTaskStatus(id, status);

    // ADD THIS CHECK:
    if (!result) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
     }
  }

  async getAll(req: Request, res: Response) {
  try {
    const tasks = await _taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
 }
}