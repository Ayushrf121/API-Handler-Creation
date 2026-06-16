import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import empRoutes from './routes/empRoutes.js';
import connectDatabase from './config/db2.js';
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
connectDatabase();
app.use('/api/employees',empRoutes);
app.listen(5000,()=>{
    console.log(`Listening at the port ${5000}`);
})