import auth from "../modules/userSchema.js";
import bcrypt from "bcrypt";
export const vadidationsignin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await auth.findOne({ email });
        if (!result) {
            res.status(404).json({
                status: false,
                message: "User Are NOt Found !"
            })
        }
        const ans = await bcrypt.compare(password, result.password);
        if (!ans) {
            res.status(404).json({
                status: false,
                message: "Password is wrong !"
            })
        }
        next();
    } catch (err) {
        res.status(400).json({
            status: true,
            message: "Signup Failed !",
            err: err.message
        })
    }
};