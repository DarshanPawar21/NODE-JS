import express from "express";
import connectDB from "./confit/db.js";
import router from "./routes/routebook.js";

const app = express();

app.use(express.json());

connectDB();

app.use("/api",router);

app.listen(3000,()=>{
    console.log("Server is connnect succesfuly !");
})