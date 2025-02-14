import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    englishTitle: { type: String, required: true },
    spanishTitle: { type: String },
    categoryImage: { type: String, required: true }
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
