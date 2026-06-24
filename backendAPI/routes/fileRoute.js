import { uploadFile } from "../controllers/fileController.js";
import upload from '../middlewares/upload.js';
import express from 'express';

const router = express.Router();
router.post('/fileUpload',upload.single('file'),uploadFile);

export default router;