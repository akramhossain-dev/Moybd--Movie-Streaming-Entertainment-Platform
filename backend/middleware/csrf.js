import crypto from 'crypto';

/**
 * Anti-CSRF double-submit token verification middleware.
 * Verifies that state-changing HTTP requests (POST, PUT, DELETE, PATCH)
 * include an X-CSRF-Token or X-XSRF-TOKEN header matching the client's XSRF-TOKEN cookie.
 */
export const verifyCSRF = (req, res, next) => {
  // Safe HTTP methods do not mutate server state
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  // Skip CSRF check for public auth / registration / captcha submit routes
  const publicUnauthRoutes = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/verify',
    '/api/auth/forgot-password',
    '/api/auth/reset-password',
    '/api/captcha/verify',
    '/api/contact/submit',
  ];

  if (publicUnauthRoutes.includes(req.path)) {
    return next();
  }

  const csrfHeader = req.headers['x-csrf-token'] || req.headers['x-xsrf-token'];

  let csrfCookie = null;
  if (req.headers.cookie) {
    const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      if (key && value) acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
    csrfCookie = cookies['XSRF-TOKEN'] || cookies['csrf_token'];
  }

  // For authenticated state-changing requests, enforce token matching
  const hasAuthToken = req.cookies?.auth_token || (req.headers.cookie && req.headers.cookie.includes('auth_token='));
  if (hasAuthToken) {
    if (!csrfHeader || !csrfCookie || csrfHeader !== csrfCookie) {
      return res.status(403).json({
        success: false,
        message: 'CSRF verification failed: Invalid or missing anti-CSRF token',
      });
    }
  }

  next();
};

/**
 * Helper middleware that issues an XSRF-TOKEN cookie to clients if absent.
 */
export const attachCSRFToken = (req, res, next) => {
  let csrfCookie = null;
  if (req.headers.cookie) {
    const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      if (key && value) acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
    csrfCookie = cookies['XSRF-TOKEN'];
  }

  if (!csrfCookie) {
    const csrfToken = crypto.randomBytes(32).toString('hex');
    res.cookie('XSRF-TOKEN', csrfToken, {
      httpOnly: false, // Readable by client JS to include in request headers
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
  next();
};
