import React from "react";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton, Paper, Typography } from "@mui/material";

const WeekNavigation = ({ currentWeek }) => {
  return (
    <Paper>
      <IconButton>
        <ChevronLeft />
      </IconButton>
      <Typography variant="body2" sx={{ display: "inline-block", mx: 1 }}>
        {currentWeek}
      </Typography>
      <IconButton>
        <ChevronRight />
      </IconButton>
    </Paper>
  );
};

export default WeekNavigation;
