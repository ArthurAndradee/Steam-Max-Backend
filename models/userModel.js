import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  picture: {
    type: String,
  },
  watchlist: [{
    title: String,
    mainCast: [String],
    genre: String,
    banner: String,
    ageRating: String,
    Rating: Number,
    description: String,
  }],
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profiles: [profileSchema],
});

const User = mongoose.model('User', userSchema);

export default User;