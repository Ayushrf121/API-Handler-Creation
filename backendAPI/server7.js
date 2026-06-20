import express from 'express';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth/client/',userRoute);
app.listen(5000,()=>{
    console.log('listening at the port',5000);
})