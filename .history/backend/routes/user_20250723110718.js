import express from 'express';
import { getAuth, requireAuth } from '@clerk/express';
import Checkin from '../models/Checkin.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/:id', requireAuth(), async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ clerkId: id });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkedInToday = await Checkin.findOne({
      user: user._id,
      date: { $gte: today },
    });

    const streak = user.streak || 0;

    const tasks = ['Meditate', 'Read a chapter', 'Workout'];

    res.json({
      checkedInToday: !!checkedInToday,
      streak,
      tasks,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
