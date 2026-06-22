import express from "express"
import { addbook } from "../controllss/bookcontrol.js";

const router = express.Router();

router.post("/",addbook);

export default router;