import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: String,
    mainCast: [String],
    genre: String,
    banner: String
});

function createModel(category) {
    return mongoose.model(category, movieSchema, category);
}

export const SciFi = createModel('SciFi');
export const Action = createModel('Action');
export const Drama = createModel('Drama');
export const Animation = createModel('Animation');
export const Adventure = createModel('Adventure');
export const Crime = createModel('Crime');
export const Fantasy = createModel('Fantasy');
export const Romance = createModel('Romance');
export const Horror = createModel('Horror');