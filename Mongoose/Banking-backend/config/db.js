const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect("mongodb://darshan-dev:ZIDAynLTg9H5qa5K@ac-mhn9quu-shard-00-00.8ja7u8v.mongodb.net:27017,ac-mhn9quu-shard-00-01.8ja7u8v.mongodb.net:27017,ac-mhn9quu-shard-00-02.8ja7u8v.mongodb.net:27017/Banking?ssl=true&replicaSet=atlas-js5qif-shard-0&authSource=admin&appName=Cluster0");
    console.log("mongo connect successfuly !");
}
module.exports = connectDB;
