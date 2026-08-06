import FacultySchema from "../models/FacultySchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const Faculty_signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await FacultySchema.findOne({ email });
        if (!result) {
            return res.status(400).json({
                message: "Invalid email !",
            })
        }
        const ismatch = await bcrypt.compare(password, result.password);
        if (!ismatch) {
            return res.status(401).json({
                message: "invalid password !",
            })
        }
        const token = jwt.sign({
            id: result._id,
            email: result.email,
        }, "!@#$%&()", { expiresIn: "1h" });

        res.cookie("teacher-token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 1,
        })
        return res.status(201).json({
            status:true,
            massage:"sign in succesfuly !"
        })
    }catch(err){
     return res.status(401).json({
        status:false,
        massage :"sign in failed !",
        err :err.massage
     })   
    }
};

export default Faculty_signin;