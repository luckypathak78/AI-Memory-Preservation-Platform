import Personality from "../models/Personality.js";
import buildPrompt from "../ai/promptBuilder.js";
import askGemini from "./geminiService.js";

import {
  getOrCreateChat,
  saveMessage,
} from "./chatHistoryService.js";

const chatWithPersonality = async (
  personalityId,
  userId,
  message
) => {
  console.log("1. Starting chat");

  const personality = await Personality.findOne({
    _id: personalityId,
    owner: userId,
  });

  console.log("2. Personality loaded");

  if (!personality) {
    throw new Error("Personality not found");
  }

  if (!personality.aiProfile) {
    throw new Error("Personality is not trained yet.");
  }

  const chat = await getOrCreateChat(
    userId,
    personalityId
  );

  console.log("3. Chat loaded");

  const history = chat.messages.slice(-6);

  console.log("4. History loaded");

  const prompt = buildPrompt(
    personality,
    history,
    message
  );

  console.log("5. Prompt built");
  
  console.time("Gemini");
  let reply;
  try{
   reply = await askGemini(prompt);
  } finally {
  console.timeEnd("Gemini");
  }
  console.log("6. Gemini replied:", reply);

  await saveMessage(chat, "user", message);
  console.log("7. User saved");

  await saveMessage(chat, "assistant", reply);
  console.log("8. Assistant saved");

  return {
    success: true,
    reply,
  };
};

export default chatWithPersonality;
