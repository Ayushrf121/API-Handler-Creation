import express from 'express';
import addData from '../controllers/userController.js';
const router = express.Router();

router.post('/submit',addData);

export default router;