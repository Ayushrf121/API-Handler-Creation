import mongoose from "mongoose";

const schema = new mongoose.Schema({
    empName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    pNo:{
        type: String,
        required: true,
        minLength: 10,
        minLength: 10,
    }
})

export default mongoose.model('employee',schema);