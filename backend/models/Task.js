import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Clerk userId
    task: { type: String, required: true },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "tasks" }
);

export default mongoose.model("Task", taskSchema);
