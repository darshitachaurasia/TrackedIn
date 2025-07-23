import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String, // optional: Clerk handles login, this can be skipped
    default: null
  },
  phoneNumber: {
    type: String,
    default: null
  },
  isApproved: {
    type: Boolean,
    default: false // admin will update this
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);
export default User;
