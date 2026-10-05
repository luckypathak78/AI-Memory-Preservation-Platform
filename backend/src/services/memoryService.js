import { Readable } from "stream";

import Memory from "../models/Memory.js";
import { getGridFSBucket } from "../database/gridfs.js";

const uploadMemory = async (file, personalityId, userId) => {
  if (!file) {
    throw new Error("No memory file uploaded");
  }

  const bucket = getGridFSBucket();

  const gridFsFileId = await new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(file.originalname, {
      contentType: file.mimetype,
      metadata: {
        personalityId,
        userId,
      },
    });

    uploadStream.on("finish", () => {
      resolve(uploadStream.id);
    });

    uploadStream.on("error", reject);

    Readable.from(file.buffer).pipe(uploadStream);
  });

  const memory = await Memory.create({
    personality: personalityId,
    owner: userId,
    fileName: file.originalname,
    originalName: file.originalname,
    fileType: file.mimetype,
    fileSize: file.size,
    gridFsFileId,
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
  })
    .sort({ createdAt: -1 });

  return {
    success: true,
    memories,
  };
};

export {
  uploadMemory,
  getMemories,
};