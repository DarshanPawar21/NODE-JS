import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import router from './routers/router.js';


const app = express();
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/student", router);

app.listen(2000,()=>{
    console.log("Server start successfuly 📶");
})