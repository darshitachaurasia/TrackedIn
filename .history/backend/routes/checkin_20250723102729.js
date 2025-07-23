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

  const alreadyCheckedIn = await Checkin.findOne({
    user: user._id,
    date: { $gte: today }
  });

  if (alreadyCheckedIn) {
    return res.status(400).json({ message: 'Already checked in today' });
  }

  const checkin = new Checkin({ user: user._id });
  await checkin.save();

  res.status(201).json({ message: 'Check-in successful' });
});

export default router;
