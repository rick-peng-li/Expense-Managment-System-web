// server/models/Budget.js
import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

const Budget = mongoose.model("Budget", budgetSchema);
export default Budget;
