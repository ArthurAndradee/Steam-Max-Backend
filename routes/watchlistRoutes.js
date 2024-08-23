import express from 'express';
import authMiddleware from '../middleware/middleware.js';
import User from '../models/userModel.js';

const router = express.Router();

router.post('/movies', authMiddleware, async (req, res) => {
  const { movie } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.watchlist.push(movie);
    await user.save();

    res.status(200).json({ message: 'Movie added to watchlist', watchlist: user.watchlist });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add movie to watchlist', error });
  }
});

export default router;