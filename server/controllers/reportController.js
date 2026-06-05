import Expense from "../models/Expense.js";

const escapeCsvValue = (value) => {
  const normalizedValue = value instanceof Date
    ? value.toISOString()
    : value == null
      ? ""
      : String(value);

  if (/[",\n]/.test(normalizedValue)) {
    return `"${normalizedValue.replace(/"/g, '""')}"`;
  }

  return normalizedValue;
};

export const generateCSVReport = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).lean();
    const fields = ["title", "amount", "type", "category", "date"];
    const rows = expenses.map((expense) =>
      fields.map((field) => escapeCsvValue(expense[field]))
    );
    const csv = [fields.join(","), ...rows.map((row) => row.join(","))].join("\n");

    res.header("Content-Type", "text/csv; charset=utf-8");
    res.attachment("expense_report.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};