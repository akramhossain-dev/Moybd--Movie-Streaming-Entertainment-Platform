import User from "../models/user.js";
import Token from "../models/Token.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';

const getTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        await Token.deleteMany({ email, type: 'verification' });
        await Token.create({
            email,
            code: verificationCode,
            type: 'verification',
            payload: { name, hashedPassword }
        });

        const transporter = getTransporter();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification Code',
            text: `Your verification code is: ${verificationCode}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Verification code sent to email' });
    } catch (error) {
        console.error('Error during registration', error);
        res.status(500).json({ error: 'Error during registration' });
    }
};

const verify = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;

        if (!email || !verificationCode) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const tokenDoc = await Token.findOne({ email, code: verificationCode, type: 'verification' });

        if (tokenDoc && tokenDoc.payload) {
            const { name, hashedPassword } = tokenDoc.payload;
            await Token.deleteOne({ _id: tokenDoc._id });

            const newUser = new User({
                name: name,
                email: email,
                password: hashedPassword,
            });

            await newUser.save();

            res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });
        } else {
            res.status(400).json({ success: false, message: 'Invalid or expired verification code' });
        }
    } catch (error) {
        console.error('Error during verification', error);
        res.status(500).json({ error: 'Error during verification' });
    }
};

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const findUser = await User.findOne({ email });

        if (!findUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, findUser.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }

        const secretKey = process.env.SECRET_KEY;
        if (!secretKey) {
            console.error('SECRET_KEY environment variable is not set!');
            return res.status(500).json({ success: false, message: "Server configuration error" });
        }

        const tokenPayload = {
            userId: findUser._id.toString(),
            name: findUser.name,
            email: findUser.email,
            role: findUser.role,
        };

        const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '7d' });

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            token: token,
            user: {
                id: findUser._id.toString(),
                name: findUser.name,
                email: findUser.email,
                role: findUser.role,
            },
        });
    } catch (error) {
        console.error('Error during login', error);
        res.status(500).json({ error: 'Error during login' });
    }
};

const getMe = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        }
        res.status(200).json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving profile' });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie('auth_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error during logout', error);
        res.status(500).json({ error: 'Error during logout' });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

        await Token.deleteMany({ email, type: 'reset' });
        await Token.create({
            email,
            code: resetCode,
            type: 'reset',
        });

        const transporter = getTransporter();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Code',
            text: `You requested a password reset. Your reset code is: ${resetCode}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Password reset code sent to email' });
    } catch (error) {
        console.error('Error during forgot password', error);
        res.status(500).json({ error: 'Error during forgot password' });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { resetCode, newPassword } = req.body; 

        if (!resetCode || !newPassword) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const tokenDoc = await Token.findOne({ code: resetCode, type: 'reset' });

        if (tokenDoc) {
            const email = tokenDoc.email;
            await Token.deleteOne({ _id: tokenDoc._id });

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await User.updateOne({ email }, { password: hashedPassword });

            res.status(200).json({ success: true, message: 'Password reset successfully' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid or expired reset code' });
        }
    } catch (error) {
        console.error('Error during password reset', error);
        res.status(500).json({ error: 'Error during password reset' });
    }
};

export { Register, Login, logout, verify, forgotPassword, resetPassword, getMe };