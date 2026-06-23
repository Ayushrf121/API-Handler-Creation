import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectAuthDB from './config/googleAuthdb.js';
import googleRoute from './routes/googleRoute.js';
const app = express();
dotenv.config();
connectAuthDB();
app.use(cors());
app.use(express.json());
app.use('/auth/client/',googleRoute);
app.listen(5000,()=>{
   console.log(`Listening at the port ${5000}`);
})