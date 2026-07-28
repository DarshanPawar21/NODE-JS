import mongoose from "mongoose";

const connectDB = async () =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/student");
        console.log("server connect successfuly ✔");
    }catch(err){
        console.log("server can't connect !",err);
    }
}
export default connectDB;