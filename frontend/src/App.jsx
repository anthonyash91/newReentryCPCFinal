import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Category from "./pages/Category";
import Course from "./pages/Course";

export default function App() {
  const [allCourses, setAllCourses] = useState({});

  const getCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      const coursesData = await res.json();

      if (res.ok) {
        setAllCourses(coursesData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [singleCourse, setSingleCourse] = useState({});

  const getCourse = async (id) => {
    try {
      const res = await fetch(`/api/courses/${id}`);
      const courseData = await res.json();

      if (res.ok) {
        setSingleCourse(courseData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [allCategories, setAllCategories] = useState([]);

  const getCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const categoriesData = await res.json();

      if (res.ok) {
        setAllCategories(categoriesData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
    getCategories();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home allCategories={allCategories} />} />
        <Route
          path="/admin"
          element={
            <Admin
              allCourses={allCourses}
              getCourses={getCourses}
              singleCourse={singleCourse}
              getCourse={getCourse}
              allCategories={allCategories}
            />
          }
        />
        <Route
          path="/categories/:category"
          element={
            <Category allCourses={allCourses} setAllCourses={setAllCourses} />
          }
        />
        <Route
          path="/categories/:category/:courseId"
          element={<Course singleCourse={singleCourse} getCourse={getCourse} />}
        />
      </Routes>
    </>
  );
}
