import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/bookstore/books");
        console.log("MongoDB Server Connnect !");
    }catch(err){
        console.log("MongoDB is not connect !",err);
    }
}
export default connectDB;