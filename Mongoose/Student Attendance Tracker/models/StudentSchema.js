import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name:{type:String,required :true},
    roll:{type:Number,required :true},
    std:{type:Number,required :true},
    div:{type:String,required :true},
})
export default mongoose.model("student",StudentSchema);