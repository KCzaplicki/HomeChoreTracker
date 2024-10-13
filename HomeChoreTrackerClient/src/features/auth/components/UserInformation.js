import React from "react";

import { Typography } from "@mui/material";
import { Grid } from "@mui/system";
import styled from "@emotion/styled";

import { useAuth } from "../contexts/AuthContext";

const UserInformation = () => {
  const { user } = useAuth();

  return (
    <Grid container spacing={1} sx={{ mt: 3 }}>
      <Grid size={12}>
        <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 500, mb: 1 }}>
          User Information
        </Typography>
      </Grid>
      <GridItem size={12}>
        <Header>First name</Header>
        <Content>{user.firstName}</Content>
      </GridItem>
      <GridItem size={12}>
        <Header>Last name</Header>
        <Content>{user.lastName}</Content>
      </GridItem>
      <GridItem size={12}>
        <Header>Email</Header>
        <Content>{user.email}</Content>
      </GridItem>
    </Grid>
  );
};

const GridItem = styled(Grid)`
  margin-left: 8px;
`;

const Header = styled(Typography)`
  font-weight: 500;
  font-size: 15px;
`;

const Content = styled(Typography)`
  padding-bottom: 8px;
`;

export default UserInformation;
