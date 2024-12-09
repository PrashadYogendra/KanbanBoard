const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');

// Middleware to authenticate users
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    console.error('Authentication failed:', error);
    res.status(403).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
