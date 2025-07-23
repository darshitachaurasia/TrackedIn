import express from 'express';
import { requireAuth, getAuth } from '@clerk/express';
import Checkin from '../models/Checkin.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/', requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const user = await User.findOne({ clerkId: userId });

  if (!user) return res.status(404).json({ message: 'User not found' });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 🔁 Check if already checked in today
  const alreadyCheckedIn = await Checkin.findOne({
    user: user._id,
    date: { $gte: today }
  });

  if (alreadyCheckedIn) {
    return res.status(400).json({ message: 'Already checked in today' });
  }

  // 🕐 Find last check-in
  const lastCheckin = await Checkin.findOne({ user: user._id })
    .sort({ date: -1 });

  let newStreak = 1;

  if (lastCheckin) {
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const lastDate = new Date(lastCheckin.date);
    lastDate.setHours(0, 0, 0, 0);

    if (lastDate.getTime() === yesterday.getTime()) {
      newStreak = user.streak + 1;
    }
  }

  // 📌 Save check-in
  const checkin = new Checkin({ user: user._id, date: today });
  await checkin.save();

  // 🧠 Update user streak
  user.streak = newStreak;
  await user.save();

  res.status(201).json({ message: 'Check-in successful', newStreak });
});

export default router;
