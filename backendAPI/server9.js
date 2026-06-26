import express from 'express';
import cors from 'cors';
import {connectDB} from './config/mergeQuesdb.js';
import dotenv from 'dotenv';
import authRouter from './routes/clientRoute.js';
dotenv.config();
connectDB()
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/client/',authRouter);
app.listen(5000,()=>{
    console.log(`Listening at the port ${5000}`);
})