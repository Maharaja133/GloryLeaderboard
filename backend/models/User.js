const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totalPoints: { type: Number, default: 0, index: true }, 
});

module.exports = mongoose.model('User', userSchema);