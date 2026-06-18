import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbname = "student-db";

const connnectDB = async () => {
    await client.connect();
    console.log("server connected...");
    return client.db(dbname);
};


const AddStudent = async () => {
    const db = await connnectDB();
    await db.collection("student").insertOne({
        name: "Darshan Pawar",
        course: "Full Stack Devloper",
        Age: 18,
    });
    console.log("Student Add successfuly !")
};

const getstudent = async () => {
    const db = await connnectDB();
    const result = await db.collection("student").find().toArray();
    console.log("getdata successfuly", result);
}

const removestudent = async () => {
    const db = await connnectDB();
    await db.collection("student").deleteOne({
        _id: new ObjectId("6a33e16aea74ad97baad687a")
    });
    console.log("students data delete successfuly !");
}

const updatestudent = async () => {
    const db = await connnectDB();
    const result = await db.collection("student").updateOne(
        { _id: new ObjectId("6a33e1cadba0621da0da491a") },
        { $set: { course: "Full stck devlopment" } });
    console.log("Data update successfuly !");
}
// AddStudent();
// getstudent();
// removestudent();
updatestudent();