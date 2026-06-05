import Expense from "../models/Expense.js";

export const getBudgetSummary = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id });
    const totalExpenses = expenses
      .filter((expense) => expense.type === "expense")
      .reduce((sum, expense) => sum + expense.amount, 0);
    const totalCredits = expenses
      .filter((expense) => expense.type === "credit")
      .reduce((sum, expense) => sum + expense.amount, 0);

    res.json({
      totalExpenses,
      totalCredits,
      balance: totalCredits - totalExpenses,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};