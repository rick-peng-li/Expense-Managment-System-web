// server/routes/reportRoutes.js
import express from "express";
import { generateCSVReport } from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/csv", protect, generateCSVReport);

export default router;
