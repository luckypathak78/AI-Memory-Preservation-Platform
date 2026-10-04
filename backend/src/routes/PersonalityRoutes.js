import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  create,
  getAll,
  getPersonality,
} from "../controllers/personalityController.js";

const router = express.Router();

router.post("/", protect, create);

router.get("/", protect, getAll);

router.get("/:id", protect, getPersonality);

export default router;
