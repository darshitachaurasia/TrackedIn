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
import { clerkMiddleware ,getAuth} from '@clerk/express';
import taskRouter from './routes/tasks.js'
import { Task } from './models/Task.js';

// geminiClient.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Read API key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Export a ready model
export const gemini = genAI.getGenerativeModel({
  model: "gemini-2.0-pro", // ✅ this is already correct
});

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


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
    users[userId].daysActive += 1; // ✅ simplified duplicate check

    users[userId].longestStreak = Math.max(users[userId].longestStreak, users[userId].currentStreak);
    users[userId].lastLoginDate = new Date().toISOString();
  }

  res.json(users[userId]);
});


app.use('/api/tasks',taskRouter)


app.post('/api/generate-linkedin-post/summary', async (req, res) => {
  try {
    const { userProgress } = req.body;

    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // ✅ Fetch today's tasks from MongoDB
    const today = new Date();
    const start = new Date(today.setHours(0, 0, 0, 0));
    const end = new Date(today.setHours(23, 59, 59, 999));

    const tasks = await Task.find({
      userId,
      createdAt: { $gte: start, $lte: end },
    });

    if (!Array.isArray(tasks) || tasks.length === 0 || !userProgress) {
      return res.status(400).json({ error: "No tasks or userProgress found" });
    }

    const taskSummaries = tasks.map((t) => `⤷ ${t.task}`).join("\n");

    const prompt = `
YOU ARE A LINKEDIN CONTENT CREATOR.
Start the post with a hook line and a rehook line but don't mention "hook" or "rehook".
The post should be 150–200 words.
It must:
- Address problems faced by techies and how to face them.
- Be relatable to technology.
- Use storytelling tone.
- Use bullet points, arrows, and ⤷.
- Be raw, authentic, humanly written.
- No symbols like **, #, - , emojis.
- No external data or references.
- End with a CTA (comment, DM, or a question).
- Keep sentences short and structure clear.
- Ensure proper spacing for readability.

Here are the tasks completed today:
${taskSummaries}

Now write the LinkedIn post.
`;

    const result = await gemini.generateContent(prompt);
    const output = result.response.text();
    console.log("🔑 Clerk Auth Debug:", getAuth(req));

    res.json({ post: output });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// ------------------ End of Local Mock Setup ------------------

app.listen(PORT, () => console.log(`TrackedIn API running on port ${PORT}`));
