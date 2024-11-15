import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const userId = sessionStorage.getItem("id");
  return userId ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
