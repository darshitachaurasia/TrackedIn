// backend/routes/tasks.js
import express from "express";
import { getAuth } from "@clerk/express";
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

const Task = mongoose.model("Task", taskSchema);

// --- Helpers ---
function todayTask(tasks) {
  const today = new Date();
  return tasks.filter(
    (t) =>
      new Date(t.createdAt).toDateString() === today.toDateString()
  );
}

function requireAuth(req, res) {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }
  return userId;
}

// --- Router ---
const router = express.Router();

// ✅ GET today's tasks (only signed-in user)
router.get("/today", async (req, res) => {
  try {
    const userId = requireAuth(req, res);
    if (!userId) return;

    const allTasks = await Task.find({ userId });
    const tasks = todayTask(allTasks);

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST create new task (for signed-in user)
router.post("/today", async (req, res) => {
  try {
    const userId = requireAuth(req, res);
    if (!userId) return;

    const { task } = req.body;
    if (!task || typeof task !== "string" || task.trim().length < 1) {
      return res.status(400).json({ error: "Task is required" });
    }

    const newTask = await Task.create({
      userId,
      task: task.trim().toLowerCase(),
    });

    res.status(200).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET all tasks for signed-in user
router.get("/today/all", async (req, res) => {
  try {
    const userId = requireAuth(req, res);
    if (!userId) return;

    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE all tasks for signed-in user
router.delete("/today/delete", async (req, res) => {
  try {
    const userId = requireAuth(req, res);
    if (!userId) return;

    await Task.deleteMany({ userId });
    res.status(200).json({ message: "All tasks deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update task completion status (only for signed-in user)
router.patch("/:taskId/status", async (req, res) => {
  try {
    const userId = requireAuth(req, res);
    if (!userId) return;

    const { taskId } = req.params;
    const { completed } = req.body;

    if (typeof completed !== "boolean") {
      return res.status(400).json({ error: "Completed must be true or false" });
    }

    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId },
      { completed },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ GET tasks for a specific date
router.get("/date/:date", async (req, res) => {
  try {
    const userId = requireAuth(req, res);
    if (!userId) return;

    // date format comes like "9-8-2025" or "09-08-2025"
    const [month, day, year] = req.params.date.split("-").map(Number);
    const start = new Date(year, month - 1, day, 0, 0, 0);
    const end = new Date(year, month - 1, day, 23, 59, 59);

    const tasks = await Task.find({
      userId,
      createdAt: { $gte: start, $lte: end },
    });

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

console.log("✅ tasks.js router loaded");

export default router;
