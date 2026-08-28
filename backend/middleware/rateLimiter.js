import rateLimit from 'express-rate-limit';

/**
 * Rate limiter for login endpoint
 * Max 10 attempts per 15 minutes per IP
 */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts from this IP. Please try again after 15 minutes.',
  },
});

/**
 * Rate limiter for registration endpoint
 * Max 5 attempts per 1 hour per IP
 */
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many registration requests from this IP. Please try again after an hour.',
  },
});

/**
 * Rate limiter for forgot password endpoint
 * Max 5 attempts per 1 hour per IP
 */
export const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many password reset requests from this IP. Please try again after an hour.',
  },
});

/**
 * Rate limiter for download authorization requests
 * Max 15 attempts per 1 minute per IP
 */
export const downloadLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many download requests. Please wait a minute and try again.',
  },
});
