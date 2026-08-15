import express from "express";
import { addAttendance, AddFaculty, getAttendances, getTodayAttendance } from "../controllers/addcontrol.js";
import { checkemployeeAuth } from "../middleware/auth.js";
import teacher_signin from "../controllers/signin.js";
import deleteFaculty from "../controllers/delete.js";
import updateFaculty from "../controllers/updatecontrol.js";

const router = express.Router();

router.post("/addfaculty", AddFaculty);
router.post("/signin", teacher_signin);
router.delete("/faculty", deleteFaculty);
router.patch("/faculty/:id", updateFaculty);
router.post("/addattendance", checkemployeeAuth, addAttendance);
router.get("/attendance", checkemployeeAuth, getAttendances);
router.get("/today", checkemployeeAuth, getTodayAttendance);

export default router;
