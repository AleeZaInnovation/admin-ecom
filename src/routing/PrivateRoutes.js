import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
    const getTokenFromLocalStorage = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;

    return getTokenFromLocalStorage?.token !== undefined ? children : (<Navigate to='/' replace={true} />)
}