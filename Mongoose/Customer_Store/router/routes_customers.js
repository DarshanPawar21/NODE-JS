import express from "express";
import { addcustomer, getcustomer, updatecustomer,getbyid, putbyid } from "../controllers/controls_customer.js";

const router = express.Router();

router.post("/customer",addcustomer);
router.get("/customer",getcustomer);
router.put("/customer",updatecustomer);
router.get("/customer/:id",getbyid);
router.put("/customer/:id",putbyid);

export default router;