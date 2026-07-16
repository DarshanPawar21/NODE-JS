import express, { json } from "express";
import router from "./routers/router.js";
import { connectDB } from "./config/db.js";

const app = express();
connectDB();
app.use(express.json());

app.use("/product",router);

app.listen(5000,()=>{
    console.log("Server start successfully 📶 !");
});