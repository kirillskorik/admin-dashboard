import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import AuthPage from "../pages/auth";
import AuthTemplate from "../pages/authTemplate";
import DashboardPage from "../pages/dashboard";
import RequireAuth from "./RequireAuth";

const UIRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} />

        <Route element={<RequireAuth />}>
          <Route element={<AuthTemplate />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default UIRouter;
