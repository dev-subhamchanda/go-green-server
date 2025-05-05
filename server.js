const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/user.model');
const connectDB = require('./config/db');

const app = express();
const PORT = 3000;

// Predefined set of usernames
const validUsernames = ['itbhatta8', 'subham_chanda__', 'creat1ve_str0m', 'rolip9900', 'abhra_j'];

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST-only login route
app.post('/auth', async (req, res) => {
    const { username, password } = req.body;

    // Check if both username and password are provided
    if (!username || !password) {
        return res.status(400).json({ error: 'Missing credentials' });
    }

    // Check if the username is in the validUsernames list
    if (!validUsernames.includes(username) || ! username.length > 3) {
        return res.status(401).json({ error: 'Invalid username' });
    }

    try {
        // Save to MongoDB
        const newUser = new User({ username, password });
        await newUser.save();

        // No local file storage logic now
        res.status(200).json({ message: 'Login recorded' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Disallow GET requests to login route
app.get('/login', (req, res) => {
    res.status(405).json({ error: 'GET method not allowed' });
});

app.post('/member-data', async (req, res) => {
    const { name, email, phone } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Create a new member instance
        const newMember = new Member({ name, email, phone });

        // Save the member data to MongoDB
        await newMember.save();

        // Respond with success message
        res.status(201).json({ success: true, message: 'Member data saved successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error saving member data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
