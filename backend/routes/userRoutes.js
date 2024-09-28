const express = require('express');
const User = require('../models/User'); // Adjust the path if needed

const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const newUser = new User({ username, email, password, role });
        await newUser.save(); // This will add the user to MongoDB
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
});

// Other user routes can be added here (e.g., fetching users, updating, deleting)

// Export the router
module.exports = router;
