import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import otpSchema from '../models/otpSchema.js';
import teachrSchema from '../models/FacultySchema.js';
// import otpSchema from '../models/otpSchema.js';
const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "dp7878038@gmail.com",
        pass: "rmmb ojhs vwuf ycpc"
    }
});

export const sendotp = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const expireAt = new Date(Date.now() + 5 * 60 * 1000);
        await otpSchema.create({ email, otp, expiresAt: expireAt });
        await transport.sendMail({
            from: `"OTP Service" <dp7878038@gmail.com>`,
            to: email,
            subject: "Your Verification OTP",
            text: `Aapka OTP code hai: ${otp}. Ye code 5 minute me expire ho jayega.`
        })
        return res.status(200).json({ message: "OTP sent successfully" });
    } catch (err) {
        return res.status(500).json({ error: "OTP bhejne me problem hui", err });
    }
};

export const verifyotp = async (req, res) => {
    try {
        const { otp, email, newpassword } = req.body;

        const exitotp = await otpSchema.findOne({ email, otp });
        if (!exitotp) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        const newpasss = bcrypt.hashSync(newpassword, 10);
        const updatedTeacher = await teachrSchema.findOneAndUpdate(
            { email },
            { password: newpasss }
        );

        if (!updatedTeacher) {
            return res.status(400).json({ error: "User not found" });
        }

        // await otpSchema.deleteOne({ _id: exitotp._id });
        return res.status(200).json({ message: "OTP verified successfully" });
    } catch (err) {
        return res.status(500).json({ error: "OTP verify karne me problem hui", err });
    }
}