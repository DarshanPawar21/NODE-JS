import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import router from './routers/router.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/employee", router);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server start successfuly 📶`);
});