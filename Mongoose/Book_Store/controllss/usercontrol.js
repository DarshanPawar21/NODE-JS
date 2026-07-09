import user from "../models/usermodel.js";

export const adduser = async(req,res) =>{
    try{
        const resulr = await user.create(req.body);
        res.status(201).json({
            status:true,
            message:"User insert successfuly !",
            resulr,
        })
    }
    catch(err){ 
        res.status(500).json({
            status:false,
            message:"Error occurred while inserting user !",
            err:err.message,
        })
    }
};