import express from "express";
import { getExpenses, addExpense, deleteExpense } from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js"; // ensures user is logged in

const router = express.Router();

router.get("/", protect, getExpenses);
router.post("/", protect, addExpense);
router.delete("/:id", protect, deleteExpense); // 🔹 DELETE route

export default router;
