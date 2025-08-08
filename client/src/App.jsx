import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

//Components
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import NotFound from "./components/NotFound";
import Error from "./components/Error";
import PrivateRoute from "./components/PrivateRoute";
import Forbidden from "./components/Forbidden";


const App = () => {
  const [courses, setCourses] = useState([]); // manages all courses in db

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/courses");

      if (response.status === 200) {
        const data = await response.json();
        setCourses(data)
      } else {
        throw new Error();
      }
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
        <Route path="/" element={<Courses courses={courses}/>} />
        <Route path="/courses" element={<Courses courses={courses} />} />
        <Route path="/sign-up" element={<UserSignUp />} />
        <Route path="/sign-in" element={<UserSignIn />} />
        <Route path="/courses/:id" element={<CourseDetail courses={courses} refreshCourses={fetchCourses} />}/>
        <Route element={<PrivateRoute />}>
          <Route path="/courses/create" element={<CreateCourse refreshCourses={fetchCourses} />}/>
          <Route path="/courses/:id/update" element={<UpdateCourse courses={courses} refreshCourses={fetchCourses} />}/>
        </Route>
        <Route path="/error" element={<Error />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App