require('dotenv').config();

// Middleware to check for a valid API key in request headers
const authMiddleware = (req, res, next) => {
    // Check for API key in headers
    const apiKey = req.headers['x-api-key'] || req.headers['authorization'];
    const validApiKey = process.env.API_KEY;
    
    // If no API key is provided, return 401 Unauthorized
    if (!apiKey) {
        return res.status(401).json({ message: 'API key is missing' });
    }

    // If API key is invalid, return 403 Forbidden
    if (apiKey !== validApiKey) {
        return res.status(403).json({ message: 'Invalid API key' });
    }
    next();
};

module.exports = authMiddleware;