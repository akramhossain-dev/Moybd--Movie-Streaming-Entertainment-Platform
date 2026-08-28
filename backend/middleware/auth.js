import jwt from 'jsonwebtoken';

/**
 * Middleware to verify JWT authentication token from cookies or Authorization header.
 */
export const verifyToken = (req, res, next) => {
  try {
    let token = null;

    // 1. Check Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }

    // 2. Check cookies if cookie header present
    if (!token && req.headers.cookie) {
      const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        if (key && value) acc[key] = decodeURIComponent(value);
        return acc;
      }, {});
      token = cookies['auth_token'];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Access denied: No token provided' });
    }

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      console.error('SECRET_KEY environment variable is not set!');
      return res.status(500).json({ success: false, message: 'Server configuration error' });
    }

    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Session expired. Please log in again.' });
    }
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

/**
 * Middleware to verify that authenticated user has admin role ('jmhub' or 'admin').
 */
export const verifyAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const role = req.user.role;
  if (role !== 'jmhub' && role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Access denied: Admin role required' });
  }

  next();
};

/**
 * Optional token verification middleware (attaches user if present, doesn't block if missing)
 */
export const optionalToken = (req, res, next) => {
  try {
    let token = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }

    if (!token && req.headers.cookie) {
      const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        if (key && value) acc[key] = decodeURIComponent(value);
        return acc;
      }, {});
      token = cookies['auth_token'];
    }

    if (token && process.env.SECRET_KEY) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
    }
  } catch (err) {
    // Ignore invalid optional tokens
  }
  next();
};
