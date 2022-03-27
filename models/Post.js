import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, length: { min: 3, max: 100 } },
    body: { type: String, required: true, length: { min: 3, max: 2000 } },
    published: { type: Boolean, default: false },
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

export default mongoose.model('Post', PostSchema);
