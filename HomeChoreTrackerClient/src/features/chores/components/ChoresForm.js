import React, { useEffect, useState } from "react";

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
import { Delete } from "@mui/icons-material";

import OptionsButton from "../../../common/components/OptionsButton";
import ActivityIncrementButton from "./ActivityIncrementButton";
import WeekNavigation from "./WeekNavigation";
import AddActivityForm from "./AddActivityForm";
import ChoreService from "../services/ChoreService";
import { useAuth } from "../../auth/contexts/AuthContext";

const ChoresForm = () => {
  const [choreWeek, setChoreWeek] = useState({});
  const [selectedWeekDate, setSelectedWeekDate] = useState(new Date());
  const [choreWeekDetails, setChoreWeekDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const { user: currentUser } = useAuth();

  useEffect(() => {
    loadChoreWeek();
  }, [selectedWeekDate]);

  useEffect(() => {
    loadChoreWeekDetails()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [choreWeek]);

  const loadChoreWeek = async () => {
    const result = await ChoreService.getChoreWeek(selectedWeekDate);

    if (result) {
      setChoreWeek(result);
    }
  };

  const loadChoreWeekDetails = async () => {
    if (!choreWeek?.id) {
      return;
    }

    const result = await ChoreService.getChoreWeekDetails(choreWeek.id);

    if (result) {
      setChoreWeekDetails(result);
    }
  };

  const canDeleteChore = (chore) => {
    return Object.values(chore.values).every((value) => value === 0);
  };

  const canCreateNewWeek = () =>
    choreWeek?.isCurrentWeek && !choreWeek?.hasNextWeek;

  const incrementChoreStats = (choreId, value) => {
    ChoreService.incrementChoreStats(choreWeek.id, choreId, value).then(() =>
      loadChoreWeekDetails()
    );
  };

  const handleAddActivity = async (activityName) => {
    if (choreWeekDetails.chores.find((chore) => chore.name === activityName)) {
      return {
        success: false,
        error: "Chore already exists in this week",
      };
    }

    const added = await ChoreService.addChoreToWeek(choreWeek.id, activityName);

    if (added) {
      loadChoreWeekDetails();
    }

    return { success: added };
  };

  const deleteChoreFromWeek = (choreId) => {
    ChoreService.deleteChoreFromWeek(choreWeek.id, choreId).then(() =>
      loadChoreWeekDetails()
    );
  };

  const createEmptyChoreWeek = () => {
    ChoreService.createEmptyChoreWeek().then((nextChoreWeek) => {
      const nextChoreWeekDate = new Date(nextChoreWeek.startDate);
      setSelectedWeekDate(nextChoreWeekDate);
    });
  };

  const handleNavigatedToPrevious = () => {
    const newDate = new Date(choreWeek.startDate);
    newDate.setDate(newDate.getDate() - 1);

    setSelectedWeekDate(newDate);
  };

  const handleNavigatedToNext = () => {
    const newDate = new Date(choreWeek.endDate);
    newDate.setDate(newDate.getDate() + 1);

    setSelectedWeekDate(newDate);
  };

  return (
    <Container sx={{ my: 2 }}>
      {(loading || !choreWeek) && <Typography>Loading...</Typography>}
      {!loading && (
        <>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            justifyContent="flex-end"
            spacing={2}
            sx={{ mb: 2 }}
          >
            <WeekNavigation
              choreWeek={choreWeek}
              onNavigatedToPrevious={handleNavigatedToPrevious}
              onNavigatedToNext={handleNavigatedToNext}
            />
            <OptionsButton
              label="Actions"
              items={[
                {
                  label: "Create empty",
                  onClick: createEmptyChoreWeek,
                  disabled: !canCreateNewWeek(),
                },
                {
                  label: "Copy from this week",
                  onClick: () => {},
                  disabled: !canCreateNewWeek(),
                },
              ]}
            />
          </Stack>
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Activity</TableCell>
                  {choreWeekDetails?.users?.map((user) => (
                    <TableCell
                      key={user.id}
                      align="center"
                      sx={{ fontWeight: "bold" }}
                    >
                      {user.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {choreWeekDetails?.chores?.map((chore) => (
                  <TableRow
                    key={chore.id}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" },
                    }}
                  >
                    <TableCell>
                      <Typography
                        variant="body1"
                        sx={{
                          display: "inline-block",
                          verticalAlign: "middle",
                        }}
                      >
                        {chore.name}
                      </Typography>
                      {canDeleteChore(chore) && (
                        <IconButton
                          size="small"
                          sx={{ m: 0 }}
                          onClick={() => deleteChoreFromWeek(chore.id)}
                        >
                          <Delete color="error" />
                        </IconButton>
                      )}
                    </TableCell>
                    {choreWeekDetails.users
                      .map((user) => ({
                        userId: user.id,
                        value: chore.values[user.id],
                      }))
                      .map(({ userId, value }) => (
                        <TableCell align="center" key={userId}>
                          {currentUser.id === userId && (
                            <ActivityIncrementButton
                              label="+"
                              onClick={() => incrementChoreStats(chore.id, 1)}
                            />
                          )}
                          <Typography
                            variant="body1"
                            sx={{
                              display: "inline-block",
                              verticalAlign: "middle",
                            }}
                          >
                            {value}
                          </Typography>
                          {currentUser.id === userId && (
                            <ActivityIncrementButton
                              label="-"
                              onClick={() => incrementChoreStats(chore.id, -1)}
                              disabled={value === 0}
                            />
                          )}
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}>
                    <AddActivityForm onAddActivity={handleAddActivity} />
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
};

export default ChoresForm;
