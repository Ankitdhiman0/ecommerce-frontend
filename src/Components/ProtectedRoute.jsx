import React from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/getUser";

function ProtectedRoute({ children, allowedRoles }) {
  const user = getUser();
  const navigate = useNavigate();

  if (!user || !allowedRoles.includes(user.role)) {
    navigate("/");
  }
  return children;
}

export default ProtectedRoute;
