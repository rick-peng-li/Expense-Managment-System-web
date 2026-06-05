// server/controllers/notificationController.js
import { sendEmail } from "../utils/emailService.js";
import Budget from "../models/Budget.js";
import Expense from "../models/Expense.js";

// Notify user if monthly expense exceeds budget
export const checkBudgetExceeded = async (req, res) => {
  try {
    const { month, year } = req.body;

    const budget = await Budget.findOne({ user: req.user._id, month, year });
    if (!budget) return res.status(404).json({ message: "Budget not set" });

    const totalExpense = await Expense.aggregate([
      { $match: { user: req.user._id, type: "Expense", month, year } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    if (totalExpense[0]?.total > budget.amount) {
      await sendEmail(req.user.email, "Budget Alert", "Your monthly budget exceeded!");
      return res.json({ message: "Budget exceeded! Email sent." });
    }

    res.json({ message: "Budget not exceeded" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
