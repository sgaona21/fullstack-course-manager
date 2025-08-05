import { useState } from "react";

const CreateCourse = () => {
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitNewCourseData = (e) => {
    e.preventDefault();

    fetch("http://localhost:5001/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCourse),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Course created!");
        } else {
          console.error("Something went wrong.");
        }
      })
      .catch((err) => console.error("Error:", err));
  }

  return (
    <div className="wrap">
      <h2>Create Course</h2>
      <div className="validation--errors">
        <h3>Validation Errors</h3>
        <ul>
          <li>Please provide a value for "Title"</li>
          <li>Please provide a value for "Description"</li>
        </ul>
      </div>
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

            <p>By Joe Smith</p>

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
        <button className="button button-secondary" type="button">Cancel</button>
      </form>
    </div>
  );
};

export default CreateCourse;
