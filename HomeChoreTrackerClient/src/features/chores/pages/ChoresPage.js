import React from "react";

import { Container, Divider, Paper } from "@mui/material";

import ChoresForm from "../components/ChoresForm";
import PageTitle from "../../../common/components/PageTitle";

const ChoresPage = () => {
  return (
    <Container
      sx={{
        background: "white",
        mx: 4,
        mb: 2,
        pb: 2,
        width: "auto",
      }}
      component={Paper}
      elevation={3}
    >
      <PageTitle title="Chores" />
      <Divider />
      <ChoresForm />
    </Container>
  );
};

export default ChoresPage;
