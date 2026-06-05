// src/components/ExpenseList.js
import { useExpenses } from "../context/ExpenseContext";

const ExpenseList = ({ expenses }) => {
  const { deleteExpense } = useExpenses();

  if (!expenses || expenses.length === 0) return <p>No transactions yet.</p>;

  return (
    <ul className="space-y-2">
      {expenses.map((e) => (
        <li key={e._id} className="flex justify-between items-center border p-2 rounded">
          <div>
            <p className="font-bold">{e.title}</p>
            <p className="text-sm text-gray-500">
              {e.category} | {new Date(e.date).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <p className={e.type === "expense" ? "text-red-500 font-semibold" : "text-green-500 font-semibold"}>
              {e.type === "expense" ? "-" : "+"}${e.amount}
            </p>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              onClick={() => deleteExpense(e._id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
