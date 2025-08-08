import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const UserContext = createContext(null);

export const UserProvider = (props) => {
    const cookie = Cookies.get("authenticatedUser"); // saves encoded credentials in browser cookie
    const authCredCookie = Cookies.get("authCredentials");
    const navigate = useNavigate();
    const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);
    const [authCredentials, setAuthCredentials] = useState( authCredCookie ? JSON.parse(authCredCookie) : null); // saves the encoded auth credentials and makes them globally available 

    const signIn = async (credentials) => {
      //takes encoded credentials and signs user in. saves two cookies to the browser
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
          setAuthUser(user);
          setAuthCredentials(encodedCredentials)
          Cookies.set("authenticatedUser", JSON.stringify(user), {expires: 1});
          Cookies.set("authCredentials", JSON.stringify(encodedCredentials), {expires: 1});
          return user
        } else if (response.status === 401) {
            return null
        } else {
          throw new Error;
        }
        } catch (error) {
          console.log(error);
          navigate('/error');
        }
    }

    const signOut = () => {
      //signs user out and removes both cookies then navigates user back to the courses screen 
      setAuthUser(null);
      setAuthCredentials(null)
      Cookies.remove("authenticatedUser");
      Cookies.remove("authCredentials");
      navigate('/courses');
    }

    return (
        <UserContext.Provider value={{
            authUser,
            authCredentials,
            actions: {
                signIn,
                signOut
            }
        }} >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;