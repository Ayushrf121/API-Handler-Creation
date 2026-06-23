import express from 'express';
import {googleController} from '../controllers/googleController.js'
const router = express.Router();
router.post('/getCredential',googleController);
export default router;