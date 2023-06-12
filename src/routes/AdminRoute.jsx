import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();
  if (user && isAdmin) {
    return children;
  }
  if (loading || isAdminLoading) {
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

export default AdminRoute;
