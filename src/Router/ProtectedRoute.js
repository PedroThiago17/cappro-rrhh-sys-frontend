import { Navigate } from "react-router-dom";
import USUARIOLOGEADO from "../Global/Globals";

export const ProtectedRoute = ({ children, redirectTo = "/" }) => {
    const user = window.localStorage.getItem('userId');
    if (!user) {
        return <Navigate to={redirectTo} />
    }
    return children
}