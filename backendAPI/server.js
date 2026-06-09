// since the type is module in package.json we have to use import instead of require.
import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json()); // to parse the incoming request body as JSON
const port = 5000;

app.get('/',(req,res)=>{
    res.send("Hello world!");
})
app.post('/submit',(req,res)=>{
    try {
        res.status(200).json({
            success: true,
            message: "Form submitted successfully",
            data: req.body
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occurred while submitting the form"
        });
    }      
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})