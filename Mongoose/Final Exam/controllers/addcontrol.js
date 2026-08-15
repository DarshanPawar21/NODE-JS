import Faculty from "../models/Faculty.js";
import Attendance from "../models/Attendance.js";
import bcrypt from "bcryptjs";

export const AddFaculty = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ status: false, message: "Name, email and password are required" });
    }

    const existing = await Faculty.findOne({ email });
    if (existing) {
      return res.status(400).json({ status: false, message: "Email already in use" });
    }

    const hash = await bcrypt.hash(password, 10);
    const result = await Faculty.create({ name, email, password: hash, role: role || "faculty" });

    return res.status(200).json({ status: true, message: "Faculty added successfully!", result });
  } catch (err) {
    return res.status(500).json({ status: false, message: "Faculty add failed", err: err.message });
  }
};

export const addAttendance = async (req, res) => {
  try {
    const { date, status, note } = req.body;
    if (!date || !status) {
      return res.status(400).json({ status: false, message: "Date and status are required" });
    }

    const attendanceDate = new Date(date);
    const existing = await Attendance.findOne({ faculty: req.employee.id, date: attendanceDate });
    if (existing) {
      return res.status(400).json({ status: false, message: "Attendance already marked for this date" });
    }

    const result = await Attendance.create({ faculty: req.employee.id, date: attendanceDate, status, note });
    return res.status(200).json({ status: true, message: "Attendance added successfully!", result });
  } catch (err) {
    return res.status(500).json({ status: false, message: "Attendance add failed", err: err.message });
  }
};

export const getAttendances = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const filter = { faculty: req.employee.id };

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const result = await Attendance.find(filter).sort({ date: -1 });
    return res.status(200).json({ status: true, result });
  } catch (err) {
    return res.status(500).json({ status: false, message: "Unable to fetch attendance", err: err.message });
  }
};

export const getTodayAttendance = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const result = await Attendance.findOne({ faculty: req.employee.id, date: { $gte: today, $lt: tomorrow } });
    return res.status(200).json({ status: true, result: result || null });
  } catch (err) {
    return res.status(500).json({ status: false, message: "Unable to fetch today attendance", err: err.message });
  }
};
