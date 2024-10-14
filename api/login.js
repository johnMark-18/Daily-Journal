const express = require('express');
const router = express.Router();
const User = require('../models/user');  // Assuming the User model is correctly defined
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET;


// GET request for login page
router.get("/", (req, res) => {
    res.render("login");
});
router.post('/', (req, res) => {
    // Clear the JWT token from cookies
    res.clearCookie('token'); // Clear the cookie where the JWT is stored
    console.log("User logged out");

    // Redirect to the home page
    res.redirect('/login'); // Redirect to the home page or login page
});

// POST request for login
router.post("/", async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;

    try {
        // Find the user by email
        const foundUser = await User.findOne({ email: email });
        
        // If user is not found or password is incorrect
        if (!foundUser) {
            return res.status(401).send("Login failed: Incorrect email or password.");
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            return res.status(401).send("Login failed: Incorrect email or password.");
        }

        // Generate a JWT token if the password matches
        const token = jwt.sign(
            { id: foundUser._id, email: foundUser.email },  // Payload
            JWT_SECRET ,                             // Secret key
            { expiresIn: '1h' }                            // Token expiration
        );

        // Store the token in a cookie
        res.cookie('token', token, { httpOnly: true }); // Secure the cookie with httpOnly flag
        res.redirect("/home"); // Redirect to /secrets
    } catch (err) {
        console.error("Error while logging in:", err);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
