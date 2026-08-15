// const app = require("./src/app.js");
const connectDB = require("./config/db.js")
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./router/router.js")
const app = express()

connectDB();

app.use(cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/banking", router);



app.listen(3000, () => {
    console.log("server is started !");
})

