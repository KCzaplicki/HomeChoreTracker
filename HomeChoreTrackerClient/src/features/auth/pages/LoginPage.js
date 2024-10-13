import React from "react";

import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";

import AuthService from "../services/AuthService";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { authenticate } = useAuth();

  const handleLogin = async (email, password) => {
    const { isAuthenticated, token } = await AuthService.login(email, password);

    if (isAuthenticated) {
      await authenticate(token);
      navigate("/");
    }

    return isAuthenticated;
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center", mt: 12 }}>
      <Card sx={{ p: 1, width: 350, background: "white" }}>
        <CardHeader
          title="Home Chore Tracker"
          titleTypographyProps={{
            fontSize: 24,
            fontWeight: 500,
          }}
          subheader="Login"
          subheaderTypographyProps={{
            fontSize: 18,
            color: "text.secondary",
          }}
          sx={{ px: 4 }}
        />
        <Divider sx={{ mx: 2 }} />
        <CardContent>
          <LoginForm onLogin={handleLogin} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginPage;
