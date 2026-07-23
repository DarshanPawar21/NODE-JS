// const app = require("./src/app.js");
const connectDB = require("./config/db.js")
const express = require("express");
const router = require("./router/router.js")
const app = express()

connectDB();


app.use(express.json());
app.use("/banking",router);



app.listen(3000, () => {
    console.log("server is started !");
})

