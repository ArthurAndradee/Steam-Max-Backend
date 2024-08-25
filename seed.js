import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel.js';

dotenv.config(); 

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.error('Database connection failed:', error));

  const mockUsers = [
    {
      email: 'user1@example.com',
      password: 'password123',
      profiles: [
        { name: 'Profile1', picture: 'profile1.jpg', watchlist: [] },
        { name: 'Profile2', picture: 'profile2.jpg', watchlist: [] },
      ],
    },
    {
      email: 'user2@example.com',
      password: 'password456',
      profiles: [
        { name: 'Profile3', picture: 'profile3.jpg', watchlist: [] },
        { name: 'Profile4', picture: 'profile4.jpg', watchlist: [] },
      ],
    },
    {
      email: 'user3@example.com',
      password: 'password789',
      profiles: [
        { name: 'Profile5', picture: 'profile5.jpg', watchlist: [] },
      ],
    },
  ];

const seedUsers = async () => {
  try {
    await User.deleteMany({});

    await User.insertMany(mockUsers);

    console.log('Mock users inserted successfully');
  } catch (error) {
    console.error('Failed to insert mock users:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedUsers();