import express from 'express';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const router = express.Router();

// @route POST /api/users/login
// @desc Authenticate user & get token
// @access Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;