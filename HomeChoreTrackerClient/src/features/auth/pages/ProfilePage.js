import React from "react";

import { Container, Divider, Typography, Snackbar, Alert } from "@mui/material";

import UserInformation from "../components/UserInformation";
import ChangePasswordForm from "../components/ChangePasswordForm";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const ProfilePage = () => {
  const [isPasswordChanged, setIsPasswordChanged] = React.useState(false);

  const { clearAuthentication } = useAuth();
  const navigate = useNavigate();

  const handleChangePassword = async (currentPassword, newPassword) => {
    const passwordChanged = await AuthService.changePassword(
      currentPassword,
      newPassword
    );

    if (passwordChanged) {
      setIsPasswordChanged(true);
    }

    return passwordChanged;
  };

  const handlePasswordChanged = () => {
    setIsPasswordChanged(false);
    clearAuthentication();
    navigate("/");
  };

  return (
    <Container
      sx={{
        background: "white",
        mx: 4,
        width: "auto",
        minHeight: "calc(100vh - 110px)",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 500, fontSize: 20, py: 2 }}>
        Profile
      </Typography>
      <Divider />
      <UserInformation />
      <ChangePasswordForm onChangePassword={handleChangePassword} />

      <Snackbar
        open={isPasswordChanged}
        autoHideDuration={2000}
        onClose={handlePasswordChanged}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ mb: 2 }}
      >
        <Alert severity="success">
          Password changed successfully! You will be redirected to the login
          page.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProfilePage;
