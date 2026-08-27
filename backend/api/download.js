import express from 'express';
import { requestDownloadAuth, executeDownload } from '../controllers/download.js';

const DownloadRouter = express.Router();

DownloadRouter.post('/request', requestDownloadAuth);
DownloadRouter.get('/file', executeDownload);

export default DownloadRouter;
