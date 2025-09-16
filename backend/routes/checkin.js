// routes/checkin.js
import express from "express";
import User from "../models/User.js";
import { getAuth } from "@clerk/express";

const router = express.Router();

function requireAuth(req, res) {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }
  return userId;
}

// 📌 POST daily checkin
router.post("/", async (req, res) => {
  try {
    const userId = requireAuth(req, res);
    if (!userId) return;

   let user = await User.findOne({ clerkId: userId });
if (!user) {
  user = new User({
    clerkId: userId,
    currentStreak: 0,
    longestStreak: 0,
    lastCheckin: null,
  });
  await user.save();
}

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (user.lastCheckin) {
      const lastCheckin = new Date(user.lastCheckin);
      lastCheckin.setHours(0, 0, 0, 0);

      const diffDays = Math.floor((today - lastCheckin) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        user.currentStreak += 1; // continued streak
      } else if (diffDays > 1) {
        user.currentStreak = 1; // streak reset
      }
    } else {
      user.currentStreak = 1; // first checkin
    }

    // update longest streak
    if (user.currentStreak > user.longestStreak) {
      user.longestStreak = user.currentStreak;
    }

    user.lastCheckin = today;
    await user.save();

    res.json({
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      lastCheckin: user.lastCheckin,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 GET streak stats
router.get("/", async (req, res) => {
  try {
    const userId = requireAuth(req, res);
    if (!userId) return;

    const user = await User.findOne({ clerkId: userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      lastCheckin: user.lastCheckin,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
