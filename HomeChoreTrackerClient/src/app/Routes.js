import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import UsersPage from "../features/users/pages/UsersPage";
import ChoresPage from "../features/chores/pages/ChoresPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ChoresPage />} />
      <Route path="/chores" element={<ChoresPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;
