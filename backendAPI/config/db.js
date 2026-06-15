import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to Database");
    } catch (error) {
        console.log("Error in creating database ", error);
    }
}
export default connectDB;