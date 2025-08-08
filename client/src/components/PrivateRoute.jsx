import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import UserContext from "../context/UserContext";


const PrivateRoute = () => {
    //creates a private route that only allows logged in users to access the create course and update routes 
    const { authUser } = useContext(UserContext);
    const location = useLocation();

    if (authUser) {
        return <Outlet />
    } else {
        return <Navigate to="/sign-in" state={{from: location.pathname}} />
    }
}

export default PrivateRoute;