// src/components/BarChart.js
import { BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

const BarChart = ({ data }) => {
  if (!data || data.length === 0) return <p>No data to display.</p>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReBarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="expense" fill="#FF4C4C" />
        <Bar dataKey="credit" fill="#4CAF50" />
      </ReBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
