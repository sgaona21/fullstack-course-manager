import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext(null);

export const UserProvider = (props) => {
    const navigate = useNavigate();
    const [authUser, setAuthUser] = useState(null);

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
          return user
        } else if (response.status === 401) {
            return null
        } else {
          throw new Error;
        }
    }


    const signOut = () => {
      setAuthUser(null);
      navigate('/courses');
    }

    return (
        <UserContext.Provider value={{
            authUser,
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