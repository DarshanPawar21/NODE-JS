import mongoose, { Types } from "mongoose";
const book_Schema = new mongoose.Schema(
    {
        title:{type:String,required:true},
        author:{type:String,required:true},
    },
    {
        timestamps:true
    },
);
export default mongoose.model("Book",book_Schema);