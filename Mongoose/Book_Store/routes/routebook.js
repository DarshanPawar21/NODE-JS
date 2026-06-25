import express from "express"
import { addbook,getbook } from "../controllss/bookcontrol.js";

const router = express.Router();

router.post("/addbook",addbook);
router.get("/get",getbook);


export default router;