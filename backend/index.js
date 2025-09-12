// index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { requireAuth } from '@clerk/express';
//import userRoutes from './routes/user.js';
import connectDB from './db.js';
import authRoutes from './routes/auth.js';
import checkinRoutes from './routes/checkin.js';
import adminRoutes from './routes/admin.js';
import { clerkMiddleware } from '@clerk/express';
import taskRouter from './routes/tasks.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use(clerkMiddleware());
// Connect to MongoDB
connectDB();

// Use external route files
app.use('/api/auth', authRoutes);
app.use('/api/checkin', checkinRoutes);
//app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);


// ------------------ Local Mock Data Setup ------------------
// TEMP: Remove this section when MongoDB implementation is ready
let users = {};

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'TrackedIn API is running!' });
});

// Get user profile and streak
app.get('/api/user/:userId', (req, res) => {
  const { userId } = req.params;
  
  if (!users[userId]) {
    users[userId] = {
      id: userId,
      currentStreak: 0,
      longestStreak: 0,
      lastLoginDate: null,
      joinDate: new Date().toISOString()
    };
  }

  const today = new Date().toDateString();
  const lastLogin = users[userId].lastLoginDate ? new Date(users[userId].lastLoginDate).toDateString() : null;

  if (lastLogin !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (lastLogin === yesterdayStr) {
      users[userId].currentStreak += 1;
    } else if (lastLogin !== null) {
      users[userId].currentStreak = 1;
    } else {
      users[userId].currentStreak = 1;
    }
if (!users[userId].daysActive) users[userId].daysActive = 0;

// If logging in a new day, increment
if (lastLogin !== today) {
  users[userId].daysActive += 1;
}

    users[userId].longestStreak = Math.max(users[userId].longestStreak, users[userId].currentStreak);
    users[userId].lastLoginDate = new Date().toISOString();
  }

  res.json(users[userId]);
});


app.use('/api/tasks',taskRouter)


// Generate LinkedIn post
app.post('/api/generate-linkedin-post', async (req, res) => {
  const { task, userProgress } = req.body;

  if (!task || !task.title || !userProgress) {
    return res.status(400).json({ error: "Invalid request: missing task or userProgress" });
  }

  const mockPost = `🚀 Day ${userProgress.currentStreak} of my productivity journey!

Today I focused on: ${task.title}

${task.description || ""}

Building consistent habits one day at a time. 
${(task.tags || []).map(tag => `#${tag}`).join(' ')} #productivity #consistency #growth

What are you working on today? 💪`;

  res.json({ post: mockPost });
});
app.post('/api/generate-linkedin-post/summary', async (req, res) => {
  const { tasks, userProgress } = req.body;

  if (!Array.isArray(tasks) || tasks.length === 0 || !userProgress) {
    return res.status(400).json({ error: "Invalid request: missing tasks or userProgress" });
  }

  // Format all tasks into bullet points
  const taskSummaries = tasks
    .map((t, idx) => `• ${t.title}${t.description ? ` — ${t.description}` : ""}`)
    .join("\n");

  // Collect tags from all tasks
  const allTags = tasks.flatMap((t) => t.tags || []);
  const uniqueTags = [...new Set(allTags)];

  const mockPost = `🚀 Day ${userProgress.currentStreak} of my productivity journey!  

Here’s what I accomplished today:  
${taskSummaries}  

Building consistent habits one day at a time.  
${uniqueTags.map(tag => `#${tag}`).join(' ')} #productivity #consistency #growth  

What are you working on today? 💪`;

  res.json({ post: mockPost });
});


// ------------------ End of Local Mock Setup ------------------

app.listen(PORT, () => console.log(`TrackedIn API running on port ${PORT}`));
