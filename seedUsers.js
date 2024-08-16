import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/userModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const seedUsers = async () => {
    try {
        await User.deleteMany();

        const salt = await bcrypt.genSalt(10);

        const users = [
            {
                email: 'arthurandrad.23@gmail.com',
                password: await bcrypt.hash('Amanda1804', salt),
            },
        ];

        await User.insertMany(users);

        console.log('Users seeded!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedUsers();
