import { TaskModel } from './task.model';

export class TaskRepository {
  // Use 'static' so your Service can find it easily
  static async create(taskData: any) {
    return await TaskModel.create(taskData);
  }

  static async updateStatus(id: string, status: string) {
  return await TaskModel.findByIdAndUpdate(
    id,
    { status },
    { 
      new: true,           // Returns the updated document
      runValidators: true  // CRITICAL: This triggers the enum check!
    }
  );
}

  static async findAll() {
    return await TaskModel.find();
  }
}