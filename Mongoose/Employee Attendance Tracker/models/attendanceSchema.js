import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
    FacultyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["present", "absent"],
        required: true
    }
});

export default mongoose.model("attendance", AttendanceSchema);