// backend/models/Expense.js
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    type: { type: String, enum: ["expense", "credit"], required: true }, // fix enum
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);
