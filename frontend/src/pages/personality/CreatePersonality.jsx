import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPersonality } from "../../services/personalityService";

function CreatePersonality() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    relationship: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createPersonality(form);

      alert("Personality created successfully!");

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to create personality.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-2xl w-full max-w-lg"
      >
        <h1 className="text-3xl text-white font-bold mb-6">
          Create Personality
        </h1>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 rounded mb-4 bg-slate-800 text-white"
          required
        />

        <input
          name="relationship"
          placeholder="Relationship"
          value={form.relationship}
          onChange={handleChange}
          className="w-full p-3 rounded mb-4 bg-slate-800 text-white"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 rounded mb-6 bg-slate-800 text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-500 py-3 rounded-lg text-white font-semibold"
        >
          {loading ? "Creating..." : "Create Personality"}
        </button>
      </form>
    </div>
  );
}

export default CreatePersonality;