import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import database from './config/authdb.js';
import authRoute from './routes/authRoute.js';
const app = express();
dotenv.config();
database();
app.use(cors());
app.use(express.json());
app.use('/auth/client/',authRoute);
app.listen(5000,()=>{
   console.log(`Listening at the port ${5000}`);
})