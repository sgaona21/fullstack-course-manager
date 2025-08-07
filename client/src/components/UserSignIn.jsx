import { useState, useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import UserContext from '../context/UserContext';



const UserSignIn = () => {
  const context = useContext(UserContext)
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({
      emailAddress: '',
      password: ''
    });
    const [errors, setErrors] = useState([]);
    const location = useLocation();

    const handleChange = (e) => {
      const { name, value } = e.target;
      setLoginInfo((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      let from = '/courses';
      if (location.state) {
        from = location.state.from
      }

      const credentials = {
        emailAddress: loginInfo.emailAddress,
        password: loginInfo.password
      }

      try {
        const user = await context.actions.signIn(credentials);
        if (user) {
          console.log(`Success! ${user.emailAddress} was successfully signed in!`);
          navigate(from);
        } else {
          setErrors(["Sign-in was unsuccessful"])
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