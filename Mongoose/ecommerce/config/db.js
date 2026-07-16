import mongoose from "mongoose";

export const connectDB = async () =>{
    try{
        mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
        console.log("Mongodb Connect Successfuly ✔");
    }catch(err){
        console.log(err);
    }
};