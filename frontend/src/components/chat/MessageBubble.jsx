import { Trash2 } from "lucide-react";

function MessageBubble({ message, onDelete }) {

console.log("Rendered message:", message);

  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-4 group`}
    >
      <div
        className={`relative max-w-[75%] px-4 py-3 rounded-2xl shadow-md ${
          isUser
            ? "bg-cyan-500 text-white rounded-br-md"
            : "bg-slate-800 text-white rounded-bl-md"
        }`}
      >
        {/* Delete Button */}
        {message._id && (
          <button
            onClick={() => onDelete(message._id)}
            className="absolute -top-2 -right-2 hidden group-hover:flex items-center justify-center w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 transition"
            title="Delete message"
          >
            <Trash2 size={16} />
          </button>
        )}

        <p className="whitespace-pre-wrap wrap-break-word">
          {message.content}
        </p>

        {message.createdAt && (
          <p className="text-[11px] mt-2 opacity-70 text-right">
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;