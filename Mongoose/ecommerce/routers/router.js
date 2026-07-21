import { addproduct, deleteproduct, getproduct } from "../controllers/productcontrol.js";
import express from "express";
import { signup, signin } from "../controllers/usercontrol.js";
import { vadidationsignin } from "../middlewares/middelwares.js"
const router = express.Router();
router.get("/get",vadidationsignin, getproduct);
router.post("/addproduct", addproduct);
router.delete("/delete/:id", deleteproduct);


// users router

router.post("/signup", signup);
router.post("/signin",vadidationsignin, signin)
export default router;