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
// import router from './api/download.js';
import cors from 'cors';

dotenv.config();

console.log('MONGODB_URI:', process.env.MONGODB_URI);

const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(express.json());

const corsOptions = {
  origin: true,
  credentials: true
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Welcome to the homepage');
});

app.use('/api/auth', AuthRouter);
app.use('/api/movie', MovieRouter);
app.use('/api/comments', CommentsRouter);
app.use('/api/dashboard', Dashboardouter);
app.use('/api/genre', GenreRouter);
app.use('/api/contact', ContactRouter); 
app.use('/api/captcha', captchaRouter);
// app.use('/api/download', router); 

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});