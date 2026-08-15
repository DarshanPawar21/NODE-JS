const express = require("express");
const auth = require("../middleware/auth");
const Attendance = require("../models/Attendance");

const router = express.Router();

router.use(auth);

router.post("/mark", async (req, res) => {
  try {
    const { date, status, note } = req.body;
    if (!date || !status) {
      return res.status(400).json({ message: "Date and status are required" });
    }

    const attendanceDate = new Date(date);
    const existing = await Attendance.findOne({ faculty: req.user.userId, date: attendanceDate });
    if (existing) {
      return res.status(400).json({ message: "Attendance already marked for this date" });
    }

    const attendance = await Attendance.create({
      faculty: req.user.userId,
      date: attendanceDate,
      status,
      note,
    });

    return res.status(201).json(attendance);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const filter = { faculty: req.user.userId };

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const records = await Attendance.find(filter).sort({ date: -1 });
    return res.json(records);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/today", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const attendance = await Attendance.findOne({
      faculty: req.user.userId,
      date: { $gte: today, $lt: tomorrow },
    });

    return res.json(attendance || null);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
