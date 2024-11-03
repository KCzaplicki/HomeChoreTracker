import React from "react";

import { Button } from "@mui/material";

const ActivityIncrementButton = ({ label, onClick, disabled }) => {
  return (
    <Button
      sx={{ px: 0, minWidth: 36, borderRadius: "100%", mx: 2 }}
      variant="text"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

export default ActivityIncrementButton;
