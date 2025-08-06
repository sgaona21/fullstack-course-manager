import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";


const UserSignUp = () => {
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: ''
    });
    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setNewUser((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const submitNewUser = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch("http://localhost:5001/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if (response.status === 201) {
          console.log("New User Account successfully created!");
          navigate('/courses');
        } else if (response.status === 400) {
          const data = await response.json();
          setErrors(data.errors)
          console.log(data)
        } else {
          throw new Error();
        }
      } catch (error) {
        console.log(error);
        navigate("/error");
      }
    };


    return (
      <div className="form--centered">
        <h2>Sign Up</h2>

        {errors.length ? (
          <div className="validation--errors">
            <h3>Sign Up Errors</h3>
            <ul>
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <form onSubmit={submitNewUser}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={newUser.firstName}
            onChange={handleChange}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={newUser.lastName}
            onChange={handleChange}
          />

          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={newUser.emailAddress}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={newUser.password}
            onChange={handleChange}
          />

          <button className="button" type="submit">
            Sign Up
          </button>
          <button className="button button-secondary" type="button">
            Cancel
          </button>
        </form>

        <p>
          Already have a user account? Click here to{" "}
          <NavLink to="/sign-in">sign in</NavLink>!
        </p>
      </div>
    );

}

export default UserSignUp;