import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const userId = sessionStorage.getItem("userId");
  return userId ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
