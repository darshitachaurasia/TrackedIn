// routes/admin.js
import express from "express";
import { clerkClient, getAuth } from "@clerk/express";

const router = express.Router();

/**
 * Utility: Approve a pending sign-up via Clerk REST API
 */
async function approveUser(signUpId) {
  const response = await fetch(
    `https://api.clerk.dev/v1/sign_ups/${signUpId}/attempt_verification`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to approve signup: ${errorText}`);
  }

  return response.json();
}

/**
 * Middleware: Require login
 */
function requireAuth(req, res, next) {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

/**
 * Middleware: Require admin role
 */
function requireAdmin(req, res, next) {
  const auth = getAuth(req);
  const role = auth.sessionClaims?.publicMetadata?.role;
  if (role !== "admin") {
    return res.status(403).json({ error: "Forbidden: Admins only" });
  }
  next();
}

/**
 * GET /admin/users
 * List users (admin only)
 */
router.get("/users", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { data } = await clerkClient.users.getUserList({ limit: 50 });
    res.json(data);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

/**
 * POST /admin/users/:userId/role
 * Update user role (admin only)
 */
router.post("/users/:userId/role", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    if (!role) {
      return res.status(400).json({ error: "Role is required" });
    }

    const updated = await clerkClient.users.updateUserMetadata(req.params.userId, {
      publicMetadata: { role },
    });

    res.json({ success: true, role: updated.publicMetadata.role });
  } catch (err) {
    console.error("Error updating role:", err);
    res.status(500).json({ error: "Failed to update role" });
  }
});

/**
 * POST /admin/signups/:signUpId/approve
 * Approve a pending sign-up (admin only)
 */
router.post("/signups/:signUpId/approve", requireAuth, requireAdmin, async (req, res) => {
  try {
    const result = await approveUser(req.params.signUpId);
    res.json({ success: true, result });
  } catch (err) {
    console.error("Error approving signup:", err);
    res.status(500).json({ error: "Failed to approve signup" });
  }
});

export default router;
