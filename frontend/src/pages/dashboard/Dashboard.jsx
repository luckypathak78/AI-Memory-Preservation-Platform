import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PersonalityCard from "../../components/personality/PersonalityCard";
import { getPersonalities } from "../../services/personalityService";

function Dashboard() {
  const [personalities, setPersonalities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPersonalities();
  }, []);

  const fetchPersonalities = async () => {
    try {
      const data = await getPersonalities();
      setPersonalities(data.personalities);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <div className="border-b border-slate-800">

        <div className="max-w-7xl mx-auto flex justify-between items-center p-6">

          <div>

            <h1 className="text-4xl font-bold">
              AI Memory Preservation
            </h1>

            <p className="text-slate-400 mt-2">
              Preserve personalities forever.
            </p>

          </div>

          <Link
            to="/personality/create"
            className="bg-cyan-500 hover:bg-cyan-400 px-5 py-3 rounded-xl font-semibold"
          >
            + Create Personality
          </Link>

        </div>

      </div>

      {/* Content */}

      <div className="max-w-7xl mx-auto p-8">

        {personalities.length === 0 ? (
          <div className="text-center py-24">

            <h2 className="text-3xl font-bold">
              No personalities yet
            </h2>

            <p className="text-slate-400 mt-4">
              Create your first AI personality.
            </p>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {personalities.map((personality) => (
              <PersonalityCard
                key={personality._id}
                personality={personality}
              />
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;
