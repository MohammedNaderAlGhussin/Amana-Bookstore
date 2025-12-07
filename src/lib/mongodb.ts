// /src/lib/mongodb.ts
import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI;

// Explicitly type options
const options: MongoClientOptions = {};

if (!uri) {
  throw new Error("Missing MONGODB_URI in environment variables");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // Ensures TypeScript recognizes the global variable for hot reload
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  // Reuse global connection during development
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Create new connection for production (Vercel)
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
