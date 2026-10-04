import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8">

      <div>
        <h2 className="text-2xl font-bold text-white">
          Dashboard
        </h2>

        <p className="text-slate-400">
          Welcome back, {user?.name || "User"} 👋
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="w-11 h-11 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-lg">
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>

      </div>

    </header>
  );
}

export default Navbar;