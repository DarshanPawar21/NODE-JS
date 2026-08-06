import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["present", "absent"], required: true },
});

export default mongoose.model("Attendance", AttendanceSchema);
