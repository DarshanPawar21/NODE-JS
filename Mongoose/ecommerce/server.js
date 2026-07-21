import express, { json } from "express";
import router from "./routers/router.js";
import { connectDB } from "./config/db.js";
import cors from "cors"
const app = express();
connectDB();
app.use(
    cors({
        origin:"http://localhost:5173",
        Credentials : true,
    })
)
// app.use(cors());
app.use(express.json());

app.use("/product",router);

app.listen(5000,()=>{
    console.log("Server start successfully 📶 !");
});