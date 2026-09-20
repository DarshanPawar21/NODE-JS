import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Server Connnect !");
    }catch(err){
        console.log("MongoDB is not connect !",err);
    }
}
export default connectDB;
