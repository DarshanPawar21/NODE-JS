import TeachersSchema from "../models/TeachersSchema";
import bcrypt from "bcrypt";
const teacher_signin = async (req, res) => {
    const {email,password} = req.body;
    const result = await TeachersSchema.findOne({email});
    if(!result){
        return res.status(400).json({
            message : "Invalid email !",
        })
    }
    const ismatch = await bcrypt.compare(password,result.password);
    if(!ismatch){
        return res.status(401).json({
            message : "invalid password !",
        })
    }  

};