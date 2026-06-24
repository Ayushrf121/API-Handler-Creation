import { pdfFile } from "../controllers/fileController.js";
import express from 'express';
import upload from "../middlewares/pdfMiddleware.js";
const pdfRouter = express.Router();

pdfRouter.post('/pdfUpload',upload.single('pdfFile'),pdfFile);
export default pdfRouter;