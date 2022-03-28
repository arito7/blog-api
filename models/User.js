import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, length: { min: 3, max: 15 } },
    hash: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
