import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const data = await loginUser(formData);

     
      login(data.user, data.token);

      setMessage("Login Successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-900 rounded-2xl p-8 shadow-xl border border-slate-700">

      <h1 className="text-3xl font-bold text-center text-white mb-2">
        Welcome Back
      </h1>

      <p className="text-center text-slate-400 mb-8">
        Login to continue
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>

          <label className="block text-slate-300 mb-2">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
          />

        </div>

        <div>

          <label className="block text-slate-300 mb-2">
            Password
          </label>

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-slate-400"
            >
              {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
            </button>

          </div>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 transition py-3 rounded-lg text-white font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

      {message && (
        <p className="text-center mt-5 text-white">
          {message}
        </p>
      )}

    </div>
  );
}

export default LoginForm;
