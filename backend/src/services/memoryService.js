import Memory from "../models/Memory.js";

const uploadMemory = async (file, personalityId, userId) => {
  const memory = await Memory.create({
    personality: personalityId,
    owner: userId,
    fileName: file.filename,
    originalName: file.originalname,
    fileType: file.mimetype,
    fileSize: file.size,
  });

  return {
    success: true,
    message: "Memory uploaded successfully",
    memory,
  };
};

const getMemories = async (personalityId, userId) => {
  const memories = await Memory.find({
    personality: personalityId,
    owner: userId,
  }).sort({ createdAt: -1 });

  return {
    success: true,
    memories,
  };
};

export {
  uploadMemory,
  getMemories,
};