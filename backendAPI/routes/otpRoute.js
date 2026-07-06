import express from 'express';
import { generateOTP,verifyOTP } from '../controllers/userOTPController.js';

const router = express.Router();

router.post('/send-otp',generateOTP);
router.post('/verify-otp',verifyOTP);
console.log("OTP route is working fine");
export default router;