import { Navigate } from "react-router-dom";
import USUARIOLOGEADO from "../Global/Globals";

export const ProtectedRoute = ({children, redirectTo="/"}) => {
    if(USUARIOLOGEADO.nombre == undefined) {
        return <Navigate to={redirectTo} />
    }
    return children
}