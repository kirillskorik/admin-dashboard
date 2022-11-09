import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import AuthStore from "../store/Auth";

function RequireAuth() {
  const location = useLocation();

  if (!AuthStore.isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default RequireAuth;
