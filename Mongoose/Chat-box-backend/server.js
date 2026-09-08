import mongoose from "mongoose";
import express from "express";
import connectDB from "./config/db.js";

const app = express();
connectDB();
app.use(express.json());
// app.use(
//     cors({

//     })
// )

// app.use("/chat",router);

app.listen(5000,()=>{
    console.log("Server start successfully 📶 !");
});