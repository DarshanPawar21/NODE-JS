import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
        required: true,
    },
    date: { type: Date, required: true },
    status: {
        type: String,
        enum: ["present", "absent"],
        required: true
    }
});

export default mongoose.model("attendance", AttendanceSchema);