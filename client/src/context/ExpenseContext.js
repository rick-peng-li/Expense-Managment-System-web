// src/context/ExpenseContext.js
import { createContext, useContext, useEffect, useState } from "react";
import API from "../utils/api";
import { useAuth } from "./AuthContext";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all expenses and credits
  const fetchExpenses = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await API.get("/expenses", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setExpenses(res.data);
    } catch (err) {
      console.error("Failed to fetch expenses", err);
    }
    setLoading(false);
  };

  // Add new expense or credit
  const addExpense = async (expenseData) => {
    // Validate type
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
      console.error("Failed to add transaction", err);
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };

  // Delete expense/credit
  const deleteExpense = async (id) => {
    try {
      await API.delete(`/expenses/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Failed to delete transaction", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [user]);

  return (
    <ExpenseContext.Provider value={{ expenses, loading, fetchExpenses, addExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);
