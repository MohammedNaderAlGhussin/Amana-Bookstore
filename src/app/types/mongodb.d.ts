import { MongoClient } from "mongodb";

declare global {
  // allow global _mongoClientPromise to exist
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export {};
