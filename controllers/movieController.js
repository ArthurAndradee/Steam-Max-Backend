import { SciFi, Action, Drama, Animation, Adventure, Crime, Fantasy, Romance, Horror } from '../models/CategoryModel.js';

export const getMoviesByCategory = async (req, res) => {
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
};

export const getAllMovies = async (req, res) => {
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
};