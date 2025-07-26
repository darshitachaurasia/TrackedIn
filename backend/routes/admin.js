// routes/admin.js
import express from 'express';
import { ClerkExpressRequireAuth, getAuth, clerkClient } from '@clerk/express';

const router = express.Router();

// List users
router.get('/users', ClerkExpressRequireAuth(), async (req, res) => {
  const auth = getAuth(req);
  if (auth.sessionClaims.metadata.role !== 'admin') return res.status(403).send('Forbidden');
  const { data } = await clerkClient.users.getUserList({ limit: 50 });
  res.json(data);
});

// Update role
router.post('/users/:userId/role', ClerkExpressRequireAuth(), async (req, res) => {
  const auth = getAuth(req);
  if (auth.sessionClaims.metadata.role !== 'admin') return res.status(403).send('Forbidden');
  const { role } = req.body;
  const updated = await clerkClient.users.updateUserMetadata(req.params.userId, {
    publicMetadata: { role },
  });
  res.json(updated.publicMetadata);
});

// Optionally: Approve sign-up via API if needed
router.post('/signups/:signUpId/approve', ClerkExpressRequireAuth(), async (req, res) => {
  const auth = getAuth(req);
  if (auth.sessionClaims.metadata.role !== 'admin') return res.status(403).send('Forbidden');
  // using manual REST call since no client SDK support
  const result = await approveUser(req.params.signUpId);
  res.json(result.data);
});
