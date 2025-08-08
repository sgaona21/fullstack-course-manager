import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";


const CreateCourse = (props) => {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const [newCourse, setNewCourse] = useState({
    userId: context?.authUser?.id,
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
  }); //creates course object to send to the db. includes current users id
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    // allows form to be edited with real time input
    const { name, value } = e.target;
    setNewCourse((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitNewCourseData = async (e) => {
    e.preventDefault();

    //submits new course data to db 
    try {
      const response = await fetch("http://localhost:5001/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });

      if (response.status === 201) {
        console.log("New course successfully created!");
        props.refreshCourses();
        navigate('/courses');
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

  const handleCancel = (e) => {
    //provides functionality for cancel button and navigates user back to courses screen
    e.preventDefault();
    navigate('/courses')
  }


  return (
    <div className="wrap">
      <h2>Create Course</h2>

      {/* renders a list of validation errors to the screen if they are detected in errors array  */}
      {errors.length ? (
        <div className="validation--errors">
          <h3>Course Creation Errors</h3>
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      ) : null }

      <form onSubmit={submitNewCourseData} >
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input
              id="courseTitle"
              name="title"
              type="text"
              value={newCourse.title}
              onChange={handleChange}
            />

            <p>By {context?.authUser?.name} {context?.authUser?.lastName} </p>

            <label htmlFor="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              name="description"
              value={newCourse.description}
              onChange={handleChange}>
            </textarea>
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={newCourse.estimatedTime}
              onChange={handleChange}
            />

            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              value={newCourse.materialsNeeded}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <button className="button" type="submit">Create Course</button>
        <button className="button button-secondary" type="button" onClick={handleCancel} >Cancel</button>
      </form>
    </div>
  );
};

export default CreateCourse;
