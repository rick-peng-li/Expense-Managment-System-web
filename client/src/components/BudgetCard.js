// src/components/BudgetCard.js
const BudgetCard = ({ budget }) => {
  const progress = Math.min((budget.spent / budget.limit) * 100, 100);

  return (
    <div className="border rounded p-4 shadow-md bg-white">
      <h3 className="text-lg font-bold mb-2">{budget.name}</h3>
      <p>
        Spent: ${budget.spent} / ${budget.limit}
      </p>
      <div className="w-full bg-gray-200 h-3 rounded mt-2">
        <div
          className="bg-blue-500 h-3 rounded"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default BudgetCard;
