const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, length: { min: 3, max: 15 } },
    hash: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.virtual('public').get(function () {
  return { id: this.id, username: this.username };
});
module.exports = mongoose.model('User', UserSchema);
