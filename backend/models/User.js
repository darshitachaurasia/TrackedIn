import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: String,
  name: String,
  phone: String,
  approved: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
