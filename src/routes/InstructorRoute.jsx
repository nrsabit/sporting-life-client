import React, { useContext } from "react";
import useInstructor from "../hooks/useInstructor";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const InstructorRoute = ({children}) => {
  const { user, loading } = useContext(AuthContext);
  const [isInstructor, isInstructorLoading] = useInstructor();
  const location = useLocation();
  if (user && isInstructor) {
    return children;
  }
  if (loading || isInstructorLoading) {
    return (
      <div className="min-h-screen">
        <img
          className="mx-auto"
          src="https://i.ibb.co/GFy0712/loading.gif"
          alt=""
        />
      </div>
    );
  }
  return <Navigate to="/login" state={{ from: location }}></Navigate>;
};

export default InstructorRoute;
