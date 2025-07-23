// routes/auth.js
import express from 'express';
import { requireAuth } from '@clerk/express';
import User from '../models/User.js';

const router = express.Router();

router.post('/me', requireAuth(), async (req, res) => {
  try {
    const { userId, sessionId } = req.auth(); // <-- updated this line

    let existingUser = await User.findOne({ clerkId: userId });

    if (!existingUser) {
      const newUser = new User({
        clerkId: userId,
        email: req.headers['x-forwarded-email'] || 'default@example.com',
        name: req.headers['x-forwarded-name'] || 'Anonymous',
        phone: req.headers['x-forwarded-phone'] || '',
        approved: false,
      });

      await newUser.save();
      
      console.log('✅ New user saved to DB:', newUser);
      return res.status(201).json({ message: 'User created', user: newUser });
    }
    

    res.status(200).json({ message: 'User already exists', user: existingUser });
  } catch (error) {
    console.error('Error in /me route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;
