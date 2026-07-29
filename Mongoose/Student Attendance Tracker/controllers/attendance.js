import mongoose from "mongoose";
const attendanceSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "student", required: true },
    status: { type: String, enum: ['present', 'absent'], required: true },
})
export default mongoose.model("Attendance", attendanceSchema);