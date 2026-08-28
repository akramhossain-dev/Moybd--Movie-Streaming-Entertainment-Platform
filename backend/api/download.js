import express from 'express';
import { requestDownloadAuth, executeDownload } from '../controllers/download.js';
import { downloadLimiter } from '../middleware/rateLimiter.js';

const DownloadRouter = express.Router();

DownloadRouter.post('/request', downloadLimiter, requestDownloadAuth);
DownloadRouter.get('/file', executeDownload);

export default DownloadRouter;
