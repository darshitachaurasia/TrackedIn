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


