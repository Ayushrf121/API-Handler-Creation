import mongoose from 'mongoose';

const authschema = new mongoose.Schema({
    name:{
        type: String,
        required: {value:true,message:"Name is required"},
        minLength: 3,
        maxLength: 30,
    },
    email:{
        type: String,
        required: {value:true,message:"Email is required"},
        unique: true
    },
    password:{
        type: String,
        required: {value:true,message:"Password is required"}
    },
    checkbox:{
        type: Boolean,
        required: {value:true,message:"Accept the terms and conditions"}
    }   
});

export default mongoose.model('auth_client',authschema);