import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { train } from "../controllers/trainingController.js";

const router = express.Router();

router.post("/:memoryId", protect, train);

export default router;