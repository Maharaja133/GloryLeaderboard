const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

router.post('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const points = Math.floor(Math.random() * 10) + 1;

    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { totalPoints: points } },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: 'User not found' });

    await ClaimHistory.create({
      userId: user._id,
      points,
    });

    const users = await User.find().sort({ totalPoints: -1 });
    const leaderboard = users.map((u, i) => ({
      id: u._id,
      name: u.name,
      totalPoints: u.totalPoints,
      rank: i + 1,
    }));

    res.status(200).json({
      message: `${points} points awarded to ${user.name}`,
      awardedPoints: points,
      leaderboard,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error processing claim' });
  }
});

router.get('/history', async (req, res) => {
  try {
    const history = await ClaimHistory.find()
      .sort({ claimedAt: -1 })
      .populate('userId', 'name');

    const formatted = history.map(entry => ({
      id: entry._id,
      userName: entry.userId.name,
      points: entry.points,
      claimedAt: entry.claimedAt,
    }));

    res.json(formatted);
  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).json({ error: 'Failed to fetch claim history' });
  }
});

module.exports = router;
