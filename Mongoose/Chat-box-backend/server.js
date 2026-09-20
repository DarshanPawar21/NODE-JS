import express from "express";
import connectDB from "./config/db.js";
import router from "./routers/router.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

// connect DB Funcation.
app.use(express.json());
connectDB();

app.use("/api",router);

app.listen(process.env.PORT,()=>{
    console.log("Server start successfully 📶 !");
});