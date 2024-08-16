import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import movieRoutes from './routes/movieRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import userRoutes from './routes/authRoutes.js';  // Import the user routes for authentication

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/movies', movieRoutes);
app.use('/videos', videoRoutes);
app.use('/auth', userRoutes);  // Use the user routes under the '/auth' path

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
