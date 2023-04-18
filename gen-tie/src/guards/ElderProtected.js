import { Navigate } from "react-router-dom";

const ElderProtected = ({ isElder, children }) => {
 if (isElder !== true) {
    if(isElder === null){
        return <Navigate to="/" replace />;
    }
    return <Navigate to="/young/home" replace />;
 }
 return children;
};

export default ElderProtected;