import { useState } from "react";
import { trainPersonality } from "../../services/trainingService";

function TrainPersonality({
  memoryId,
  onTrainingComplete,
}) {
  const [loading, setLoading] = useState(false);

  const handleTrain = async () => {
    try {
      setLoading(true);

      const res = await trainPersonality(memoryId);

      alert(res.message);

      if (onTrainingComplete) {
        onTrainingComplete();
      }

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Training failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">

      <h2 className="text-2xl font-bold mb-4 text-white">
        AI Training
      </h2>

      <button
        onClick={handleTrain}
        disabled={loading}
        className="bg-cyan-500 hover:bg-cyan-400 transition px-6 py-3 rounded-lg text-white font-semibold"
      >
        {loading
          ? "Training..."
          : "🧠 Train AI"}
      </button>

    </div>
  );
}

export default TrainPersonality;