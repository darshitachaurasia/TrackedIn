import express from "express";
import Task from "../models/Task.js";
import { getAuth } from "@clerk/express";

import { Task } from "../models/Task";

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

// 📌 GET today's tasks
router.get("/today", async (req, res) => {
  try {
    const userId = requireAuth(req, res);
    if (!userId) return;

    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const tasks = await Task.find({
      userId,
      createdAt: { $gte: start, $lte: end },
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 POST new task
router.post("/today", async (req, res) => {
  try {
    const userId = requireAuth(req, res);
    if (!userId) return;

    const { task } = req.body;
    if (!task || task.trim().length < 1) {
      return res.status(400).json({ error: "Task is required" });
    }

    const newTask = await Task.create({
      userId,
      task: task.trim(),
    });

    res.json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 PATCH update task status
router.patch("/:taskId/status", async (req, res) => {
  try {
    const userId = requireAuth(req, res);
    if (!userId) return;

    const { taskId } = req.params;
    const { completed } = req.body;

    const updated = await Task.findOneAndUpdate(
      { _id: taskId, userId },
      { completed },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Task not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 DELETE all today's tasks
router.delete("/today", async (req, res) => {
  try {
    const userId = requireAuth(req, res);
    if (!userId) return;

    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    await Task.deleteMany({
      userId,
      createdAt: { $gte: start, $lte: end },
    });

    res.json({ message: "All today's tasks deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
