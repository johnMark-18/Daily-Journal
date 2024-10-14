const express = require('express');
const router = express.Router();




router.post('/', (req, res) => {
    // Clear the JWT token from cookies
    res.clearCookie('token'); // Clear the cookie where the JWT is stored
    console.log("User logged out");

    // Redirect to the home page
    res.redirect('/login'); // Redirect to the home page or login page
});



module.exports = router;
