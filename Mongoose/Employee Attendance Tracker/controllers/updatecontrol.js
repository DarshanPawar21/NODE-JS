import StudentSchema from "../models/StudentSchema.js";
const updatestudent = async (req, res) => {
    try {
        const result = await StudentSchema.findByIdAndUpdate(req.body.id, req.body);
        if (!result) {
            return res.status(400).json({
                status: false,
                message: "Student id is required"
            });
        }
        return res.status(200).json({
            status: true,
            message: "Student data update successfully!",
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "Book Failed failed !",
            err: err.message,
        });
    }
}
export default updatestudent;