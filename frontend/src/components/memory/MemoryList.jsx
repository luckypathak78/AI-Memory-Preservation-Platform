import { useEffect, useState } from "react";
import { getMemories } from "../../services/memoryService";

function MemoryList({ personalityId, refresh }) {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    loadMemories();
  }, [refresh]);

  const loadMemories = async () => {
    try {
      const data = await getMemories(personalityId);
      setMemories(data.memories);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-8 bg-slate-900 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-4">
        Uploaded Memories
      </h2>

      {memories.length === 0 ? (
        <p className="text-slate-400">
          No memories uploaded yet.
        </p>
      ) : (
        <div className="space-y-3">
          {memories.map((memory) => (
            <div
              key={memory._id}
              className="flex justify-between items-center bg-slate-800 rounded-lg p-4"
            >
              <div>
                <h3 className="text-white">
                  {memory.originalName}
                </h3>

                <p className="text-slate-400 text-sm">
                  {memory.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MemoryList;
