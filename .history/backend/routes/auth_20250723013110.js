// routes/auth.js
import express from 'express';
import { requireAuth } from '@clerk/clerk-sdk-node';
import User from '../models/User.js';

const router = express.Router();

router.get('/me', requireAuth(), async (req, res) => {
  const clerkUser = req.auth.userId;
  const { emailAddress, firstName, lastName } = req.auth.sessionClaims;

  try {
    let user = await User.findOne({ clerkId: clerkUser });

    if (!user) {
      user = new User({
        clerkId: clerkUser,
        email: emailAddress,
        name: `${firstName} ${lastName}`,
      });
      await user.save();
    }

    res.json({ message: "User authenticated", user });
  } catch (err) {
    res.status(500).json({ message: "Error verifying user", error: err.message });
  }
});

export default router;
