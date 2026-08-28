import express from 'express';
import {NewPost, GetPost, UpdatePost, deletePost } from '../controllers/Post.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const MovieRouter = express.Router();

MovieRouter.post('/post', verifyToken, verifyAdmin, NewPost);
MovieRouter.get('/:id', GetPost);
MovieRouter.put('/:id', verifyToken, verifyAdmin, UpdatePost);
MovieRouter.delete('/:id', verifyToken, verifyAdmin, deletePost);

export default MovieRouter;