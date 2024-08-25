import express from 'express';
import authMiddleware from '../middleware/middleware.js';
import User from '../models/userModel.js';
import { getProfile } from '../controllers/profileController.js';

const router = express.Router();

router.get('/', authMiddleware, getProfile);

export default router;