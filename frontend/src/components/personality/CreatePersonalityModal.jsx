import { useState } from "react";
import { X } from "lucide-react";
import { createPersonality } from "../../services/personalityService";

function CreatePersonalityModal({
  isOpen,
  onClose,
  onPersonalityCreated,
}) {
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    description: "",
    avatar: "",
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await createPersonality(formData);

      onPersonalityCreated();

      onClose();

      setFormData({
        name: "",
        relationship: "",
        description: "",
        avatar: "",
      });

    } catch (err) {
      console.error(err);
      alert("Failed to create personality");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-slate-900 w-full max-w-lg rounded-2xl p-8 border border-slate-800">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-white">
            Create Personality
          </h2>

          <button onClick={onClose}>
            <X className="text-white" />
          </button>

        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-800 text-white"
            required
          />

          <input
            name="relationship"
            placeholder="Relationship"
            value={formData.relationship}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-800 text-white"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-800 text-white"
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
          >
            {loading ? "Creating..." : "Create Personality"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreatePersonalityModal;