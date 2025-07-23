import express from 'express';
import { requireAuth, getAuth } from '@clerk/express';
import Checkin from '../models/Checkin.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/api/checki', requireAuth(), async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const user = await User.findOne({ clerkId: userId });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already checked in today
    const alreadyCheckedIn = await Checkin.findOne({
      user: user._id,
      date: { $gte: today },
    });

    if (alreadyCheckedIn) {
      return res.status(400).json({ message: 'Already checked in today' });
    }

    // Create new checkin
    const newCheckin = new Checkin({ user: user._id, date: today });
    await newCheckin.save();

    // Fetch last check-in (excluding today)
    const lastCheckin = await Checkin.find({ user: user._id })
      .sort({ date: -1 })
      .skip(1)
      .limit(1);

    let updatedStreak = 1;

    if (lastCheckin.length > 0) {
      const lastDate = new Date(lastCheckin[0].date);
      lastDate.setHours(0, 0, 0, 0);

      const diff = (today - lastDate) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        updatedStreak = user.streak + 1;
      }
    }

    // Update user streak
    user.streak = updatedStreak;
    await user.save();

    res.status(201).json({ message: 'Check-in successful', newStreak: user.streak });
  } catch (error) {
    console.error('Check-in error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
