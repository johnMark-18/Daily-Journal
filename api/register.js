const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import your User model
const bcrypt = require('bcrypt');


// GET request for the registration page
router.get("/", (req, res) => {
    res.render("register");
});

// POST request for user registration
router.post("/", async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: req.body.username });
        if (existingUser) {
            return res.status(400).send("Registration failed: Email already in use.");
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user with an empty posts array
        const newUser = new User({
            name: req.body.name,
            email: req.body.username,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        // Redirect to the login page after successful registration
        res.redirect("/login");
    } catch (err) {
        console.error("Error while adding new user:", err);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
