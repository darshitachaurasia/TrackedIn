import express from 'express';
import { ClerkExpressRequireAuth } from '@clerk/express';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { checkRole } from './checkRoleMiddleware';

const router = express.Router();

/**
 * POST /set-role
 * Body: { userId: string, role: string }
 * Requires authentication and admin role.
 */
router.post(
  '/set-role',
  ClerkExpressRequireAuth(),          // ensures request is authenticated
  checkRole('admin'),                 // ensures requester is admin
  async (req, res) => {
    const { userId, role } = req.body;
    try {
      const updated = await clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: { role },
      });
      res.json({ success: true, publicMetadata: updated.publicMetadata });
    } catch (err) {
      res.status(500).json({ success: false, error: err.toString() });
    }
  }
);

/**
 * POST /remove-role
 * Body: { userId: string }
 */
router.post(
  '/remove-role',
  ClerkExpressRequireAuth(),
  checkRole('admin'),
  async (req, res) => {
    const { userId } = req.body;
    try {
      const updated = await clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: { role: null },
      });
      res.json({ success: true, publicMetadata: updated.publicMetadata });
    } catch (err) {
      res.status(500).json({ success: false, error: err.toString() });
    }
  }
);

export default router;
