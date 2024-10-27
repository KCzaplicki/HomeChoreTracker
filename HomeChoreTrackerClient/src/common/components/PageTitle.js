import React from "react";

import { Typography } from "@mui/material";

const PageTitle = ({ title }) => {
  return (
    <Typography variant="h6" sx={{ fontWeight: 500, fontSize: 20, py: 2 }}>
      {title}
    </Typography>
  );
};

export default PageTitle;
