import express from 'express';
import cors from 'cors';
import connectFileDB from './config/file_db.js'
import router from './routes/fileRoute.js';
import pdfRouter from './routes/pdfRoute.js'
import dotenv from 'dotenv';
dotenv.config();
connectFileDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth/client/',router);
app.use('/api/',pdfRouter);
// Error handler should be LAST
app.use((err, req, res, next) => {
  res.status(400).json({
    success: false,
    message: err.message
  });
});

app.listen(5000,()=>{
    console.log('listening at the port of server8.js',5000);
})
