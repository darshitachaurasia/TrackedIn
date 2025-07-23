
const express = require('express');
const cors = require('cors');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB setup (mock for now - would need actual MongoDB connection)
let users = {};
let tasks = {};

// Routes
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
  
  // Check if user logged in today
  const today = new Date().toDateString();
  const lastLogin = users[userId].lastLoginDate ? new Date(users[userId].lastLoginDate).toDateString() : null;
  
  if (lastLogin !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    
    if (lastLogin === yesterdayStr) {
      // Continuing streak
      users[userId].currentStreak += 1;
    } else if (lastLogin !== null) {
      // Streak broken
      users[userId].currentStreak = 1;
    } else {
      // First login
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

// Update task status
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
  
  // Mock OpenAI response - in real implementation, would use OpenAI API
  const mockPost = `🚀 Day ${userProgress.currentStreak} of my productivity journey!

Today I focused on: ${task.title}

${task.description}

Building consistent habits one day at a time. 
${task.tags.map(tag => `#${tag}`).join(' ')} #productivity #consistency #growth

What are you working on today? 💪`;

  res.json({ post: mockPost });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`TrackedIn API listening on port ${port}`);
});
