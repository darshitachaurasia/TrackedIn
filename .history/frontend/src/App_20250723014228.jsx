import express from 'express';
import { requireAuth } from '@clerk/express';
import User from '../models/User.js';

const router = express.Router();

router.get('/me', requireAuth(), async (req, res) => {
  const clerkUser = req.auth.userId;
  const { email, name, phone_number } = req.auth.sessionClaims;

  try {
    let user = await User.findOne({ clerkId: clerkUser });

    if (!user) {
      user = new User({
        clerkId: clerkUser,
        email: email,
        name: name,
        phoneNumber: phone_number || null,
        isApproved: false
      });
      await user.save();
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch/store user", message: err.message });
  }
});


export default router;


