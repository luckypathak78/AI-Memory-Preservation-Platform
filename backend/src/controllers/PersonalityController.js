import {
  createPersonality,
  getAllPersonalities,
  getPersonalityById,
} from "../services/personalityService.js";

const create = async (req, res) => {
  try {
    const result = await createPersonality(req.body, req.user._id);

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
    const result = await getAllPersonalities(req.user._id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPersonality = async (req, res) => {
  try {
    const result = await getPersonalityById(
      req.params.id,
      req.user._id
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  create,
  getAll,
  getPersonality,
};
