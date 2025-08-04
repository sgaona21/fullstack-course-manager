import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

//Components
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";


const App = () => {
  const [courses, setCourses] = useState([]); // manages all courses in db

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/courses", requestOptions);
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
        <Route path="/courses/:id" element={<CourseDetail />}/>
        <Route path="/courses/create" element={<CreateCourse />}/>
      </Routes>
    </>
  )
}

export default App