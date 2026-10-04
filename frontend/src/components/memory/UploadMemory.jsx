import { useState } from "react";
import { uploadMemory } from "../../services/memoryService";
import { trainPersonality } from "../../services/trainingService";

function UploadMemory({
  personalityId,
  onUploadSuccess,
}) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Select a file first.");
      return;
    }

    setLoading(true);
    setLoadingText("Uploading memory...");

    try {
      // Upload memory
      const uploadResponse = await uploadMemory(
        personalityId,
        file
      );
      setLoadingText("Training AI...");

      const memoryId = uploadResponse.memory._id;

      // Automatically train
      await trainPersonality(memoryId);
      setLoading(false);
      setLoadingText("");

      alert("Memory uploaded and AI trained successfully!");

      setFile(null);

      onUploadSuccess();
    } catch (err) {
      console.error(err);
      alert("Upload or training failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">
        Upload Memory
      </h2>

      <input
        type="file"
        accept=".txt"
        onChange={(e) => setFile(e.target.files[0])}
        className="text-white"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-5 px-5 py-3 bg-cyan-500 rounded-lg text-white hover:bg-cyan-400 disabled:bg-slate-600"
      >
        {loading ? loadingText : "Upload Memory"}
      </button>
    </div>
  );
}

export default UploadMemory;
