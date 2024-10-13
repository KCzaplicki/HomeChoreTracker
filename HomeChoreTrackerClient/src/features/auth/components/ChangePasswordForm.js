import React, { useState } from "react";

import { Typography, TextField, Button } from "@mui/material";
import { Grid } from "@mui/system";
import styled from "@emotion/styled";

const ChangePasswordForm = ({ onChangePassword }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [changePasswordError, setChangePasswordError] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setTouched(true);
    setChangePasswordError("");

    if (currentPassword === "" || newPassword === "") {
      return;
    }

    const result = await onChangePassword(currentPassword, newPassword);

    if (result === false) {
      setChangePasswordError("Incorrect current password");
    } else {
      setCurrentPassword("");
      setNewPassword("");
      setTouched(false);
    }
  };

  return (
    <form onSubmit={handleChangePassword}>
      <Grid container spacing={3} sx={{ mt: 4, width: "290px" }}>
        <Grid size={12}>
          <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 500 }}>
            Change Password
          </Typography>
        </Grid>
        <GridItem size={12}>
          <TextField
            label="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            error={touched && (currentPassword === "" || changePasswordError)}
            helperText={
              touched && currentPassword === ""
                ? "Field is required"
                : changePasswordError
            }
            type="password"
            size="small"
            required
            fullWidth
          />
        </GridItem>
        <GridItem size={12}>
          <TextField
            label="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={touched && newPassword === ""}
            helperText={
              touched && newPassword === "" ? "Field is required" : ""
            }
            type="password"
            size="small"
            required
            fullWidth
          />
        </GridItem>
        <GridItem
          size={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button type="submit" variant="contained">
            Change
          </Button>
        </GridItem>
      </Grid>
    </form>
  );
};

const GridItem = styled(Grid)`
  margin-left: 8px;
`;

export default ChangePasswordForm;
