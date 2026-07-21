import auth from "../modules/userSchema.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashed = await bcrypt.hash(password, 12);
        const result = await auth.create({name, email, password: hashed })
        res.status(200).json({
            status: true,
            message: "Signup successfully !",
        })
    } catch (err) {
        res.status(400).json({
            status: true,
            message: "Signup Failed !",
            err: err.message
        })
    }
};
export const signin = async (req, res) => {
    try {
        const token = jwt.sign({email : req.body.email},"!@#$%^&*()_",{
            expiresIn:"1h",
        });
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:1000 * 60 * 60 * 1
        })
        res.status(200).json({
            status: true,
            message: "Signin successfully !",
        })
    } catch (err) {
        res.status(400).json({
            status: true,
            message: "Signup Failed !",
            err: err.message
        })
    }
}