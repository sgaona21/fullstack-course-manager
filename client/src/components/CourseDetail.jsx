import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import ReactMarkdown from 'react-markdown';
import UserContext from "../context/UserContext";

const CourseDetail = (props) => {
  const { authCredentials } = useContext(UserContext);
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const fetchCourseById = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/courses/${courseId}`);
      
      if (response.status === 200) {
        const data = await response.json();
        setCourse(data);
      } else if (response.status === 404) {
        navigate('/notfound')
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      navigate('/error');
    }
  };

  useEffect(() => {
      fetchCourseById(id);
    }, []);

  const yeetCourse = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/courses/${id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${authCredentials}`
        }
    })
      if (response.status === 204) {
        console.log('Course deleted from db!')
        props.refreshCourses();
        navigate('/courses');
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      navigate('/error');
    }
  }

  //toggles the deleteRequest boolean 
  const showDeleteRequest = () => {
    if (deleteConfirm === false) {
      setDeleteConfirm(true)
    } else if (deleteConfirm === true) {
      setDeleteConfirm(false)
    }
  }
  
  return (
    <>
      <div className="actions--bar">
        <div className="wrap">
          {authUser?.id === course?.User?.id && (
            <>
              <NavLink className="button" to={`/courses/${id}/update`}>
                Update Course
              </NavLink>
              <NavLink className="button" onClick={showDeleteRequest} >Delete Course</NavLink>
            </>
          )}
          <NavLink className="button button-secondary" to="/courses">
            Return to List
          </NavLink>
          
          {/* dynamically renders a delete confirmation based on toggle */}
          {deleteConfirm && (
            <>
              <br /> <br />
              <p>Are you sure you want to delete? Click to confirm</p>
              <NavLink className="confirm-deletion" onClick={yeetCourse}>
                CONFIRM DELETION
              </NavLink>
            </>
          )}

        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course?.title}</h4>
              <p>
                By {course?.User?.firstName} {course?.User?.lastName}
              </p>
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
