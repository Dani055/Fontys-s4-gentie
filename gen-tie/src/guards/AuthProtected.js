import { Navigate } from "react-router-dom";

const AuthProtected = ({ loggedUser, children }) => {
 if (loggedUser === null) {
    return <Navigate to="/" replace />;
 }
 return children;
};

export default AuthProtected;