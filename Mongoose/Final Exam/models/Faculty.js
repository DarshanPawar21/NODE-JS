import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["faculty", "employee"], default: "faculty" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Faculty", FacultySchema);
