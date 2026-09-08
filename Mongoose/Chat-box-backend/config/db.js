import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://dp7878038_db_user:UBzZ71aaU1jNPXIm@ac-smtoztv-shard-00-00.ibme9sm.mongodb.net:27017,ac-smtoztv-shard-00-01.ibme9sm.mongodb.net:27017,ac-smtoztv-shard-00-02.ibme9sm.mongodb.net:27017/?ssl=true&replicaSet=atlas-12xcyt-shard-0&authSource=admin&appName=Cluster0");
        console.log("MongoDB Server Connnect !");
    }catch(err){
        console.log("MongoDB is not connect !",err);
    }
}
export default connectDB;
