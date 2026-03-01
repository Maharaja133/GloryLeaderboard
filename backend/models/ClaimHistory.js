const mongoose = require('mongoose');

const claimHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, required: true },
  claimedAt: { type: Date, default: Date.now, index: -1 }, 
});

module.exports = mongoose.model('ClaimHistory', claimHistorySchema);