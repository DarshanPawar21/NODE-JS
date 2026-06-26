import express from "express";
import { addcustomer, getcustomer, updatecustomer,getbyid } from "../controllers/controls_customer.js";

const router = express.Router();

router.post("/customer",addcustomer);
router.get("/customer",getcustomer);
router.put("/customer",updatecustomer);
router.get("/customer/:id",getbyid)
export default router;