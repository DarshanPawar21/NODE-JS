import express from "express"
import { addbook, deletebook, getbook, updatebook } from "../controllss/bookcontrol.js";

const router = express.Router();

router.post("/addbook", addbook);
router.get("/get", getbook);
router.put("/update", updatebook);
router.delete("/delete",deletebook);

export default router;