import fs from "fs/promises";
import path from "path";

import Memory from "../models/Memory.js";
import Personality from "../models/Personality.js";
import parseWhatsAppChat from "../utils/chatParser.js";
import trainMemory from "../ai/trainMemory.js";

const trainPersonality = async (memoryId, userId) => {
  const memory = await Memory.findOne({
    _id: memoryId,
    owner: userId,
  });

  if (!memory) {
    throw new Error("Memory not found");
  }

  const filePath = path.join("uploads", memory.fileName);

  const chat = await fs.readFile(filePath, "utf-8");

  const messages = parseWhatsAppChat(chat);

  // FIRST create the analysis
  const analysis = await trainMemory(messages);

  // THEN update the memory
  memory.status = "Processed";
  await memory.save();

  // THEN update the personality
  const personality = await Personality.findById(memory.personality);

  personality.aiProfile = analysis;
  personality.status = "Ready";

  await personality.save();

  return {
    success: true,
    message: "Training completed successfully.",
    profile: analysis,
  };
};

export { trainPersonality };
