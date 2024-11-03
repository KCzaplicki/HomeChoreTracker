import React from "react";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton, Paper, Typography } from "@mui/material";
import { formatDateRange } from "../../../common/utils/dateUtils";

const WeekNavigation = ({
  choreWeek,
  onNavigatedToPrevious,
  onNavigatedToNext,
}) => {
  const choreWeekValue = formatDateRange(
    choreWeek.startDate,
    choreWeek.endDate
  );

  return (
    <Paper>
      <IconButton
        disabled={!choreWeek.hasPreviousWeek}
        onClick={onNavigatedToPrevious}
      >
        <ChevronLeft />
      </IconButton>
      <Typography variant="body2" sx={{ display: "inline-block", mx: 1 }}>
        {choreWeekValue}
      </Typography>
      <IconButton disabled={!choreWeek.hasNextWeek} onClick={onNavigatedToNext}>
        <ChevronRight />
      </IconButton>
    </Paper>
  );
};

export default WeekNavigation;
