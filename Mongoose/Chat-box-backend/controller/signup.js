import user_signup from "../module/user.js";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import user from "../module/user.js";
dotenv.config();


// User SignUP Code with create real token.
export const signup = async (req, res) => {
    const { username, email, phone, password } = req.body;

    const isareadyuser = await user_signup.findOne({ email });

    if (isareadyuser) {
        return res.status(401).json({
            status: false,
            message: "This User is All ready Exist !"
        })
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const users = await user_signup.create({
        name: username,
        email: email,
        phone: phone,
        password: hashpassword
    });

    const token = jwt.sign({
        id: users._id
    }, process.env.JWT_CODE, {
        expiresIn: "1h"
    });

    const refresh_token = jwt.sign({
        id: users._id
    }, process.env.JWT_CODE, {
        expiresIn: "7d"
    });

    res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        sucure: true,
        sameSide: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.status(201).json({
        status: true,
        message: "The user Sign-Up successfuly !",
        token
    });
};

// user login and identifive code with jwt verify.

export const get_me = async (req, res) => {
    try {
        const authHeader = req.headers.authorization?.split(" ")[1];

        if (!authHeader) {
            return res.status(401).json({
                status: false,
                meassge: "Token is not found !"
            })
        }

        const identifive = jwt.verify(authHeader, process.env.JWT_CODE);

        const user = await user_signup.findById(identifive.id);

        if (!user) {
            return res.status(401).json({
                status: false,
                meassge: "Token is not found !"
            })
        }

        return res.status(201).json({
            status: true,
            meassge: "Well come !",
            user
        })
    } catch (error) {
        return res.status(401).json({
            status: false,
            message: error.meassge
        })
    }
};

export const refresh_token = (req, res) => {
    try {
        const Refresh_token = req.cookies.refresh_token;

        if (!Refresh_token) {
            return res.status(401).json({
                status: false,
                message: "Refresh Token NOt foulded !"
            })
        }

        const decode = jwt.verify(Refresh_token, process.env.JWT_CODE);

        const access_token = jwt.sign({
            id: decode.id
        }, process.env.JWT_CODE, {
            expiresIn: "15m"
        });

        return  res.status(201).json({
        status: true,
        message: "The user Sign-Up successfuly !",
        access_token
    });

    } catch (err) {
        return res.status(401).json({
            status: false,
            message: err.message
        })
    }


}