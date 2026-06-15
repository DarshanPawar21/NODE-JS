import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";   // MongoDB connection URL
const client = new MongoClient(url);
const dbName = "mydb";                     // Database name

export const connectDB = async () => {
  await client.connect();                // connect to MongoDB
  console.log("MongoDB Connected...");
  return client.db(dbName);              // return db reference
};

connectDB();