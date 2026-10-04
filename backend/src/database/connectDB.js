import mongoose from "mongoose";
import config from "../config/appConfig.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);

    process.exit(1);
  }
};

export default connectDB;