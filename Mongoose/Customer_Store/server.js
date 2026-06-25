import express, { json } from "express";
import connectDB from "./config/db.js";
import router from "./router/routes_customers.js";
const app = express();
app.use(express.json());

connectDB();

app.use("/api",router);
app.listen(5000,()=>console.log("Server Connect Successfuly ✔"));