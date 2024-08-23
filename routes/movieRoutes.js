import express from 'express';
import { getMoviesByCategory, getAllMovies } from '../controllers/movieController.js';

const router = express.Router();

router.get('/:category', getMoviesByCategory);
router.get('/', getAllMovies);

export default router;