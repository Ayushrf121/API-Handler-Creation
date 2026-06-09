import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
app.get('/home',(req,res)=>{
    res.send("Welcome to the home page!");
})

app.post('/submit',(req,res)=>{
    try{
        if(req.body.username && req.body.email && req.body.password){
            res.status(200).json({
            success : true,
            message : "User registered successfully"
        })}else{
            res.status(400).json({
                success : false,
                message : "All fields are required"
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : "Error occurred while registering the user"
        })
    }
})
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})