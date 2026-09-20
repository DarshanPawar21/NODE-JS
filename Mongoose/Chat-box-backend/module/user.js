import mongoose from "mongoose";


const user_signup = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
});

export default mongoose.model("user_signup",user_signup);