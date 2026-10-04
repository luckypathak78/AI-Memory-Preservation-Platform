import express from "express";
import protect from "../middlewares/authMiddleware.js";
import uploadMiddleware from "../middlewares/uploadMiddleware.js";
import {
  upload,
  getAll,
} from "../controllers/memoryController.js";

const router = express.Router();

router.post(
  "/:personalityId",
  protect,
  uploadMiddleware.single("memory"),
  upload
);

router.get(
  "/:personalityId",
  protect,
  getAll
);

export default router;