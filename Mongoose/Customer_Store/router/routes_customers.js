import express from "express";
import { addcustomer } from "../controllers/controls_customer.js";

const router = express.Router();

router.post("/add",addcustomer);

export default router;