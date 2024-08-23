import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    mainCast: [String],
    genre: { type: String, required: true },
    banner: String,
    ageRating: String,
    Rating: Number,
    description: String,
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
