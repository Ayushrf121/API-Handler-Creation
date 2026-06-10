import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send("Welcome to the home page!");
});
const students = [];

app.post('/submit', (req, res) => {
    try {
        if (req.body.name && req.body.email && req.body.semester) {
            // so array look like this [{name: "John Doe", email: "john@example.com", semester: "1"}]
            students.push(req.body);
            res.status(200).json({
                success: true,
                message: "Student registered successfully",
                data: students
            })
        } else {
            res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error occurred while registering the student"
        })
    }
})
app.get('/get',(req,res)=>{
    try{
        if(students.length>0){
            res.status(200).json({
                success : true,
                data : students
            })
        }else{
            res.status(404).json({
                success : false,
                message : "No students found"
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : "Error occurred while fetching the students"
        })
    }
})
app.listen(5000, () => {
    console.log("Server is running on port 5000");
})