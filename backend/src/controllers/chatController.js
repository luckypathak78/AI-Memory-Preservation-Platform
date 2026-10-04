import chatWithPersonality from "../services/chatService.js";
import {
  getChatHistory,
  deleteMessage,
} from "../services/chatHistoryService.js";

const chat = async (req, res) => {
  try {
    const { personalityId, message } = req.body;

    const result = await chatWithPersonality(
      personalityId,
      req.user._id,
      message
    );

    res.json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getHistory = async (req, res) => {
  try {
    const { personalityId } = req.params;

    const history = await getChatHistory(
      req.user._id,
      personalityId
    );

    res.json({
      success: true,
      chatId: history.chatId,
      messages: history.messages,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const removeMessage = async (req, res) => {
  try {
    const result = await deleteMessage(
      req.params.chatId,
      req.params.messageId,
      req.user._id
    );

    res.json(result);
  } catch (error) {
    console.error("CHAT ERROR:", error);
    res.status(400).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

export {
  chat,
  getHistory,
  removeMessage,
};
