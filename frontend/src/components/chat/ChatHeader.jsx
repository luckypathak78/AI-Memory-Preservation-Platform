function ChatHeader({ personality }) {
  return (
    <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center gap-4">

      <div className="w-12 h-12 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
        {personality.name.charAt(0).toUpperCase()}
      </div>

      <div>
        <h2 className="text-white text-xl font-semibold">
          {personality.name}
        </h2>

        <p className="text-green-400 text-sm">
          ● {personality.status}
        </p>
      </div>

    </div>
  );
}

export default ChatHeader;