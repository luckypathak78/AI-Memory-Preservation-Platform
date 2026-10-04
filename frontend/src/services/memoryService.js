import api from "./api";

export const uploadMemory = async (personalityId, file) => {
  const formData = new FormData();

  formData.append("memory", file);

  const response = await api.post(
    `/memories/${personalityId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getMemories = async (personalityId) => {
  const response = await api.get(
    `/memories/${personalityId}`
  );

  return response.data;
};
