// src/components/ExpenseForm.js
import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";

const ExpenseForm = ({ onClose }) => {
  const { addExpense } = useExpenses();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount || !category || !type || !date) {
      setError("Please fill all fields.");
      return;
    }

    const expenseData = {
      title,
      amount: parseFloat(amount),
      category,
      type,
      date,
    };

    const res = await addExpense(expenseData);
    if (res.success) {
      onClose();
    } else {
      setError(res.message || "Failed to add transaction.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full mb-2"
          required
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 w-full mb-2"
          required
        >
          <option value="expense">Expense</option>
          <option value="credit">Credit</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full mb-2"
          required
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
