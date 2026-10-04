import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

function ChatMessages({
  messages,
  loading,
  personalityName,
  onDelete,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-slate-950">

      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center text-slate-500">
          Start a conversation...
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <MessageBubble
              key={message._id || index}
              message={message}
              onDelete={onDelete}
            />
          ))}
        </>
      )}

      {loading && (
        <div className="flex justify-start mb-4">
          <div className="bg-slate-800 text-white px-4 py-3 rounded-2xl rounded-bl-md animate-pulse">
            {personalityName} is typing...
          </div>
        </div>
      )}

      <div ref={bottomRef} />

    </div>
  );
}

export default ChatMessages;