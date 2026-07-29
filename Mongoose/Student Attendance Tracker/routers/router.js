import express from "express";
import { AddStudent, AddTeacher } from "../controllers/addcontrol.js";
import deleteStudent from "../controllers/delete.js";
import updateStudent from "../controllers/updatecontrol.js";
import Attendance from "../controllers/attendance.js";
const router = express.Router();

router.post("/books", AddStudent);
router.post("/teachers", AddTeacher);
router.delete("/books", deleteStudent);
// router.delete("/deletestudent/:id", deleteStudent);
router.patch("/books/:id", updateStudent);
router.post("/attedance", Attendance);
router.post("/addteacher",AddTeacher);
export default router;