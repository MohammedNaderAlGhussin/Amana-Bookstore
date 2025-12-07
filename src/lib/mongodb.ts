import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!uri) {
  throw new Error("Missing MONGODB_URI in .env");
}

if (process.env.NODE_ENV === "development") {
  // reuse connection in dev to avoid hot reload issues
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // fresh connection in production (Vercel)
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
