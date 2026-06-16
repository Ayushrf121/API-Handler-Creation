import { createEmployee,getEmployee } from "../controllers/empController.js";
import express from 'express';
const router = express.Router();

router.post('/setDetails',createEmployee);
router.get('/getDetails',getEmployee);
export default router;