import { useState, useEffect } from "react";

const Budgets = () => {
  // For now, placeholder logic. Later connect to BudgetContext
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch budgets from backend
    setLoading(false);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Budgets</h1>
      {loading ? <p>Loading...</p> : (
        <div>
          {budgets.length === 0 ? <p>No budgets found.</p> : (
            <ul>
              {budgets.map((budget) => (
                <li key={budget._id}>
                  {budget.category}: ${budget.amount}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Budgets;
