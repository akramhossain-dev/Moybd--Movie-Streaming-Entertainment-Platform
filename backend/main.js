import './libs/polyfill.js';
import express from 'express';
import dotenv from 'dotenv';
import AuthRouter from './api/Auth.js';
import connectDB from './libs/db.js';
import MovieRouter from './api/Post.js';
import CommentsRouter from './api/Comments.js';
import Dashboardouter from './api/Dashboard.js';
import GenreRouter from './api/Genre.js';
import ContactRouter from './api/Contact.js';
import captchaRouter from './api/captcha.js';
import DownloadRouter from './api/download.js';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(express.json({ limit: '1mb' }));

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  : ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://moybd.sbs'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS request blocked: Origin not allowed'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Welcome to the homepage');
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', AuthRouter);
app.use('/api/movie', MovieRouter);
app.use('/api/comments', CommentsRouter);
app.use('/api/dashboard', Dashboardouter);
app.use('/api/genre', GenreRouter);
app.use('/api/contact', ContactRouter); 
app.use('/api/captcha', captchaRouter);
app.use('/api/download', DownloadRouter); 

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});