import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    post: { type: mongoose.Types.ObjectId, ref: 'Post', required: true },
    name: { type: String, required: true, length: { min: 3, max: 20 } },
    comment: { type: String, required: true, length: { min: 3, max: 200 } },
  },
  { timestamps: true }
);

export default mongoose.model('Comment', CommentSchema);
