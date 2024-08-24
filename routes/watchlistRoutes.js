import express from 'express';
import authMiddleware from '../middleware/middleware.js';
import User from '../models/userModel.js';

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // The user ID should be available after the token is verified
    const user = await User.findById(userId).populate('watchlist'); // Populate the watchlist with movie data

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ watchlist: user.watchlist });
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

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

router.delete('/watchlist/movies', authMiddleware, async (req, res) => {
    const { movieId } = req.body;
  
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.watchlist = user.watchlist.filter(movie => movie._id.toString() !== movieId);
      await user.save();
  
      res.status(200).json({ message: 'Movie removed from watchlist', watchlist: user.watchlist });
    } catch (error) {
      res.status(500).json({ message: 'Failed to remove movie from watchlist', error });
    }
  });

export default router;