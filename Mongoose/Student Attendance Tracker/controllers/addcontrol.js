import StudentSchema from "../models/StudentSchema.js";
import TeachersSchema from "../models/TeachersSchema.js";
import jwt from "jsonwebtoken"
export const AddStudent = async (req, res) => {
    try {
        const result = await StudentSchema.create(req.body);
        return res.status(200).json({
            status: true,
            message: 'Student add Successfuly !',
            result
        })
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "Student add failed",
            err: err.message
        })
    }
};

export const AddTeacher = async (req, res) => {
    try {
        const result = await TeachersSchema.create(req.body);
        if (!result) {
            return res.status(401).json({
                status: false,
                message: "Data add failed !",
            })
        }
        return res.status(200).json({
            status: true,
            message: 'Teacher add Successfuly !',
            result
        })
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "Teacher add failed",
            err: err.message
        })
    }
}
