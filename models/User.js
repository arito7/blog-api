import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    username: { type: String, required: true, length: { min: 3, max: 15 } },
    hash: { type: String, required: true },
  },
  { timestamps: true }
);

export default model('User', UserSchema);
