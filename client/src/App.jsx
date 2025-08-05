import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

//Components
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";


const App = () => {
  const [courses, setCourses] = useState([]); // manages all courses in db

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/courses");
      const data = await response.json();
      console.log("Courses:", data);
      setCourses(data)
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/courses" element={<Courses courses={courses} />}/>
        <Route path="/courses/:id" element={<CourseDetail courses={courses} />}/>
        <Route path="/courses/create" element={<CreateCourse />}/>
        <Route path="/courses/:id/update" element={<UpdateCourse />}/>
      </Routes>
    </>
  )
}

export default App