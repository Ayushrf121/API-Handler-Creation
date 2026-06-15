import express from 'express';
import { createStudent,deleteStudent,getStudents, updateStudent } from "../controllers/studentController.js";

const router = express.Router();
router.post('/createStudent',createStudent);
router.get('/getStudents',getStudents);
router.delete('/deleteStudent/:id',deleteStudent);
router.put('/updateStudent/:id',updateStudent);
export default router;