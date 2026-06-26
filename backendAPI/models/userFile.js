import mongoose from "mongoose";

const schema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    Filename:{
        type:String,
        required:true
    },
    Originalname:{
        type:String,
        required:true
    },
    Path:{
        type:String,
        required:true
    },
    Size:{
        type:String,
        required:true
    },
    FileType:{
        type:String,
        required:true
    }
});

export default mongoose.model('user_files',schema);