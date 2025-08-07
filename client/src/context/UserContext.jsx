import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const UserContext = createContext(null);

export const UserProvider = (props) => {
    const cookie = Cookies.get("authenticatedUser")
    const navigate = useNavigate();
    const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);
    const [authCredentials, setAuthCredentials] = useState(null);

    const signIn = async (credentials) => {
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);

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
          return user
        } else if (response.status === 401) {
            return null
        } else {
          throw new Error;
        }
    }


    const signOut = () => {
      setAuthUser(null);
      Cookies.remove("authenticatedUser");
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