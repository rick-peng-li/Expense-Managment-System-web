// src/utils/helpers.js
export const formatCurrency = (amount) => {
  return "$" + amount.toFixed(2);
};

export const getMonthYear = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString("default", { month: "short", year: "numeric" });
};
