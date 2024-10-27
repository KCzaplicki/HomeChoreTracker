import React from "react";

import { Button } from "@mui/material";

const ActivityIncrementButton = ({ label }) => {
  return (
    <Button
      sx={{ px: 0, minWidth: 36, borderRadius: "100%", mx: 2 }}
      variant="text"
    >
      {label}
    </Button>
  );
};

export default ActivityIncrementButton;
