import { trainPersonality } from "../services/trainingService.js";

const train = async (req, res) => {
  try {
    const result = await trainPersonality(
      req.params.memoryId,
      req.user._id
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { train };