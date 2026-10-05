import Personality from "../models/Personality.js";

const createPersonality = async (personalityData, userId) => {
  const personality = await Personality.create({
    owner: userId,
    name: personalityData.name,
    relationship: personalityData.relationship,
    description: personalityData.description,
    avatar: personalityData.avatar,
  });

  return {
    success: true,
    message: "Personality created successfully",
    personality,
  };
};

const getAllPersonalities = async (userId) => {
  const personalities = await Personality.find({
    owner: userId,
  }).sort({ createdAt: -1 });

  return {
    success: true,
    personalities,
  };
};

const getPersonalityById = async (id, userId) => {
  const personality = await Personality.findOne({
    _id: id,
    owner: userId,
  });

  if (!personality) {
    throw new Error("Personality not found");
  }

  return {
    success: true,
    personality,
  };
};

export {
  createPersonality,
  getAllPersonalities,
  getPersonalityById,
};
