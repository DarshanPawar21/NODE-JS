import {connectDB} from "./server.js"

const adduser =  async ()=>{
    const db = await connectDB();
    const result = await db.collection("users").insertOne({
        name:"darshan",
        age:"18",
    });
    console.log("user aa gaya",result);
};
adduser();