import { googleAuth,signup,login, profile, fileUploadController } from "../controllers/clientController.js";
import express from 'express';
import upload from '../middlewares/filesUpload.js';
import clientMiddleware from "../middlewares/clientMiddleware.js";

const authRouter = express.Router();

authRouter.post('/signup',signup);
authRouter.post('/googleAuth',googleAuth);
authRouter.post('/login',login);
authRouter.get('/profile',clientMiddleware,profile);
authRouter.post('/upload',upload.single('file'),fileUploadController);
export default authRouter;