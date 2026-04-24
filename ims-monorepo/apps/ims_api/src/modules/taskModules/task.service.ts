import { TaskRepository } from './task.repository.js';

export class TaskService {
  
  async assignTask(taskData: any) {
    return await TaskRepository.create(taskData);
  }

  async getAllTasks() {
    return await TaskRepository.findAll();
  }

  async updateTaskStatus(id: string, newStatus: string) {
    // Add logic here: e.g., "Cannot move from 'Completed' back to 'Pending'"
    return await TaskRepository.updateStatus(id, newStatus);
  }
}