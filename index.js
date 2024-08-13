// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { SciFi, Action, Drama, Animation, Adventure, Crime, Fantasy, Romance, Horror } from './models/CategoryModel.js';

dotenv.config();

const app = express();
const port = 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());

app.get('/movies/:category', async (req, res) => {
    const { category } = req.params;

    try {
        let movies;

        switch (category.toLowerCase()) {
            case 'sci-fi':
                movies = await SciFi.find();
                break;
            case 'action':
                movies = await Action.find();
                break;
            case 'drama':
                movies = await Drama.find();
                break;
            case 'animation':
                movies = await Animation.find();
                break;
            case 'adventure':
                movies = await Adventure.find();
                break;
            case 'crime':
                movies = await Crime.find();
                break;
            case 'fantasy':
                movies = await Fantasy.find();
                break;
            case 'romance':
                movies = await Romance.find();
                break;
            case 'horror':
                movies = await Horror.find();
                break;
            default:
                return res.status(404).send('Category not found');
        }

        res.json(movies);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// server.js
app.get('/movies', async (req, res) => {
    try {
        const sciFiMovies = await SciFi.find();
        const actionMovies = await Action.find();
        const dramaMovies = await Drama.find();
        const animationMovies = await Animation.find();
        const adventureMovies = await Adventure.find();
        const crimeMovies = await Crime.find();
        const fantasyMovies = await Fantasy.find();
        const romanceMovies = await Romance.find();
        const horrorMovies = await Horror.find();

        const allMovies = [
            ...sciFiMovies,
            ...actionMovies,
            ...dramaMovies,
            ...animationMovies,
            ...adventureMovies,
            ...crimeMovies,
            ...fantasyMovies,
            ...romanceMovies,
            ...horrorMovies
        ];

        res.json(allMovies);
    } catch (error) {
        res.status(500).send('Server error');
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
