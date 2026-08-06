import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Faculty from "./models/Faculty.js";
import Attendance from "./models/Attendance.js";
import { checkFacultyAuth } from "./middleware/auth.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/attendance";
const JWT_SECRET = process.env.JWT_SECRET || "!@#$%&()";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected ✔");
  } catch (err) {
    console.log("DB connect error !", err);
  }
};

const createDefaultFaculty = async () => {
  try {
    const email = process.env.DEFAULT_FACULTY_EMAIL || "admin@company.com";
    const password = process.env.DEFAULT_FACULTY_PASSWORD || "admin123";
    const existing = await Faculty.findOne({ email });
    if (!existing) {
      const hash = await bcrypt.hash(password, 10);
      await Faculty.create({ name: "Admin", email, password: hash });
      console.log("Default faculty created:", email, "/", password);
    }
  } catch (err) {
    console.log("Default faculty setup error", err);
  }
};

connectDB().then(createDefaultFaculty);

app.get("/", (req, res) => {
  res.send("Employee Attendance API is running");
});

app.post("/faculty/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: false, message: "Email and password required !" });
    }

    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      return res.status(400).json({ status: false, message: "Invalid email !" });
    }

    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) {
      return res.status(401).json({ status: false, message: "Invalid password !" });
    }

    const token = jwt.sign({ id: faculty._id, email: faculty.email }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("faculty-token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    return res.status(200).json({ status: true, message: "Login successful !", token });
  } catch (err) {
    return res.status(500).json({ status: false, message: "Server error !" });
  }
});

app.post("/attendance/mark", checkFacultyAuth, async (req, res) => {
  try {
    const { date, status } = req.body;
    if (!date || !status) {
      return res.status(400).json({ status: false, message: "Date and status required !" });
    }

    const lowerStatus = status.toLowerCase();
    if (!["present", "absent"].includes(lowerStatus)) {
      return res.status(400).json({ status: false, message: "Status must be present or absent !" });
    }

    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    const existing = await Attendance.findOne({
      facultyId: req.faculty.id,
      date: attendanceDate,
    });
    if (existing) {
      return res.status(400).json({ status: false, message: "Attendance already marked for this date !" });
    }

    const attendance = await Attendance.create({
      facultyId: req.faculty.id,
      date: attendanceDate,
      status: lowerStatus,
    });

    return res.status(201).json({ status: true, message: "Attendance marked !", attendance });
  } catch (err) {
    return res.status(500).json({ status: false, message: "Server error !" });
  }
});

app.get("/attendance/today", checkFacultyAuth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const attendance = await Attendance.find({
      facultyId: req.faculty.id,
      date: { $gte: today, $lt: tomorrow },
    });

    return res.status(200).json({ status: true, attendance });
  } catch (err) {
    return res.status(500).json({ status: false, message: "Server error !" });
  }
});

app.get("/attendance", checkFacultyAuth, async (req, res) => {
  try {
    const { date } = req.query;
    const filter = { facultyId: req.faculty.id };

    if (date) {
      const queryDate = new Date(date);
      if (isNaN(queryDate.getTime())) {
        return res.status(400).json({ status: false, message: "Invalid date format ! Use YYYY-MM-DD" });
      }
      queryDate.setHours(0, 0, 0, 0);
      const nextDate = new Date(queryDate);
      nextDate.setDate(nextDate.getDate() + 1);
      filter.date = { $gte: queryDate, $lt: nextDate };
    }

    const attendance = await Attendance.find(filter).sort({ date: -1 });
    return res.status(200).json({ status: true, attendance });
  } catch (err) {
    return res.status(500).json({ status: false, message: "Server error !" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started successfully on port ${PORT} 📶`);
});
