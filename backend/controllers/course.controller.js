import Course from "../models/course.model.js";
import mongoose from "mongoose";

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "No such course." });
  }

  try {
    const course = await Course.findById(id);
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const createCourse = async (req, res) => {
  const course = req.body;
  const newCourse = new Course(course);

  try {
    await newCourse.save();
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "No such course." });
  }

  try {
    await Course.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Course deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const editCourse = async (req, res) => {
  const { id } = req.params;
  const course = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Course not found." });
  }

  try {
    const updatedCourse = await Course.findByIdAndUpdate(id, course, {
      new: true
    });
    res.status(200).json({ success: true, data: updatedCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
