// server/controllers/categoryController.js
import Category from "../models/Category.js";

// Add new category
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const existing = await Category.findOne({ name, user: req.user._id });
    if (existing) return res.status(400).json({ message: "Category already exists" });

    const category = await Category.create({ name, user: req.user._id });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all categories for user
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
