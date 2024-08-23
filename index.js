import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import videoRoutes from './routes/videoRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
connectDB();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/videos', videoRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
