import express from 'express';
import authMiddleware from '../middleware/middleware.js';
import { addProfile, getProfile, getProfiles, updateProfile, deleteProfile, upload } from '../controllers/profileController.js';

const router = express.Router();

router.get('/', authMiddleware, getProfile); 
router.get('/get', authMiddleware, getProfiles);
router.post('/upload', authMiddleware ,upload.single('picture'), addProfile);
router.put('/update/:profileName', authMiddleware, updateProfile);
router.delete('/delete/:profileName', authMiddleware, deleteProfile)

export default router;