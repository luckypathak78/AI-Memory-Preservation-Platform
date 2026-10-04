import api from "./api";

export const sendMessage = async (personalityId, message) => {
  const response = await api.post("/chat", {
    personalityId,
    message,
  });

  return response.data;
};

export const getChatHistory = async (personalityId) => {
  const response = await api.get(`/chat/${personalityId}`);

  return response.data;
};

export const deleteMessage = async (chatId, messageId) => {
  const response = await api.delete(
    `/chat/${chatId}/message/${messageId}`
  );

  return response.data;
};
