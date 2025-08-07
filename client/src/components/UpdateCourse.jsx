import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import UserContext from "../context/UserContext";

const UpdateCourse = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authCredentials } = useContext(UserContext);
  const [courseDetails, setCourseDetails] = useState({});
  const [errors, setErrors] = useState([]);


  const fetchCourseDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/courses/${id}`)
      const data = await response.json();
      setCourseDetails(data)
      console.log(data)
    } catch (error) {
      console.error("Error fetching course details:". error)
    }
  }

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  useEffect(() => {
    console.log(courseDetails)
  }, [courseDetails]);

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
        console.log("Course details successfully updated!");
      } else if (response.status === 403) {
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
  
  return (
    <div className="wrap">
      <h2>Update Course</h2>
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

            <p>By Joe Smith</p>

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
        <button className="button button-secondary" type="button">Cancel</button>
      </form>
    </div>
  );
};

export default UpdateCourse;