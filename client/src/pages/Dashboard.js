import { useExpenses } from "../context/ExpenseContext";
import ExpenseList from "../components/ExpenseList";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";

const Dashboard = () => {
  const { expenses, loading } = useExpenses();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("currentMonth");

  const now = new Date();

  const filterExpenses = () => {
    return expenses.filter((e) => {
      const date = new Date(e.date);
      if (filter === "currentMonth") {
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      } else if (filter === "lastMonth") {
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
        return date.getMonth() === lastMonth.getMonth() && date.getFullYear() === lastMonth.getFullYear();
      } else if (filter === "lastWeek") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return date >= weekAgo && date <= now;
      } else {
        return true;
      }
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const filteredExpenses = filterExpenses();
  const expenseItems = filteredExpenses.filter((e) => e.type === "expense");
  const creditItems = filteredExpenses.filter((e) => e.type === "credit");

  // PieChart (category-wise)
  const categoryData = Object.keys(
    expenseItems.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount;
      return acc;
    }, {})
  ).map((key) => ({
    name: key,
    value: expenseItems.reduce((a, i) => (i.category === key ? a + i.amount : a), 0),
  }));

  // BarChart (monthly)
  const barData = {};
  filteredExpenses.forEach((item) => {
    const month = new Date(item.date).toLocaleString("default", { month: "short", year: "numeric" });
    barData[month] = barData[month] || { expense: 0, credit: 0 };
    barData[month][item.type] += item.amount;
  });
  const barChartData = Object.keys(barData).map((month) => ({
    month,
    expense: barData[month].expense,
    credit: barData[month].credit,
  }));

  // NEW: Two separate PieCharts for Yearly Comparison
  const yearlyExpenses = () => {
    const currentYear = now.getFullYear();
    const lastYear = currentYear - 1;

    return [
      {
        name: `Expenses ${lastYear}`,
        value: expenses.filter((e) => new Date(e.date).getFullYear() === lastYear && e.type === "expense")
                       .reduce((a, i) => a + i.amount, 0),
      },
      {
        name: `Expenses ${currentYear}`,
        value: expenses.filter((e) => new Date(e.date).getFullYear() === currentYear && e.type === "expense")
                       .reduce((a, i) => a + i.amount, 0),
      },
    ];
  };

  const yearlyCredits = () => {
    const currentYear = now.getFullYear();
    const lastYear = currentYear - 1;

    return [
      {
        name: `Credits ${lastYear}`,
        value: expenses.filter((e) => new Date(e.date).getFullYear() === lastYear && e.type === "credit")
                       .reduce((a, i) => a + i.amount, 0),
      },
      {
        name: `Credits ${currentYear}`,
        value: expenses.filter((e) => new Date(e.date).getFullYear() === currentYear && e.type === "credit")
                       .reduce((a, i) => a + i.amount, 0),
      },
    ];
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="flex items-center space-x-4 mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setShowForm(true)}
        >
          Add Transaction
        </button>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="currentMonth">Current Month</option>
          <option value="lastMonth">Last Month</option>
          <option value="lastWeek">Last Week</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {showForm && <ExpenseForm onClose={() => setShowForm(false)} />}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 className="text-xl mb-2">Transactions</h2>
          {filteredExpenses.length === 0 ? (
            <p>No transactions found for this period.</p>
          ) : (
            <ExpenseList expenses={filteredExpenses} />
          )}

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-2">Category Breakdown (Expenses)</h3>
              <PieChart data={categoryData} />
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">Monthly Trends</h3>
              <BarChart data={barChartData} />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-2">Yearly Expenses Comparison</h3>
              <PieChart data={yearlyExpenses()} />
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">Yearly Credits Comparison</h3>
              <PieChart data={yearlyCredits()} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
