import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import movieRoutes from './routes/movieRoutes.js';
import videoRoutes from './routes/videoRoutes.js';

dotenv.config();

const app = express();
const port = 5000;

connectDB();

app.use(express.json());

app.use('/movies', movieRoutes);
app.use('/videos', videoRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});