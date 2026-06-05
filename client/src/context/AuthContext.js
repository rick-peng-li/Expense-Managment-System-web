import { createContext, useContext, useEffect, useState } from "react";
import API from "../utils/api";

const AuthContext = createContext();

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);
  const [authReady, setAuthReady] = useState(false);

  const clearUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const validateStoredUser = async () => {
      const storedUser = getStoredUser();

      if (!storedUser?.token) {
        clearUser();
        setAuthReady(true);
        return;
      }

      try {
        const res = await API.get("/auth/me", {
          headers: { Authorization: `Bearer ${storedUser.token}` },
        });

        if (!res.data?.authenticated || !res.data.user) {
          clearUser();
          setAuthReady(true);
          return;
        }

        const nextUser = { ...res.data.user, token: storedUser.token };
        localStorage.setItem("user", JSON.stringify(nextUser));
        setUser(nextUser);
      } catch {
        clearUser();
      }

      setAuthReady(true);
    };

    validateStoredUser();
  }, []);

  const signup = async (username, email, password) => {
    try {
      await API.post("/auth/register", { username, email, password });
      return { success: true, message: "Signup successful! Please login." };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };

  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      setAuthReady(true);
      return { success: true };
    } catch (err) {
      clearUser();
      setAuthReady(true);
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };

  const logout = () => {
    clearUser();
    setAuthReady(true);
  };

  return (
    <AuthContext.Provider value={{ user, authReady, signup, login, logout, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);