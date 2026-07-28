import express from "express";
import AddStudent from "../controllers/addcontrol.js"

const router = express.Router();

router.post("/addstudent",AddStudent)

export default router;