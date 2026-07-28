import express, { json } from 'express';
import connectDB from './config/db.js';
import router from './routers/router.js';


const app = express();
app.use(express.json());

connectDB();

app.use("/student", router);

app.listen(2000,()=>{
    console.log("Server start successfuly 📶");
})