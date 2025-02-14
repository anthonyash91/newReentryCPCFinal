import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Course({ singleCourse, getCourse }) {
  const params = useParams();

  useEffect(() => {
    getCourse(params.courseId);
  }, []);

  return <>{singleCourse?.data?.englishTitle}</>;
}
