import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

let gridFSBucket;

const initializeGridFS = () => {
  const db = mongoose.connection.db;

  if (!db) {
    throw new Error("MongoDB connection is not ready.");
  }

  gridFSBucket = new GridFSBucket(db, {
    bucketName: "memoryFiles",
  });

  console.log("✅ GridFS initialized");
};

const getGridFSBucket = () => {
  if (!gridFSBucket) {
    throw new Error("GridFS is not initialized.");
  }

  return gridFSBucket;
};

export {
  initializeGridFS,
  getGridFSBucket,
};