import mongoose from 'mongoose';

const connectAuthDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database");
    } catch (error) {
        console.log("Error in connection",error);
    }
}
export default connectAuthDB;