import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Courses from "./components/Courses";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/api/courses" element={<Courses />}/>
      </Routes>
    </>
  )
}

export default App