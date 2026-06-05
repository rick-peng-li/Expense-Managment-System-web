// src/components/Chart.js
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const Chart = ({ type = "line", data, options }) => {
  if (!data) return null;

  switch (type) {
    case "bar":
      return <Bar data={data} options={options} />;
    case "pie":
      return <Pie data={data} options={options} />;
    default:
      return <Line data={data} options={options} />;
  }
};

export default Chart;
