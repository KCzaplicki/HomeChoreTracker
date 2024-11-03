import React, { useState } from "react";

import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import ChoreService from "../services/ChoreService";

const AddActivityForm = ({ onAddActivity }) => {
  const [activityName, setActivityName] = useState("");
  const [activityNameError, setActivityNameError] = useState("");
  const [touched, setTouched] = useState(false);

  const updateActivityName = (e) => {
    setActivityName(e.target.value);
    setActivityNameError("");
    setTouched(false);
  };

  const handleAddActivity = async (e) => {
    setTouched(true);

    if (activityName === "") {
      return;
    }

    const { success, error } = await onAddActivity(activityName);

    if (success) {
      setActivityName("");
      setActivityNameError("");
      setTouched(false);
    } else {
      setActivityNameError(error);
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <TextField
        label="Activity name"
        size="small"
        variant="outlined"
        value={activityName}
        onChange={updateActivityName}
        error={touched && (activityName === "" || activityNameError)}
        helperText={
          touched && activityName === ""
            ? "Field is required"
            : activityNameError
        }
        required
        fullWidth
      />
      <Button
        variant="contained"
        sx={{ alignSelf: "flex-start" }}
        onClick={handleAddActivity}
      >
        Add
      </Button>
    </Stack>
  );
};

export default AddActivityForm;
