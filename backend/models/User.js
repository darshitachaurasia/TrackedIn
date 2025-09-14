import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: String,
  name: String,
  phone: String,
  approved: { type: Boolean, default: false },

  // 🔥 streak tracking
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  lastCheckin: { type: Date, default: null },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
