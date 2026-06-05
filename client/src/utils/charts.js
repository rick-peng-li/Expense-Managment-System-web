// src/utils/charts.js
export const pieChartData = (categoryData) => ({
  labels: Object.keys(categoryData),
  datasets: [
    {
      label: "Expenses",
      data: Object.values(categoryData),
      backgroundColor: [
        "#3B82F6",
        "#10B981",
        "#F59E0B",
        "#EF4444",
        "#8B5CF6",
        "#EC4899",
      ],
    },
  ],
});

export const barChartData = (barData) => ({
  labels: barData.map((b) => b.month),
  datasets: [
    {
      label: "Expenses",
      data: barData.map((b) => b.expense),
      backgroundColor: "#EF4444",
    },
    {
      label: "Credits",
      data: barData.map((b) => b.credit),
      backgroundColor: "#10B981",
    },
  ],
});
