import api from "./api";

export const getPersonalities = async () => {
  const response = await api.get("/personalities");
  return response.data;
};

export const getPersonality = async (id) => {
  const response = await api.get(`/personalities/${id}`);
  return response.data;
};

export const createPersonality = async (data) => {
  const response = await api.post("/personalities", data);
  return response.data;
};

export const deletePersonality = async (id) => {
  const response = await api.delete(`/personalities/${id}`);
  return response.data;
};
