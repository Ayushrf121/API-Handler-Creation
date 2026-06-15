import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    username: {
        type : String,
        required : [true,"Name required"],
        minLength : 3,
        maxLength : 30
    },
     email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true,'email already exist!'],
        lowercase: true
    },
    course: {
        type: String,
        required: [true, "Course is required"]
    },
    semester: {
        type: String,
        required: [true, "Semester is required"]
    }
});
export default mongoose.model('students',studentSchema);