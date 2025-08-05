import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';

const CourseDetail = (props) => {
  const { id } = useParams();
  const [course, setCourse] = useState({});

  const fetchCourseById = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/courses/${courseId}`);
      const data = await response.json();
      console.log("Course:", data);
      setCourse(data);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  useEffect(() => {
      fetchCourseById(id);
    }, []);
  
  return (
    <>
      <div className="actions--bar">
        <div className="wrap">
          <NavLink className="button" to={`/courses/${id}/update`} >Update Course</NavLink>
          <NavLink className="button" >Delete Course</NavLink>
          <NavLink className="button button-secondary" to='/courses' >Return to List</NavLink>
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course?.title}</h4>
              <p>By {course?.User?.firstName} {course?.User?.lastName}</p>
              <ReactMarkdown>{course?.description}</ReactMarkdown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course?.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <div className="course--detail--list">
                <ReactMarkdown>{course?.materialsNeeded}</ReactMarkdown>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CourseDetail;
