import express from 'express';
import { loginUser } from '../controllers/authController.js';
import User from '../models/userModel.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/add-profile', async (req, res) => {
    const { userId, userName, userPicture } = req.body;
    try {
      const user = await User.findById(userId);
      user.profiles.push({ userName, userPicture });
      await user.save();
      res.json(user.profiles);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

export default router;
