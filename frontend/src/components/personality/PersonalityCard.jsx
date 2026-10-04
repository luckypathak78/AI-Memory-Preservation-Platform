import { Link } from "react-router-dom";

function PersonalityCard({ personality }) {
  const getStatusColor = () => {
    switch (personality.status) {
      case "Ready":
        return "bg-green-500";
      case "Training":
        return "bg-yellow-500";
      default:
        return "bg-red-500";
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500 transition-all duration-300 hover:-translate-y-2">

      {/* Avatar + Name */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
          {personality.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            {personality.name}
          </h2>

          <p className="text-slate-400">
            {personality.relationship}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <p className="text-slate-300 line-clamp-3">
          {personality.description || "No description available."}
        </p>
      </div>

      {/* Status */}
      <div className="mt-6 flex items-center justify-between">

        <span
          className={`${getStatusColor()} text-white text-sm px-4 py-2 rounded-full font-semibold`}
        >
          {personality.status}
        </span>

        <span className="text-slate-500 text-sm">
          Ai Personality
        </span>

      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-3">

        <Link
          to={`/personality/${personality._id}`}
          className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-center py-3 rounded-xl font-semibold transition"
        >
          View Details
        </Link>

        {personality.status === "Ready" ? (
          <Link
            to={`/chat/${personality._id}`}
            className="flex-1 bg-green-600 hover:bg-green-500 text-center py-3 rounded-xl font-semibold transition"
          >
            Open Chat
          </Link>
        ) : (
          <button
            disabled
            className="flex-1 bg-slate-700 text-slate-400 py-3 rounded-xl cursor-not-allowed"
          >
            Chat Locked
          </button>
        )}

      </div>

    </div>
  );
}

export default PersonalityCard;
