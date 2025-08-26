require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');
const seedUsers = require('./utils/seedData');

// Ensure we have the MongoDB URI
const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
    console.error('MongoDB URI is not defined in config.env');
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('MongoDB Connected...');
        try {
            await seedUsers();
            console.log('Seeding completed successfully');
        } catch (error) {
            console.error('Seeding error:', error);
        } finally {
            await mongoose.connection.close();
            console.log('Database connection closed');
            process.exit(0);
        }
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
