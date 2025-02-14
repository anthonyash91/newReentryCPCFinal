import Category from "../models/category.model.js";
import mongoose from "mongoose";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "No such category." });
  }

  try {
    const category = await Category.findById(id);
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const createCategory = async (req, res) => {
  const category = req.body;
  const newCategory = new Category(category);

  try {
    await newCategory.save();
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "No such category." });
  }

  try {
    await Category.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Category deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const editCategory = async (req, res) => {
  const { id } = req.params;
  const category = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Category not found." });
  }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, category, {
      new: true
    });
    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
