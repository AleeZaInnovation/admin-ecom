import { Navigate } from "react-router-dom";

export const OpenRoutes = ({ children }) => {
    const getTokenFromLocalStorage = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;

    return getTokenFromLocalStorage?.token === undefined ? children : (<Navigate to='/admin' replace={true} />)
}