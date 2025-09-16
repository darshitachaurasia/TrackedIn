// routes/task.js
import express from "express";
import Task from "../models/Task.js";
import User from "../models/User.js";

const router = express.Router();


// ------------------ GET TASKS ------------------

// Get today's task
// ✅ Get all today's tasks
router.get("/:clerkId/today", async (req, res) => {
  try {
    const { clerkId } = req.params;
    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const tasks = await Task.find({
      user: user._id,
      date: { $gte: start, $lte: end },
    }).sort({ createdAt: -1 });

    res.json(tasks); // array return karega
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get next task (tomorrow)
router.get("/:clerkId/next", async (req, res) => {
  try {
    const { clerkId } = req.params;
    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const start = new Date();
    start.setDate(start.getDate() + 1);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setHours(23, 59, 59, 999);

    const task = await Task.findOne({
      user: user._id,
      date: { $gte: start, $lte: end },
    });

    res.json(task || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ------------------ CREATE / UPDATE TASKS ------------------

// Create or update today's task
router.post("/:clerkId/today", async (req, res) => {
  try {
    const { clerkId } = req.params;
    const { content } = req.body;

    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    let task = await Task.findOne({
      user: user._id,
      date: { $gte: start, $lte: end },
    });

    if (!task) {
      task = new Task({ user: user._id, content, date: new Date(), status: "pending" });
    } else {
      task.content = content;
    }

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create or update tomorrow's task
router.post("/:clerkId/next", async (req, res) => {
  try {
    const { clerkId } = req.params;
    const { content } = req.body;

    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const start = new Date();
    start.setDate(start.getDate() + 1);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setHours(23, 59, 59, 999);

    let task = await Task.findOne({
      user: user._id,
      date: { $gte: start, $lte: end },
    });

    if (!task) {
      task = new Task({ user: user._id, content, date: start, status: "pending" });
    } else {
      task.content = content;
    }

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ------------------ UPDATE STATUS ------------------

// Update today's task status
router.patch("/:clerkId/today/status", async (req, res) => {
  try {
    const { clerkId } = req.params;
    const { status } = req.body;

    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    let task = await Task.findOne({
      user: user._id,
      date: { $gte: start, $lte: end },
    });

    if (!task) return res.status(404).json({ error: "Task not found" });

    task.status = status;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ------------------ DELETE (Optional) ------------------

// Delete a task by ID
router.delete("/:taskId", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
