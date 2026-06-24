import mongoose from "mongoose";
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    originalName: String,
    fileName: String,
    filePath: String,
    size: Number
})
export default mongoose.model('user_file',schema);