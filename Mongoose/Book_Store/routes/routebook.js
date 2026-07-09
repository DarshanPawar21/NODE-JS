import express from "express"
import { addbook, deletebook, getbook, updatebook } from "../controllss/bookcontrol.js";
import { adduser } from "../controllss/usercontrol.js";
const router = express.Router();

router.post("/addbook", addbook);
router.get("/get", getbook);
router.put("/update", updatebook);
router.delete("/delete/:id",deletebook);
router.post("/adduser", adduser);

export default router;