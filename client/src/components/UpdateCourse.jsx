import { NavLink } from "react-router-dom";

const UpdateCourse = () => {
  
  return (
    <div className="wrap">
      <h2>Update Course</h2>
      <form>
        <div className="main--flex">
          <div>
            <label for="courseTitle">Course Title</label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              value="Build a Basic Bookcase"
            />

            <p>By Joe Smith</p>

            <label for="courseDescription">Course Description</label>
            <textarea id="courseDescription" name="courseDescription">
              High-end furniture projects are great to dream about. But unless
              you have a well-equipped shop and some serious woodworking
            </textarea>
          </div>
          <div>
            <label for="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value="14 hours"
            />

            <label for="materialsNeeded">Materials Needed</label>
            <textarea id="materialsNeeded" name="materialsNeeded">
              * 1/2 x 3/4 inch parting strip&#13;&#13;* 1 x 2 common
              pine&#13;&#13;* 1 x 4 common pine&#13;&#13;* 1 x 10 common
              pine&#13;&#13;* 1/4 inch thick lauan plywood&#13;&#13;* Finishing
              Nails&#13;&#13;* Sandpaper&#13;&#13;* Wood Glue&#13;&#13;* Wood
              Filler&#13;&#13;* Minwax Oil Based Polyurethane
            </textarea>
          </div>
        </div>
        <button className="button" type="submit">
          Update Course
        </button>
        <button
          className="button button-secondary"
          onclick="event.preventDefault(); location.href='index.html';"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;