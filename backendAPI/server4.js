import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());
const port = 5000;

app.listen(port,()=>{
    console.log("listening at the port",port);
})