import express from "express";

import {
  getCourses,
  getCourse,
  createCourse,
  deleteCourse,
  editCourse
} from "../controllers/course.controller.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourse);
router.post("/", createCourse);
router.delete("/:id", deleteCourse);
router.put("/:id", editCourse);

export default router;
