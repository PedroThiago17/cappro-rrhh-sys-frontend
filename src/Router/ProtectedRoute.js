import { Navigate } from "react-router-dom";
import USUARIOLOGEADO from "../Global/Globals";

export const ProtectedRoute = ({ children, redirectTo = "/" }) => {
    console.log('usuario logeado: ', USUARIOLOGEADO.nombre)
    const user = window.localStorage.getItem('userId');
    if (!user) {
        return <Navigate to={redirectTo} />
    }
    return children
}