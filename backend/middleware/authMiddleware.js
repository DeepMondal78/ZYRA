// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer')) {
        try {
            token = token.split(' ')[1];
            
            // Strong secret check
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                return res.status(500).json({ message: 'Server configuration error: JWT secret missing' });
            }

            const decoded = jwt.verify(token, secret);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

module.exports = { protect };