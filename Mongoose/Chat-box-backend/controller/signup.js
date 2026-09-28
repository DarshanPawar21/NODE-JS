import User_signup from "../module/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();
const sign_up = async (req, res) => {
    try {
        const { name, email, phone, Password } = req.body;

        if (!name || !email || !phone || !Password) {
            return res.status(400).json({
                status: false,
                message: "All fields are required !",
            });
        }

        const hash = await bcrypt.hash(Password, 10);

        const exits_user = await User_signup.findOne({ email: email });

        if (exits_user) {
            return res.status(400).json({
                status: false,
                message: "User is already exits !"
            })
        }

        const user = await User_signup.create({
            name: name,
            email: email,
            phone: phone,
            Password: hash
        });

        const Access_token = jwt.sign(
            {
                id: user._id,
                email: user.email
            }, process.env.JWT_CODE, {
            expiresIn: "15m"
        }
        )

        const refres_token = jwt.sign(
            {
                message: "This is refres token !",
                id: user._id,
            }, process.env.JWT_CODE
        )

        res.cookie("RefreshToken", refres_token, {
            httpOnly: true,
            secure: true,
            sameSitr: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({
            status: true,
            message: "User Signup Successfully !",
            data: user,
            token: Access_token
        })

    }
    catch (err) {
        return res.status(400).json({
            status: false,
            message: "Error while signup !",
            data: err
        })
    }
};

const get_user = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized !"
            })
        }

        const decode = jwt.verify(token, process.env.JWT_CODE);

        return res.status(200).json({
            status: true,
            message: "User get successfully !",
            data: decode
        })

    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "Error while get user !",
            data: err
        })
    }
};

const refresh_token = async (req, res) => {
    try {
        const refreshToken = req.cookies.RefreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                status: false,
                message: "Refresh Token is not awalable !"
            })
        }

        const decode = jwt.verify(refreshToken, process.env.JWT_CODE)

        const access_token = jwt.sign({
            id: decode.id
        }, process.env.JWT_CODE, {
            expiresIn: "15m"
        })

        return res.status(201).json({
            status: false,
            message: "Refresh Token Auth Successfuly !",
            access_token
        })
    } catch (err) {
        return res.status(401).json({
            status: false,
            message: "Refresh Token Auth Failed !",
            err: err.message
        })
    }
}

function generateOTP(){
    return crypto.randomInt(100000,1000000).toString();
};





export { sign_up, get_user,refresh_token };