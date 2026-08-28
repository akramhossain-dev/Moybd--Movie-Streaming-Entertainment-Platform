import express from 'express';
import { newComment, updateComment, deleteComment, getPublishedComments, getDraftComments, all} from '../controllers/Comments.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const CommentsRouter = express.Router();

CommentsRouter.post('/new', verifyToken, newComment);
CommentsRouter.put('/update/:id', verifyToken, updateComment);
CommentsRouter.delete('/delete/:id', verifyToken, deleteComment);
CommentsRouter.get('/published', getPublishedComments);
CommentsRouter.get('/draft', verifyToken, verifyAdmin, getDraftComments);
CommentsRouter.get('/all', verifyToken, verifyAdmin, all);

export default CommentsRouter;

