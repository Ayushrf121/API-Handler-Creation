import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title:{
        type: String,
        default: null
    },
    fileName:{
        type: String
    },
    originalName:{
        type: String
    },
    size:{
        type: String
    },
    mimetype:{
        type: String
    }
});
export default mongoose.model('pdf_only_test',schema);