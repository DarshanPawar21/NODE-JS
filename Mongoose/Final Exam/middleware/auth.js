import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const checkFacultyAuth = (req, res, next) => {
  const token = req.cookies["faculty-token"] || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ status: false, message: "Unauthorized access !" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "!@#$%&()");
    req.faculty = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ status: false, message: "Invalid token !" });
  }
};
