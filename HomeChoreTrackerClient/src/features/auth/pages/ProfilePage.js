import React from "react";

import { Container, Divider, Snackbar, Alert, Paper } from "@mui/material";

import UserInformation from "../components/UserInformation";
import ChangePasswordForm from "../components/ChangePasswordForm";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import PageTitle from "../../../common/components/PageTitle";

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
        pb: 4,
        width: "auto",
      }}
      component={Paper}
      elevation={3}
    >
      <PageTitle title="Profile" />
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
