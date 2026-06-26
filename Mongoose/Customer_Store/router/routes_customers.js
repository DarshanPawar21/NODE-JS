import express from "express";
import { addcustomer, getcustomer, updatecustomer } from "../controllers/controls_customer.js";

const router = express.Router();

router.post("/customer",addcustomer);
router.get("/customer",getcustomer);
router.put("/customer",updatecustomer);

export default router;