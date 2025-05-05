const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://subham2006:DycqZDsPtkdUUBmv@gogreem.osuyt6d.mongodb.net/?retryWrites=true&w=majority&appName=gogreem');
        console.log('MongoDB Atlas connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
