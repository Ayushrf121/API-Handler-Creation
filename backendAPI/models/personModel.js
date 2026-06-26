import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30
    },
    email:{
        type:String,
        required:true
    },
    email_verified:{
        type:Boolean
    },
    password:{
        type:String,
        default:null
    },
    provider:{
        type:String,
        default:'local'
    }
});
export default mongoose.model('userData',schema);