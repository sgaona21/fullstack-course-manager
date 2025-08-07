import { NavLink } from "react-router-dom";
import { useContext } from "react";

import UserContext from "../context/UserContext";

const Header = () => {
  const context = useContext(UserContext);

  return (
    <header>
      <div className="wrap header--flex">

        <h1 className="header--logo">
          <NavLink to="/courses">Courses</NavLink>
        </h1>

        {context.authUser ? (
        <nav>
          <ul className="header--signedin">
            <li>Welcome, {context.authUser.name}!</li>
            <li>
              <NavLink onClick={context.actions.signOut}> Sign Out</NavLink>
            </li>
          </ul>
        </nav>
        ) : null}

        {!context.authUser ? (
        <nav>
          <ul className="header--signedout">
            <li>
              <NavLink to='/sign-up' >Sign Up</NavLink>
            </li>
            <li>
              <NavLink to='/sign-in' >Sign In</NavLink>
            </li>
          </ul>
        </nav>
        ) : null}

      </div>
    </header>
  );
};

export default Header;
