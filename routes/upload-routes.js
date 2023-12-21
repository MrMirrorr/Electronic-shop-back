import express from 'express';
import imageUpload from '../middlewares/image-upload.js';
import checkAuth from '../middlewares/check-auth.js';
import * as UploadController from '../controllers/upload.js';

const router = express.Router();

router.post('/', checkAuth, imageUpload, UploadController.uploadImage);

export default router;
