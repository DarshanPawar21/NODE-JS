import StudentSchema from "../models/StudentSchema.js";

const AddStudent = async (req,res) => {
    try{
        const result = await StudentSchema.create(req.body);
        
        return res.status(200).json({
            status:true,
            message:'Student add Successfuly !',
            result
        })
    }catch(err){
        return res.status(400).json({
            status:false,
            message:"Student add failed",
            err : err.message
        })
    }
};
export default AddStudent;