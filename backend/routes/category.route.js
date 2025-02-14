import express from "express";

import {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
  editCategory
} from "../controllers/category.controller.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/", createCategory);
router.delete("/:id", deleteCategory);
router.put("/:id", editCategory);

export default router;
