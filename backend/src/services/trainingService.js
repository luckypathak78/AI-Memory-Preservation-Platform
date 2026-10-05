import { once } from "events";

import Memory from "../models/Memory.js";
import Personality from "../models/Personality.js";
import parseWhatsAppChat from "../utils/chatParser.js";
import trainMemory from "../ai/trainMemory.js";
import { getGridFSBucket } from "../database/gridfs.js";

const trainPersonality = async (memoryId, userId) => {
  const memory = await Memory.findOne({
    _id: memoryId,
    owner: userId,
  });

  if (!memory) {
    throw new Error("Memory not found");
  }

  const bucket = getGridFSBucket();

  const downloadStream = bucket.openDownloadStream(
    memory.gridFsFileId
  );

  const chunks = [];

  downloadStream.on("data", (chunk) => {
    chunks.push(chunk);
  });

  await once(downloadStream, "end");

  const chat = Buffer.concat(chunks).toString("utf-8");

  const messages = parseWhatsAppChat(chat);

  if (messages.length === 0) {
    throw new Error(
      "No valid WhatsApp messages were found in the uploaded file."
    );
  }

  const analysis = await trainMemory(messages);

  memory.status = "Processed";
  await memory.save();

  const personality = await Personality.findById(memory.personality);

  if (!personality) {
    throw new Error("Personality not found");
  }

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