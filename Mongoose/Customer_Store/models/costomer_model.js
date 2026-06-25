import mongoose from "mongoose";
const customerSchema = new mongoose.Schema(
    {
        name:{type:String, require:true},
        email:{type:String,require:true}
    },
    {timestamps: true}
);

export default mongoose.model("Customer",customerSchema);