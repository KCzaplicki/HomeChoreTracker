import React, { createContext, useState, useContext, useEffect } from "react";

import AuthService from "../services/AuthService";
import {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
} from "../utils/accessTokenUtils";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    clearAccessToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const accessToken = getAccessToken();

    if (accessToken) {
      authenticate(accessToken).then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        authenticate,
        clearAuthentication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
