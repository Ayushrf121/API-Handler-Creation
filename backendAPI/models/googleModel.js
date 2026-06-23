import mongoose, { mongo } from 'mongoose';

const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    email_verified:{
        type:Boolean,
        required:true
    },
    picture:{
        type:String,
        required:true
    },sub:{
        type:String,
        required:true
    }
});
export default mongoose.model('google_user_collection',schema);