
import mongoose from "mongoose";
// --- Task Schema ---
const taskSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    task: { type: String, required: true },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "tasks" }
);

export const Task = mongoose.model("Task", taskSchema);