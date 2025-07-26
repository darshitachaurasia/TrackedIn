import express from 'express';
import { clerkMiddleware, requireAuth, getAuth } from '@clerk/express';
import { clerkClient } from '@clerk/express'; // use clerk SDK for metadata
import createRouteMatcher from 'path-to-route-matcher'; // implement similar pattern

const app = express();
app.use(express.json());
app.use(clerkMiddleware());

/**
 * Simulated Next.js createRouteMatcher logic:
 * checks if a path matches any of the patterns
 */
const isAdminRoute = (path) => /^\/admin(.*)/.test(path);

app.use(async (req, res, next) => {
  if (isAdminRoute(req.path)) {
    try {
      await requireAuth()(req, res, async () => {
        const auth = getAuth(req);
        const role = auth.sessionClaims?.metadata?.role;
        if (role !== 'admin') {
          return res.redirect('/');
        }
        next();
      });
    } catch (err) {
      return res.redirect('/');
    }
  } else {
    next();
  }
});
