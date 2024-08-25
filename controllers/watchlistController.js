import User from '../models/userModel.js';
import mongoose from 'mongoose';

export const getWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { profileName } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = user.profiles.find(profile => profile.name === profileName);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    await user.populate(`profiles.${user.profiles.indexOf(profile)}.watchlist`);

    res.json({ watchlist: profile.watchlist });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.toString() });
  }
};

export const addToWatchlist = async (req, res) => {
  const { movie } = req.body;
  const { profileName } = req.params;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = user.profiles.find(profile => profile.name === profileName);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    profile.watchlist.push(movie);
    
    await user.save();
  } catch (error) {
    res.status(500).json({ message: 'Failed to add movie to watchlist', error: error.toString() });
  }
};

export const removeFromWatchlist = async (req, res) => {
  const { movieId } = req.body;
  const { profileName } = req.params;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = user.profiles.find(profile => profile.name === profileName);
    if (!profile) {
      console.log('Profile not found');
      return res.status(404).json({ message: 'Profile not found' });
    }

    const movieIdObj = new mongoose.Types.ObjectId(movieId); 
    profile.watchlist = profile.watchlist.filter(movie => movie._id.toString() !== movieIdObj.toString());

    await user.save();
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove movie from watchlist', error: error.toString() });
  }
};