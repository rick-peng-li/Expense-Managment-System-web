// server/routes/budgetRoutes.js
import express from "express";
import { getBudgetSummary } from "../controllers/budgetController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/summary", protect, getBudgetSummary);

export default router;
