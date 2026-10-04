import Chat from "../models/Chat.js";

export const getOrCreateChat = async (
  owner,
  personalityId
) => {
  let chat = await Chat.findOne({
    owner,
    personality: personalityId,
  });

  if (!chat) {
    chat = await Chat.create({
      owner,
      personality: personalityId,
      messages: [],
    });
  }

  return chat;
};

export const saveMessage = async (
  chat,
  role,
  content
) => {
  chat.messages.push({
    role,
    content,
    createdAt: new Date(),
  });

  await chat.save();
};

export const getChatHistory = async (
  owner,
  personalityId
) => {
  const chat = await Chat.findOne({
    owner,
    personality: personalityId,
  });

  if (!chat) {
    return {
      chatId: null,
      messages: [],
    };
  }

  return {
    chatId: chat._id,
    messages: chat.messages,
  };
};

export const deleteMessage = async (
  chatId,
  messageId,
  userId
) => {
  const chat = await Chat.findOne({
    _id: chatId,
    owner: userId,
  });

  if (!chat) {
    throw new Error("Chat not found");
  }

  const message = chat.messages.id(messageId);

  console.log("Requested messageId:", messageId);

chat.messages.forEach((m) => {
  console.log(
    "Stored ID:",
    m._id.toString(),
    "Equal?",
    m._id.toString() === messageId
  );
});



  

  if (!message) {
    throw new Error("Message not found");
  }

  message.deleteOne();

  await chat.save();

  return {
    success: true,
    message: "Message deleted successfully.",
  };
};
