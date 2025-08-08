import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import UserContext from "../context/UserContext";

const UpdateCourse = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authCredentials } = useContext(UserContext);
  const { authUser } = useContext(UserContext);
  const [courseDetails, setCourseDetails] = useState({});
  const [errors, setErrors] = useState([]);


  const fetchCourseDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/courses/${id}`)
    
      if (response.status === 200) {
        const data = await response.json();
        setCourseDetails(data)
      } else if (response.status === 404) {
        navigate('/notfound')
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error("Error fetching course details:". error)
      navigate('/error')
    }
  }

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  useEffect(() => {
    if (courseDetails?.User?.id && authUser?.id !== courseDetails.User.id) {
      navigate('/forbidden')
    }
  }, [courseDetails, authUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitUpdatedCourseDetails = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5001/api/courses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${authCredentials}`,
        },
        body: JSON.stringify(courseDetails),
      });

       if (response.status === 204) {
        console.log("Course successfully updated!");
        props.refreshCourses();
        navigate(`/courses/${id}`);
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      navigate('/error');
    }
  }

  const handleCancel = () => {
    navigate(`/courses/${id}`)
  }
  
  return (
    <div className="wrap">
      <h2>Update Course</h2>

      {errors.length ? (
        <div className="validation--errors">
          <h3>Course Update Errors</h3>
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      ) : null }

      <form onSubmit={submitUpdatedCourseDetails} >
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input
              id="courseTitle"
              name="title"
              type="text"
              value={courseDetails.title || ""}
              onChange={handleChange}
            />

            <p>By {courseDetails?.User?.firstName} {courseDetails?.User?.lastName}</p>

            <label htmlFor="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              name="description"
              value={courseDetails.description || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={courseDetails.estimatedTime || ""}
              onChange={handleChange}
            />

            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              type="text"
              value={courseDetails.materialsNeeded}
              onChange={handleChange}
            />
          </div>
        </div>

        <button className="button" type="submit">Update Course</button>
        <button className="button button-secondary" type="button" onClick={handleCancel} >Cancel</button>
      </form>
    </div>
  );
};

export default UpdateCourse;