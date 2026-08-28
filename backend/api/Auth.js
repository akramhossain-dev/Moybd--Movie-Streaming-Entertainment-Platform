import express from 'express';
import { Register, Login, logout, verify, forgotPassword, resetPassword, getMe } from '../controllers/Auth.js';
import { verifyToken } from '../middleware/auth.js';
import { loginLimiter, registerLimiter, forgotPasswordLimiter } from '../middleware/rateLimiter.js';

const AuthRouter = express.Router();

AuthRouter.post('/register', registerLimiter, Register);
AuthRouter.post('/verify', verify);
AuthRouter.post('/login', loginLimiter, Login);
AuthRouter.post('/logout', logout);
AuthRouter.post('/forgot-password', forgotPasswordLimiter, forgotPassword);
AuthRouter.post('/reset-password', resetPassword);
AuthRouter.get('/me', verifyToken, getMe);

export default AuthRouter;