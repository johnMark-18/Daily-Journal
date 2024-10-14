const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;  // Access token from cookies
    console.log('Token received from cookie:', token);  // Debugging

    if (!token) {
        console.log("No token found. User needs to log in again.");
        return res.redirect('/login'); // Redirect to home page if no token is provided
    }

    jwt.verify(token, JWT_SECRET , (err, decoded) => {
        if (err) {
            console.error("Token verification failed:", err); // Log error for debugging
            return res.redirect('/login'); // Redirect to home page if token is not valid
        }

        // If token is valid, attach decoded user info to the request
        req.user = {
            id: decoded.id, // Ensure to extract the user ID
            email: decoded.email // Extract other relevant info if needed
        };
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authMiddleware;
