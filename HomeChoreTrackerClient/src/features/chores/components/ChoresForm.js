import React from "react";

import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  Container,
  Paper,
  Typography,
  TableFooter,
  IconButton,
} from "@mui/material";
import { Stack } from "@mui/system";

import OptionsButton from "../../../common/components/OptionsButton";
import ActivityIncrementButton from "./ActivityIncrementButton";
import WeekNavigation from "./WeekNavigation";
import AddActivityForm from "./AddActivityForm";
import { Delete } from "@mui/icons-material";

const ChoresForm = () => {
  const actions = [
    {
      label: "Create empty",
      onClick: () => {},
    },
    {
      label: "Copy from this week",
      onClick: () => {},
    },
  ];
  const users = ["John", "Mark"];
  const chores = [
    {
      activity: "Laundry",
      values: [3, 4],
    },
    {
      activity: "Dishes",
      values: [2, 3],
    },
    {
      activity: "Trash",
      values: [1, 1],
    },
    {
      activity: "Walk dog",
      values: [1, 2],
    },
    {
      activity: "Water plants",
      values: [3, 5],
    },
    {
      activity: "Vacuum",
      values: [2, 2],
    },
    {
      activity: "Clean bathroom",
      values: [1, 0],
    },
    {
      activity: "Mop",
      values: [0, 0],
    },
    {
      activity: "Groceries",
      values: [0, 0],
    },
  ];

  return (
    <Container sx={{ my: 2 }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        justifyContent="flex-end"
        spacing={2}
        sx={{ mb: 2 }}
      >
        <WeekNavigation currentWeek="4 - 11 Nov" />
        <OptionsButton label="Actions" items={actions} />
      </Stack>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Activity</TableCell>
              {users.map((user) => (
                <TableCell
                  key={user}
                  align="center"
                  sx={{ fontWeight: "bold" }}
                >
                  {user}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {chores.map((chore, index) => (
              <TableRow
                key={index}
                sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}
              >
                <TableCell>
                  <Typography
                    variant="body1"
                    sx={{ display: "inline-block", verticalAlign: "middle" }}
                  >
                    {chore.activity}
                  </Typography>
                  {chore.values.every((value) => value === 0) && (
                    <IconButton size="small" sx={{ m: 0 }}>
                      <Delete color="error" />
                    </IconButton>
                  )}
                </TableCell>
                {chore.values.map((value) => (
                  <TableCell align="center">
                    <ActivityIncrementButton label="+" />
                    <Typography
                      variant="body1"
                      sx={{ display: "inline-block", verticalAlign: "middle" }}
                    >
                      {value}
                    </Typography>
                    <ActivityIncrementButton label="-" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
                <AddActivityForm />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ChoresForm;
