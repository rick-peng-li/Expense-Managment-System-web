import { createContext, useContext, useState } from "react";
import API from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Signup should NOT auto-login
  const signup = async (username, email, password) => {
    try {
      const res = await API.post("/auth/register", { username, email, password });
      return { success: true, message: "Signup successful! Please login." };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };

  // Login stores user in localStorage
  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);