// server/routes/categoryRoutes.js
import express from "express";
import {
  addCategory,
  getCategories,
  deleteCategory,
} from "../controllers/categoryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.post("/", addCategory);
router.get("/", getCategories);
router.delete("/:id", deleteCategory);

export default router;
