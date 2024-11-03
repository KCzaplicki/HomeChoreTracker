import React from "react";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton, Paper, Typography } from "@mui/material";
import { formatDateRange } from "../../../common/utils/DateUtil";

const WeekNavigation = ({ choreWeek }) => {
  const choreWeekValue = formatDateRange(
    choreWeek.startDate,
    choreWeek.endDate
  );

  return (
    <Paper>
      <IconButton disabled={!choreWeek.hasNextWeek}>
        <ChevronLeft />
      </IconButton>
      <Typography variant="body2" sx={{ display: "inline-block", mx: 1 }}>
        {choreWeekValue}
      </Typography>
      <IconButton disabled={!choreWeek.hasPreviousWeek}>
        <ChevronRight />
      </IconButton>
    </Paper>
  );
};

export default WeekNavigation;
