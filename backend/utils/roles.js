import express from 'express';
import { clerkMiddleware, requireAuth, ClerkExpressWithAuth } from '@clerk/express';
import { clerkClient } from '@clerk/clerk-sdk-node';

// Attach Clerk authentication machinery
export const clerkProtect = [clerkMiddleware(), requireAuth()];
