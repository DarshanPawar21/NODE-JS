import mongoose from "mongoose";

const connectDB = async (req,res) =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/customer_store");
        console.log("MongoDB Connected 📶")
    }
    catch(err){
        console.log("MongoDB Connection Failed 👾");
    }
}

export default connectDB;