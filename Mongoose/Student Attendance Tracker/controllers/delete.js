import StudentSchema from "../models/StudentSchema.js";

const deleteStudent = async (req, res) => {
    try {
        const id = req.body;
        if (!id) {
            return res.status(400).json({
                status: false,
                message: "Student id is required"
            });
        }
        const result = await StudentSchema.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({
                status: false,
                message: "Student not found"
            });
        }
        res.status(200).json({
            status: true,
            message: "Student data deleted successfully!",
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "Student delete failed!",
            err: err.message,
        });
    }
}
export default deleteStudent;