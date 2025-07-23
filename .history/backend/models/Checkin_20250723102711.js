import mongoose from 'mongoose';

const checkinSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model('Checkin', checkinSchema);
