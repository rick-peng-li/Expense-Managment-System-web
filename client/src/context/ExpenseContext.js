import { createContext, useContext, useEffect, useState } from "react";
import API from "../utils/api";
import { useAuth } from "./AuthContext";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const { user, authReady, clearUser } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleUnauthorized = () => {
    setExpenses([]);
    setLoading(false);
    clearUser();
  };

  const fetchExpenses = async () => {
    if (!authReady) {
      return;
    }

    if (!user?.token) {
      setExpenses([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const res = await API.get("/expenses", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setExpenses(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        handleUnauthorized();
        return;
      }
      console.error("Failed to fetch expenses", err);
    }

    setLoading(false);
  };

  const addExpense = async (expenseData) => {
    if (!user?.token) {
      return { success: false, message: "Please login first." };
    }

    if (!["expense", "credit"].includes(expenseData.type)) {
      return { success: false, message: "Type must be 'expense' or 'credit'" };
    }

    try {
      const res = await API.post("/expenses", expenseData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setExpenses((prev) => [...prev, res.data]);
      return { success: true };
    } catch (err) {
      if (err.response?.status === 401) {
        handleUnauthorized();
        return { success: false, message: "Login expired. Please login again." };
      }
      console.error("Failed to add transaction", err);
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };

  const deleteExpense = async (id) => {
    if (!user?.token) {
      return;
    }

    try {
      await API.delete(`/expenses/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setExpenses((prev) => prev.filter((expense) => expense._id !== id));
    } catch (err) {
      if (err.response?.status === 401) {
        handleUnauthorized();
        return;
      }
      console.error("Failed to delete transaction", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [authReady, user]);

  return (
    <ExpenseContext.Provider value={{ expenses, loading, fetchExpenses, addExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);