import React from "react";
import { Routes, Route } from "react-router-dom";

import { useAuth } from "../features/auth/contexts/AuthContext";
import LoginPage from "../features/auth/pages/LoginPage";
import UsersPage from "../features/users/pages/UsersPage";
import ChoresPage from "../features/chores/pages/ChoresPage";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {isAuthenticated && (
        <>
          <Route path="/" element={<ChoresPage />} />
          <Route path="/chores" element={<ChoresPage />} />
          <Route path="/users" element={<UsersPage />} />
        </>
      )}
      {!isAuthenticated && (
        <>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
