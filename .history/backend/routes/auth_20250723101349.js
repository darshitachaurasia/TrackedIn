// routes/auth.js
import express from 'express';
import { requireAuth, getAuth } from '@clerk/express';
import { users } from '@clerk/clerk-sdk-node';
import User from '../models/User.js';

const router = express.Router();

router.get('/me', requireAuth(), async (req, res) => {
  try {
    const { userId } = getAuth(req);

    console.log('🟢 Clerk userId:', userId);

    let existingUser = await User.findOne({ clerkId: userId });

    if (!existingUser) {
      const clerkUser = await users.getUser(userId);

      const newUser = new User({
        clerkId: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        name: clerkUser.firstName + ' ' + clerkUser.lastName || 'Anonymous',
        phone: clerkUser.phoneNumbers[0]?.phoneNumber || '',
        approved: false,
      });

      await newUser.save();

      console.log('✅ New user saved to DB:', newUser);

      return res.status(201).json({ message: 'User created', user: newUser });
    }

    console.log('ℹ️ User already exists in DB:', existingUser);

    res.status(200).json({ message: 'User already exists', user: existingUser });
  } catch (error) {
    console.error('❌ Error in /me route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
