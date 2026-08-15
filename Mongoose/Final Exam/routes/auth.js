const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Faculty = require("../models/Faculty");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existing = await Faculty.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const faculty = await Faculty.create({ name, email, password: hashed, role: role || "faculty" });

    return res.status(201).json({ id: faculty._id, name: faculty.name, email: faculty.email, role: faculty.role });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, faculty.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: faculty._id, role: faculty.role, email: faculty.email }, 
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.json({ token, user: { id: faculty._id, name: faculty.name, email: faculty.email, role: faculty.role } });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
