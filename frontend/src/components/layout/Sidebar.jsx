import {
  LayoutDashboard,
  Users,
  MessageCircle,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 h-screen p-6">

      <h1 className="text-2xl font-bold text-cyan-400 mb-10">
        🧠 AI Memory
      </h1>

      <nav className="space-y-3">

        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 text-slate-300 hover:text-cyan-400"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/personalities"
          className="flex items-center gap-3 text-slate-300 hover:text-cyan-400"
        >
          <Users size={20} />
          Personalities
        </NavLink>

        <NavLink
          to="/chat"
          className="flex items-center gap-3 text-slate-300 hover:text-cyan-400"
        >
          <MessageCircle size={20} />
          Conversations
        </NavLink>

        <NavLink
          to="/settings"
          className="flex items-center gap-3 text-slate-300 hover:text-cyan-400"
        >
          <Settings size={20} />
          Settings
        </NavLink>

      </nav>

      <button
        onClick={() => {
  logout();navigate("/login");}}
        className="flex items-center gap-3 mt-16 text-red-400 hover:text-red-500"
      >
        <LogOut size={20} />
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;