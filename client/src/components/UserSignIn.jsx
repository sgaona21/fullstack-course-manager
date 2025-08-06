import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const UserSignIn = () => {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({
      emailAddress: '',
      password: ''
    });
    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setLoginInfo((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const credentials = {
        emailAddress: loginInfo.emailAddress,
        password: loginInfo.password
      }

      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);

      try {
        const response = await fetch('http://localhost:5001/api/users', {
          method: "GET",
          headers: {
            Authorization: `Basic ${encodedCredentials}`
          }
        })

        if (response.status === 200) {
          const user = await response.json();
          console.log(`Success! ${user.emailAddress} has been signed in!`)
          navigate('/courses')
        } else if (response.status === 401) {
          setErrors(["Sign in was unsuccessful"])
        } else {
          throw new Error;
        }
      } catch (error) {
        console.log(error);
        navigate('/error')
      }
      

    }

    return (
      <div className="form--centered">
        <h2>Sign In</h2>

        {errors.length ? (
          <div className="validation--errors">
            <h3>Sign-In Errors</h3>
            <ul>
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} >
          <label htmlFor="emailAddress">Email Address</label>
          <input id="emailAddress" 
          name="emailAddress" 
          type="email" 
          value={loginInfo.emailAddress} 
          onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input id="password" 
          name="password" 
          type="password" 
          value={loginInfo.password} 
          onChange={handleChange}
          />

          <button className="button" type="submit">Sign In</button>
          <button className="button button-secondary">Cancel</button>
        </form>
        <p>Don't have a user account? Click here to{" "}
          <NavLink to='/sign-up'>sign up</NavLink>!
        </p>
      </div>
    );
}

export default UserSignIn;