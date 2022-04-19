const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    post: { type: mongoose.Types.ObjectId, ref: 'Post', required: true },
    name: { type: String, required: true, length: { min: 3, max: 20 } },
    comment: { type: String, required: true, length: { min: 3, max: 200 } },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);
