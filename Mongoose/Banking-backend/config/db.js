const mongoose = require("mongoose");

const connectDB = () =>{
    mongoose.connect("mongodb://localhost:27017/banking");
    console.log("mongo connect successfuly !");
}
module.exports = connectDB;
