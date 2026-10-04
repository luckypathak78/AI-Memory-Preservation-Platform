import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getProfile();
        setUser(data.user);
      } catch (error) {
        console.error("Authentication failed:", error);

        localStorage.removeItem("token");
        setToken("");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  const login = (userData, jwtToken) => {
    localStorage.setItem("token", jwtToken);

    setUser(userData);
    setToken(jwtToken);
  };

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

