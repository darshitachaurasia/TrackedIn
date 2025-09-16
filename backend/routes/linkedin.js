import express from "express";

const router = express.Router();

router.post("/generate-linkedin-post", async (req, res) => {
  try {
    const { task, userProgress } = req.body;

    console.log("✅ Request received for LinkedIn post:");
    console.log("Task:", task);
    console.log("User Progress:", userProgress);

    const taskTitle = task?.title || "my daily task";
    const completed = userProgress?.completedTasks ?? 0;
    const total = userProgress?.totalTasks ?? 0;

    const post = `🚀 Just completed my task: "${taskTitle}"!
Progress: ${completed}/${total} tasks done today.
Feeling motivated to keep going! 🔥`;

    console.log("✅ Generated Post:", post); // 👀 ye bhi terminal me aayega

    res.json({ post });
  } catch (err) {
    console.error("❌ Error in LinkedIn post generation:", err);
    res.status(500).json({ error: "Something went wrong generating the post." });
  }
});

export default router;
