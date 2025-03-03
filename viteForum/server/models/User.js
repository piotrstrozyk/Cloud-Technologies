const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);