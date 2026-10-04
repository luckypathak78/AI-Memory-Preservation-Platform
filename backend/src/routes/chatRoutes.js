import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  chat,
  getHistory,
  removeMessage,
} from "../controllers/chatController.js";

const router = express.Router();

// Send message
router.post("/", authMiddleware, chat);

// Get previous messages
router.get("/:personalityId", authMiddleware, getHistory);

// Delete a message
router.delete("/:chatId/message/:messageId", authMiddleware,removeMessage);
export default router;