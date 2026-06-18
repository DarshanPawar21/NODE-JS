import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbname = "student-db";

const connnectDB = async()=>{
   await client.connect();
   console.log("server connected...");
   return client.db(dbname);
};


const AddStudent = async () =>{
    const db =  await connnectDB();
    await db.collection("student").insertOne({
        name:"Darshan Pawar",
        course : "Full Stack Devloper",
        Age:18,
    });
    console.log("Student Add successfuly !")
};

AddStudent();