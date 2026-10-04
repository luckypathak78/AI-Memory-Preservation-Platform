import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 5000,

  nodeEnv: process.env.NODE_ENV || "development",

  mongoURI: process.env.MONGODB_URI || "",

  jwtSecret: process.env.JWT_SECRET || "",
};

export default config;