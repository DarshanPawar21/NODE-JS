import nodemailer from 'nodemailer';
import otpSchema from '../module/otpSchema.js';
import bcrypt from "bcrypt";
import adminSchema from '../module/adminSchema';
const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "darshan21dev@gmail.com",
        pass: ""
    }
});


export const sentotp = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const expireAt = new Date(Date.now() + 5 * 60 * 1000);
        await otpSchema.create({ email, otp, expireAt: expireAt });
        await transport.sendMail({
            from: `"OTP Service" <darshan21dev@gmail.com>`,
            to: email,
            subject: "Your Verification OTP",
            text: `Aapka OTP code hai: ${otp}. Ye code 5 minute me expire ho jayega.`,
        })
        return res.status(200).json({ message: "OTP sent successfully" });
    } catch (err) {
        return res.status(500).json({ error: "OTP bhejne me problem hui", err });
    }
}

export const Verifyotp = async (req, res) => {
    try {
        const { otp, email, newpassord } = req.body;
        const exitotp = await otpSchema.findOne({ email, otp });
        if (!exitotp) {
            return res.status(400).json({ error: "Invalid OTP" });
        }
        const newpassword = bcrypt.hashSync(newpassord, 12)
        const updateadmin = await adminSchema.findOneAndUpdate(
            { email },
            { password: newpassord }
        );
        if (!updatedTeacher) {
            return res.status(400).json({ error: "User not found" });
        }
        return res.status(200).json({ message: "OTP verified successfully" });
    } catch (err) {
        return res.status(500).json({ error: "OTP verify karne me problem hui", err });
    }
}
