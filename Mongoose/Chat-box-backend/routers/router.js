import express from "express";
import { sign_up } from "../controller/signup.js";
const router = express.Router();


router.post("/signup",sign_up);

export default router;