import React, { createContext, useState, useContext } from "react";

import AuthService from "../services/AuthService";
import { setAccessToken } from "../utils/AccessTokenUtils";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const authenticate = async (token) => {
    setAccessToken(token);

    const user = await AuthService.getCurrentUser();

    if (!user) {
      return;
    }

    setUser(user);
    setIsAuthenticated(true);
  };

  const clearAuthentication = () => {
    setAccessToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, authenticate, clearAuthentication }}
    >
      {children}
    </AuthContext.Provider>
  );
};
