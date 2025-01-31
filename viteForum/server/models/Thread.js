const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const threadSchema = new Schema({
  id: String,
  title: { type: String, required: true },
  userId: { type: String, required: true },
  replies: [
    {
      name: String,
      text: String
    }
  ],
  likes: [String]
});

module.exports = mongoose.model('Thread', threadSchema);