// src/components/PieChart.js
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#8E44AD", "#FF7F50", "#2ECC71"];

const PieChart = ({ data }) => {
  if (!data || data.length === 0) return <p>No data to display.</p>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <ResponsiveContainer width="100%" height={300}>
        <RePieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={(entry) => `${entry.name}: ${entry.value}`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
