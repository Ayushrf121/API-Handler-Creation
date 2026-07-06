// Implementing the OTP server.
import express from 'express';
import cors from 'cors';
import otpRouter from './routes/otpRoute.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', otpRouter);
app.listen(5000, () => {
    console.log("Server running on port 5000");
});