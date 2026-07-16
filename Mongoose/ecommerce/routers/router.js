import { addproduct, getproduct } from "../controllers/productcontrol.js";
import express from "express";

const router = express.Router();
router.get("/get", getproduct);
router.post("/addproduct",addproduct)

export default router;