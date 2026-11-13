import express from "express";
// import morgan from "morgan";
import connectDB from "./config/db.js";
import router from "./routers/router.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
const app = express();

// connect DB Funcation.
app.use(express.json());
// app.use(morgan("dev"));
app.use(cookieParser());
connectDB();

app.use("/mrchat",router);

app.listen(process.env.PORT,()=>{
    console.log("Server start successfully 📶 !");
});