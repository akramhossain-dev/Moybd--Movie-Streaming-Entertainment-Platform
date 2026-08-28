import express from 'express';
import { Register, Login, logout, verify, forgotPassword, resetPassword, getMe } from '../controllers/Auth.js';
import { verifyToken } from '../middleware/auth.js';

const AuthRouter = express.Router();

AuthRouter.post('/register', Register);
AuthRouter.post('/verify', verify);
AuthRouter.post('/login', Login);
AuthRouter.post('/logout', logout);
AuthRouter.post('/forgot-password', forgotPassword);
AuthRouter.post('/reset-password', resetPassword);
AuthRouter.get('/me', verifyToken, getMe);

export default AuthRouter;