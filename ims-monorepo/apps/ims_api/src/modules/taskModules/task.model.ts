// task.model.ts
import mongoose, { Schema } from 'mongoose';

const TaskSchema = new Schema({
  title: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'], // <--- VALID VALUES
    default: 'pending'
  },
  assignedTo: { type: String, required: true }
});
// You MUST have an export here
export const TaskModel = mongoose.model('Task', TaskSchema);