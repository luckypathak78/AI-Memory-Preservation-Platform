import app from "./app.js";
import config from "./config/appConfig.js";
import connectDB from "./database/connectDB.js";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(config.port, () => {
      console.log(`
========================================
🚀 AI Memory Preservation Backend Started
🌐 Server: http://localhost:${config.port}
🌍 Environment: ${config.nodeEnv}
========================================
`);
    });
  } catch (error) {
    console.error("Failed to start server");
    console.error(error);
    process.exit(1);
  }
};

startServer();
