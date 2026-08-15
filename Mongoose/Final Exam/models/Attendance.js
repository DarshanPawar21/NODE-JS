import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
  {
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ["present", "absent"], required: true },
    note: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

AttendanceSchema.index({ faculty: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", AttendanceSchema);
