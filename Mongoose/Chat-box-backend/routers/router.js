import express from "express";
import { signup, get_me, refresh_token } from "../controller/signup.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/mruser", get_me);
router.get("/refresh-token", refresh_token);


export default router;