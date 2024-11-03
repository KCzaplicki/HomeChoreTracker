import React, { useState } from "react";

import { Button, TextField } from "@mui/material";
import { Grid } from "@mui/system";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setTouched(true);
    setLoginError("");

    if (email === "" || password === "") {
      return;
    }

    const result = await onLogin(email, password);

    if (result === false) {
      setLoginError("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Grid container spacing={3} sx={{ mx: 2, mt: 2 }}>
        <Grid size={12}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={touched && (email === "" || !!loginError)}
            helperText={
              touched && email === "" ? "Field is required" : loginError
            }
            size="small"
            variant="standard"
            required
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={touched && password === ""}
            helperText={touched && password === "" ? "Field is required" : ""}
            type="password"
            size="small"
            variant="standard"
            required
            fullWidth
          />
        </Grid>
        <Grid size={12} sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" size="large" fullWidth>
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
