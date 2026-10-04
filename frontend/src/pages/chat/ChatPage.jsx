import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ChatHeader from "../../components/chat/ChatHeader";
import ChatMessages from "../../components/chat/ChatMessages";
import ChatInput from "../../components/chat/ChatInput";

import { getPersonality } from "../../services/personalityService";
import {
  sendMessage,
  getChatHistory,
  deleteMessage,
} from "../../services/chatService";

function ChatPage() {
  const { id } = useParams();

  const [personality, setPersonality] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const personalityData = await getPersonality(id);
      setPersonality(personalityData.personality);

      const history = await getChatHistory(id);

      console.log(history);

      setChatId(history.chatId);
      setMessages(history.messages || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async (text) => {
    setLoading(true);

    try {
      await sendMessage(id, text);

      // Reload chat from MongoDB
      await loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (messageId) => {
    console.log("Deleting message:", messageId);
    console.log("Chat ID:", chatId);

    if (!window.confirm("Delete this message?")) return;

    try {
      await deleteMessage(chatId, messageId);

      setMessages((prev) =>
        prev.filter((msg) => msg._id !== messageId)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete message.");
    }
  };

  if (!personality) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-950 flex flex-col">
      <ChatHeader personality={personality} />

      <ChatMessages
        messages={messages}
        loading={loading}
        personalityName={personality.name}
        onDelete={handleDelete}
      />

      <ChatInput
        onSend={handleSend}
        loading={loading}
      />
    </div>
  );
}

export default ChatPage;