import express from "express";
import AddStudent from "../controllers/addcontrol.js"
import deleteStudent from "../controllers/delete.js";
const router = express.Router();

router.post("/books", AddStudent);
router.delete("/books", deleteStudent);
// router.delete("/deletestudent/:id", deleteStudent);
router.patch("/books/:id")
export default router;