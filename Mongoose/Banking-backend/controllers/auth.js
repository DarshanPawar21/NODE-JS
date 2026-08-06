const BrachSchema = require("../module/brachShema.js");
const UserSchema = require("../module/userScema.js");
const userSchema = require("../module/userScema.js");
const adminSchema = require("../module/adminSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userauth = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userSchema.findOne({ email });
        if (!result) {
            return res.status(401).json({
                message: "The user email not found !"
            });
        }
        const ismatch = await bcrypt.compare(password, result.password);
        if (!ismatch) {
            return res.status(401).json({
                message: "The password is invalid !",
            });
        }
        return res.status(200).json({
            status: true,
            message: "The user signed in successfully !",
        });
    } catch (err) {
        return res.status(500).json({
            message: "User can't sign in",
            error: err.message
        });
    }
};


const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await adminSchema.findOne({ email });

        if (!result) {
            return res.status(404).json({
                status: false,
                message: "Admin Not Found !"
            });
        }

        const ismatch = await bcrypt.compare(password, result.password);
        if (!ismatch) {
            return res.status(401).json({
                status: false,
                message: "Invalid Password !"
            });
        }
        const token = jwt.sign({
            id: result._id,
            email: result.email,
        },
            "!@#$%^&*()",
            { expiresIn: "1d" });

        res.cookie("admintoken", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        })
        return res.status(200).json({
            status: true,
            message: "Login successful",
            token: token,
            admin: {
                id: result._id,
                name: result.name,
                email: result.email
            }
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "Login failed",
            err: err.message
        });
    }
};
module.exports = { userauth, loginAdmin };