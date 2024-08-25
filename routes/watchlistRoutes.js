import express from 'express';
import authMiddleware from '../middleware/middleware.js';
import { getWatchlist, addToWatchlist, removeFromWatchlist } from '../controllers/watchlistController.js';

const router = express.Router();

router.get('/:profileName', authMiddleware, getWatchlist);
router.post('/:profileName/add', authMiddleware, addToWatchlist);
router.delete('/:profileName/delete', authMiddleware, removeFromWatchlist);

export default router;
