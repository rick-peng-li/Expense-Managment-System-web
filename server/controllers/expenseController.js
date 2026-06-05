import Expense from "../models/Expense.js";

// Get all expenses for a user
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
};

// Add a new expense
export const addExpense = async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;
    const expense = new Expense({
      title,
      amount,
      type,
      category,
      date,
      user: req.user._id,
    });
    const saved = await expense.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an expense
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user._id });
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    await expense.deleteOne();
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete expense" });
  }
};
