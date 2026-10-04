import api from "./api";

export const trainPersonality = async (memoryId) => {
  const response = await api.post(`/train/${memoryId}`);

  return response.data;
};