import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import personalityRoutes from "./routes/personalityRoutes.js";
import memoryRoutes from "./routes/memoryRoutes.js";
import trainingRoutes from "./routes/trainingRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

/*Security Middleware*/
app.use(helmet());

/*CORS Configuration*/
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

/*Body Parser*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*Rate Limiter*/
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use(limiter);

/* Health Check Route*/
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Memory Preservation Backend is running.",
    version: "1.0.0",
  });
});

/*API Routes*/
app.use("/api/auth", authRoutes);
app.use("/api/personalities", personalityRoutes);
app.use("/api/memories", memoryRoutes);
app.use("/api/train", trainingRoutes);
app.use("/api/chat", chatRoutes);

/* 404 Route */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* Global Error Handler*/
app.use(errorHandler);

export default app;
