import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPersonality } from "../../services/personalityService";
import UploadMemory from "../../components/memory/UploadMemory";
import MemoryList from "../../components/memory/MemoryList";

function PersonalityDetails() {
  const { id } = useParams();

  const [personality, setPersonality] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchPersonality();
  }, [refresh]);

  const fetchPersonality = async () => {
    try {
      setLoading(true);

      const data = await getPersonality(id);

      setPersonality(data.personality);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-xl">
        Loading Personality...
      </div>
    );
  }

  if (!personality) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-xl">
        Personality not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Personality Card */}

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">

          <div className="flex items-center gap-6">

            <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center text-3xl font-bold">
              {personality.name.charAt(0).toUpperCase()}
            </div>

            <div>

              <h1 className="text-4xl font-bold">
                {personality.name}
              </h1>

              <p className="text-cyan-400 text-lg mt-2">
                {personality.relationship}
              </p>

            </div>

          </div>

          <div className="mt-8">

            <h2 className="text-xl font-semibold mb-2">
              Description
            </h2>

            <p className="text-slate-300">
              {personality.description || "No description provided."}
            </p>

          </div>

          <div className="mt-8">

            <h2 className="text-xl font-semibold mb-3">
              AI Status
            </h2>

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                personality.status === "Ready"
                  ? "bg-green-600"
                  : personality.status === "Training"
                  ? "bg-yellow-500 text-black"
                  : "bg-red-500"
              }`}
            >
              {personality.status}
            </span>

          </div>

        </div>

        {/* Upload Memory */}

        <div className="mt-8">

          <UploadMemory
            personalityId={personality._id}
            onUploadSuccess={() => {
              fetchPersonality();
              setRefresh((prev) => !prev);
            }}
          />

        </div>

        {/* Memory List */}

        <div className="mt-8">

          <MemoryList
            personalityId={personality._id}
            refresh={refresh}
          />

        </div>

      </div>
    </div>
  );
}

export default PersonalityDetails;
