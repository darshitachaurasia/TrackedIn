// routes/auth.js
import express from 'express';
import { requireAuth } from '@clerk/express';
import User from '../models/User.js';

const router = express.Router();

router.get('/me', requireAuth(), async (req, res) => {
  try {
    const { userId, sessionId } = req.auth;

    // Check if user already exists in MongoDB
    let existingUser = await User.findOne({ clerkId: userId });

    if (!existingUser) {
      // Create new user
      const newUser = new User({
        clerkId: userId,
        email: req.headers['x-forwarded-email'] || 'default@example.com', // Optional, based on what Clerk provides
        name: req.headers['x-forwarded-name'] || 'Anonymous',
        phone: req.headers['x-forwarded-phone'] || '',
        approved: false,
      });

      await newUser.save();
      return res.status(201).json({ message: 'User created', user: newUser });
    }

    res.status(200).json({ message: 'User already exists', user: existingUser });
  } catch (error) {
    console.error('Error in /me route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
