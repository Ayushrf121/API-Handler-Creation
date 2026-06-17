import { createEmployee,getEmployee,removeEmployee,updateEmployee } from "../controllers/empController.js";
import express from 'express';
const router = express.Router();

router.post('/setDetails',createEmployee);
router.get('/getDetails',getEmployee);
router.put('/updateEmployee/:id',updateEmployee);
router.delete('/removeEmp/:id',removeEmployee)
export default router;