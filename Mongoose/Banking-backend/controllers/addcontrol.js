const adminSchema = require("../module/adminSchema.js");
const addadmin = async (req,res) =>{
    try{
        const {name,email,password} = req.body;
        const result = await adminSchema.create(req.body);
        res.status(200).json({
            status:true,
            message:"admin add successfuly !",
            result
        })
    }catch(err){
        res.status(400).json({
            status:false,
            message:"admin add failed successfuly !",
            err : err.message
        })
    }
};
module.exports = addadmin;