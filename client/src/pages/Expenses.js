import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import ExpenseList from "../components/ExpenseList";
import ExpenseForm from "../components/ExpenseForm";

const Expenses = () => {
  const { expenses, loading } = useExpenses();
  const [showModal, setShowModal] = useState(false);
  const [filterType, setFilterType] = useState("all"); // all, expense, credit
  const [sortBy, setSortBy] = useState("date"); // date, amount

  const filteredExpenses = expenses
    .filter((item) =>
      filterType === "all" ? true : item.type === filterType
    )
    .sort((a, b) =>
      sortBy === "amount" ? b.amount - a.amount : new Date(b.date) - new Date(a.date)
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Transactions</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
        >
          + Add Expense/Credit
        </button>
      </div>

      {showModal && <ExpenseForm closeModal={() => setShowModal(false)} />}

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <select
          className="border p-2 rounded"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="expense">Expense</option>
          <option value="credit">Credit</option>
        </select>

        <select
          className="border p-2 rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredExpenses.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <ExpenseList expenses={filteredExpenses} />
      )}
    </div>
  );
};

export default Expenses;
