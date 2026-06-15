import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import studentRoute from './routes/studentRoute.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
connectDB();
const port = 5000;

app.use('/api/students/',studentRoute);

app.listen(port,()=>{
    console.log("listening at the port",port);
})