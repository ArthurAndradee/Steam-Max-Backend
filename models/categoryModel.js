// models/CategoryModel.js
import mongoose from 'mongoose';

// Define the movie schema
const movieSchema = new mongoose.Schema({
    title: String,
    mainCast: [String],
    genre: String,
    banner: String
});

// Function to create a model for a given category
function createModel(category) {
    return mongoose.model(category, movieSchema, category);
}

// Create models for each category
export const SciFi = createModel('SciFi');
export const Action = createModel('Action');
export const Drama = createModel('Drama');
export const Animation = createModel('Animation');
export const Adventure = createModel('Adventure');
export const Crime = createModel('Crime');
export const Fantasy = createModel('Fantasy');
export const Romance = createModel('Romance');
export const Horror = createModel('Horror');
