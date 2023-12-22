import express from 'express';
import { checkAuth, imageUpload } from '../middlewares/index.js';
import * as UploadController from '../controllers/upload.js';

const router = express.Router();

router.post('/', checkAuth, imageUpload, UploadController.uploadImage);

export default router;
