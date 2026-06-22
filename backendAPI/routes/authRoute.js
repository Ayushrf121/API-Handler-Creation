import { signup,login,profile, googleSignup, googleLogin } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import express from 'express';

const router = express.Router();
router.post('/signup',signup);
router.post('/login',login);
router.post('/google/signup',googleSignup);
router.post('/google/login',googleLogin);
router.get('/profile',authMiddleware,profile);
export default router;