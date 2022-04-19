const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, length: { min: 3, max: 100 } },
    body: { type: String, required: true, length: { min: 3, max: 2000 } },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Post', PostSchema);
