import express from "express";
import { sign_up,get_user,refresh_token } from "../controller/signup.js";
const router = express.Router();


router.post("/auth/signup",sign_up);
router.get("/auth/get_user",get_user);
router.get("/auth/refresh-token",refresh_token);
export default router;