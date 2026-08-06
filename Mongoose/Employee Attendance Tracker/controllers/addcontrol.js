import AttendanceSchema from "../models/attendanceSchema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import FacultySchema from "../models/FacultySchema.js";

export const AddFaculty = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hash = await bcrypt.hash(password, 12);
        const result = await FacultySchema.create({
            name,
            email,
            password: hash
        });

        if (!result) {
            return res.status(401).json({
                status: false,
                message: "Data add failed !"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Faculty add successfully !",
            result
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "Faculty add failed",
            err: err.message
        });
    }
};

export const addAttendance = async (req, res) => {
    try {
        const { email, status } = req.body;

        if (!email) {
            return res.status(400).json({
                status: false,
                message: "Email and status are required"
            });
        }

        const faculty = await FacultySchema.findOne({ email });
        if (!faculty) {
            return res.status(404).json({
                status: false,
                message: "Email not found !"
            });
        }

        const today = new Date();
        const result = await AttendanceSchema.create({
            FacultyId: faculty._id,
            email: faculty.email,
            date: today,
            status
        });

        return res.status(200).json({
            status: true,
            message: "Attendance add successfully !",
            result
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "Attendance add failed",
            err: err.message
        });
    }
};

export const datewiseattendance = async (req, res,) => {
    try {
        const { date } = req.body;
        const result = await AttendanceSchema.find(data);
        if (!date) {
            return res.status(404).json({
                status: false,
                messege: "date not found !"
            })
        }
        return res.status(201).json({
            status :true,
            message:"Data Fetch Successfuly !"
        })
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "Data found failed !",
            err: err.message
        });
    }
}