import {
  uploadMemory,
  getMemories,
} from "../services/memoryService.js";

const upload = async (req, res) => {
  try {
    const result = await uploadMemory(
      req.file,
      req.params.personalityId,
      req.user._id
    );

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const result = await getMemories(
      req.params.personalityId,
      req.user._id
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  upload,
  getAll,
};