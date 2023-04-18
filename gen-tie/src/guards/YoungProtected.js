import { Navigate } from "react-router-dom";

const YoungProtected = ({ isElder, children }) => {
 if (isElder !== false) {
    if(isElder === null){
        return <Navigate to="/" replace />;
    }
    return <Navigate to="/elder/home" replace />;
 }
 return children;
};

export default YoungProtected;