import express from "express";
import { addAttendance, AddFaculty, datewiseattendance } from "../controllers/addcontrol.js";
import checkFacultyAuth from "../middleware/auth.js";
import Faculty_signin from "../controllers/signin.js";

const router = express.Router();

router.post("/add", addAttendance);
router.post("/addfaculty", AddFaculty);
router.post("/signin",checkFacultyAuth, Faculty_signin);
router.get("/getdata", datewiseattendance);

export default router;
