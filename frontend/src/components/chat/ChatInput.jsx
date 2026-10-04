import { useState } from "react";

function ChatInput({ onSend, loading }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim() || loading) return;

    onSend(message.trim());
    setMessage("");
  };

  const handleKeyDown = (e) => {
    // Enter = Send
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-slate-800 bg-slate-900 p-4">
      <div className="flex items-end gap-3">

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Type a message..."
          className="flex-1 resize-none rounded-xl bg-slate-800 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500 max-h-40 overflow-y-auto"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className={`px-6 py-3 rounded-xl font-semibold transition ${
            loading
              ? "bg-slate-700 text-slate-400 cursor-not-allowed"
              : "bg-cyan-500 hover:bg-cyan-400 text-white"
          }`}
        >
          {loading ? "Sending..." : "Send"}
        </button>

      </div>
    </div>
  );
}

export default ChatInput;