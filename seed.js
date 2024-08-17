import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB Connected');
})
.catch((error) => {
  console.error(`Error connecting to MongoDB: ${error.message}`);
  process.exit(1);
});

// Define mock users
const mockUsers = [
  {
    email: 'user1@example.com',
    password: 'password123', // In production, passwords should be hashed
  },
  {
    email: 'user2@example.com',
    password: 'password123',
  },
  {
    email: 'user3@example.com',
    password: 'password123',
  },
];

// Seed the database with mock users
const seedDatabase = async () => {
  try {
    // Delete existing users
    await User.deleteMany({});
    
    // Insert mock users
    await User.insertMany(mockUsers);
    
    console.log('Mock users seeded successfully');
    process.exit();
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
