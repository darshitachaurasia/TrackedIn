
// index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { requireAuth } from '@clerk/express';
import userRoutes from './routes'

import connectDB from './db.js';
import authRoutes from './routes/auth.js';
import checkinRoutes from './routes/checkin.js';

dotenv.config();
const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/checkin', checkinRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
