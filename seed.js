import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel.js'; // Adjust the path to your user model

dotenv.config(); // Load environment variables

// Connect to the database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.error('Database connection failed:', error));

// Define mock users
const mockUsers = [
  {
    email: 'user1@example.com',
    password: 'password123', // Plain text password
    watchlist: [], // Optional: Add initial watchlist data if desired
  },
  {
    email: 'user2@example.com',
    password: 'password456',
    watchlist: [],
  },
  {
    email: 'user3@example.com',
    password: 'password789',
    watchlist: [],
  },
  // Add more users as needed
];

// Function to seed the database with mock users
const seedUsers = async () => {
  try {
    // Clear the existing users in the collection (optional)
    await User.deleteMany({});

    // Insert mock users into the database
    await User.insertMany(mockUsers);

    console.log('Mock users inserted successfully');
  } catch (error) {
    console.error('Failed to insert mock users:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seed function
seedUsers();
