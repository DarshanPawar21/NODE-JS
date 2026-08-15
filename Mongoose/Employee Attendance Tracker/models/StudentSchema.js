import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    name:{type:String,required :true},
   emp_no :{type:String,required:true}
})
export default mongoose.model("student",StudentSchema);