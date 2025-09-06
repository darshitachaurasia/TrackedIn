import express from "express";
import { clerkMiddleware, getAuth } from "@clerk/express";

const app = express();

app.use(express.json());
app.use(clerkMiddleware()); // attach Clerk auth to req

// Check if request path is /admin or starts with /admin
const isAdminRoute = (path) => /^\/admin(.*)/.test(path);

app.use((req, res, next) => {
  if (isAdminRoute(req.path)) {
    const { userId, sessionClaims } = getAuth(req);

    // Not logged in
    if (!userId) {
      return res.redirect("/");
    }

    // Check role from session claims or metadata
    const role = sessionClaims?.metadata?.role;
    if (role !== "admin") {
      return res.redirect("/");
    }
  }
  next();
});

// Example protected route
app.get("/admin/dashboard", (req, res) => {
  res.json({ message: "Welcome, Admin!" });
});

export default app;
