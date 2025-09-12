// routes/admin.js
import express from "express";
import { clerkClient, getAuth } from "@clerk/express";

const router = express.Router();

// --- Middlewares ---
function requireAuth(req, res, next) {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  next();
}

async function requireAdmin(req, res, next) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    // fetch the full user object
    const user = await clerkClient.users.getUser(userId);

    // check role
    const role = user.publicMetadata?.role;
    if (role !== "admin") {
      return res.status(403).json({ error: "Forbidden: Admins only" });
    }

    next();
  } catch (err) {
    console.error("Error in requireAdmin:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}


// --- List Users ---
router.get("/users", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { data } = await clerkClient.users.getUserList({ limit: 50 });
    res.json(data);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// --- Update User Role ---
router.post("/users/:userId/role", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    if (!role) return res.status(400).json({ error: "Role is required" });

    const updated = await clerkClient.users.updateUserMetadata(req.params.userId, {
      publicMetadata: { role },
    });

    res.json({ success: true, role: updated.publicMetadata.role });
  } catch (err) {
    console.error("Error updating role:", err);
    res.status(500).json({ error: "Failed to update role" });
  }
});

// --- Approve User Signup ---
router.post("/signups/:signUpId/approve", requireAuth, requireAdmin, async (req, res) => {
  try {
    const response = await fetch(
      `https://api.clerk.dev/v1/sign_ups/${req.params.signUpId}/attempt_verification`,
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
      throw new Error(errorText);
    }

    const result = await response.json();
    res.json({ success: true, result });
  } catch (err) {
    console.error("Error approving signup:", err);
    res.status(500).json({ error: "Failed to approve signup" });
  }
});

export default router;
