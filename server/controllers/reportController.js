// server/controllers/reportController.js
import Expense from "../models/Expense.js";
import json2csv from "json2csv";

// Generate CSV report for user expenses
export const generateCSVReport = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id });
    const fields = ["title", "amount", "type", "category", "date"];
    const csv = json2csv.parse(expenses, { fields });

    res.header("Content-Type", "text/csv");
    res.attachment("expense_report.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
