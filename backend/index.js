// index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { requireAuth } from '@clerk/express';
//import userRoutes from './routes/user.js';
import connectDB from './db.js';
import authRoutes from './routes/auth.js';
import checkinRoutes from './routes/checkin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use external route files
app.use('/api/auth', authRoutes);
app.use('/api/checkin', checkinRoutes);
//app.use('/api/user', userRoutes);

// ------------------ Local Mock Data Setup ------------------
// TEMP: Remove this section when MongoDB implementation is ready
let users = {};
let tasks = {};

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

    users[userId].longestStreak = Math.max(users[userId].longestStreak, users[userId].currentStreak);
    users[userId].lastLoginDate = new Date().toISOString();
  }

  res.json(users[userId]);
});

// Get today's task
app.get('/api/tasks/:userId/today', (req, res) => {
  const { userId } = req.params;
  const today = new Date().toDateString();
  const todayTask = tasks[`${userId}-${today}`] || null;
  res.json(todayTask);
});

// Create or update today's task
app.post('/api/tasks/:userId/today', (req, res) => {
  const { userId } = req.params;
  const { title, description, tags } = req.body;
  const today = new Date().toDateString();

  const task = {
    id: `${userId}-${today}`,
    userId,
    title,
    description,
    tags: tags || [],
    status: 'in-progress',
    date: today,
    createdAt: new Date().toISOString()
  };

  tasks[`${userId}-${today}`] = task;
  res.json(task);
});

// Update today's task status
app.patch('/api/tasks/:userId/today/status', (req, res) => {
  const { userId } = req.params;
  const { status } = req.body;
  const today = new Date().toDateString();

  if (tasks[`${userId}-${today}`]) {
    tasks[`${userId}-${today}`].status = status;
    res.json(tasks[`${userId}-${today}`]);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Get next day's task
app.get('/api/tasks/:userId/next', (req, res) => {
  const { userId } = req.params;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toDateString();

  const nextTask = tasks[`${userId}-${tomorrowStr}`] || null;
  res.json(nextTask);
});

// Set next day's task
app.post('/api/tasks/:userId/next', (req, res) => {
  const { userId } = req.params;
  const { title, description, tags } = req.body;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toDateString();

  const task = {
    id: `${userId}-${tomorrowStr}`,
    userId,
    title,
    description,
    tags: tags || [],
    status: 'planned',
    date: tomorrowStr,
    createdAt: new Date().toISOString()
  };

  tasks[`${userId}-${tomorrowStr}`] = task;
  res.json(task);
});

// Generate LinkedIn post
app.post('/api/generate-linkedin-post', async (req, res) => {
  const { task, userProgress } = req.body;

  const mockPost = `🚀 Day ${userProgress.currentStreak} of my productivity journey!

Today I focused on: ${task.title}

${task.description}

Building consistent habits one day at a time. 
${task.tags.map(tag => `#${tag}`).join(' ')} #productivity #consistency #growth

What are you working on today? 💪`;

  res.json({ post: mockPost });
});

// ------------------ End of Local Mock Setup ------------------

app.listen(PORT, () => console.log(`TrackedIn API running on port ${PORT}`));
