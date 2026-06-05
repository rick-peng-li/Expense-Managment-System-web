import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const LineChart = ({ expenses }) => {
  const savings = [];
  let total = 0;
  const dates = expenses.map(e => new Date(e.date).toLocaleDateString());

  expenses.forEach(e => {
    total += e.type === "Credit" ? e.amount : -e.amount;
    savings.push(total);
  });

  const data = {
    labels: dates,
    datasets: [{
      label: "Savings Trend",
      data: savings,
      borderColor: "#10B981",
      backgroundColor: "rgba(16,185,129,0.2)",
      fill: true,
    }],
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Savings Trend</h2>
      <Line data={data} />
    </div>
  );
};

export default LineChart;
