import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    englishTitle: { type: String, required: true },
    spanishTitle: { type: String },
    englishLink: { type: String, required: true },
    spanishLink: { type: String },
    category: { type: String, required: true },
    contentType: { type: String, required: true },
    active: { type: Boolean, required: true }
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
