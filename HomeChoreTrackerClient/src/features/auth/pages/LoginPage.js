import React from "react";

import { Card, CardContent, CardHeader } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";

import AuthService from "../services/AuthService";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    const isAuthenticated = await AuthService.login(email, password);

    if (isAuthenticated) {
      navigate("/");
    }

    return isAuthenticated;
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center", mt: 12 }}>
      <Card sx={{ p: 1, width: 370, background: "white" }}>
        <CardHeader title="Login" sx={{ pb: 2 }} />
        <CardContent>
          <LoginForm onLogin={handleLogin} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginPage;
